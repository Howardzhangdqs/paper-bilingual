#!/usr/bin/env node
/**
 * 编译期目录生成：扫描 src/papers/<id>/index.vue 模板里的 sections/*.vue
 * （按模板出现顺序），用 vue/compiler-sfc 提取全部 <Heading> 的字面量属性，
 * 推导章节编号，生成 <id>/toc.generated.ts。
 *
 * 产物经 src/data/registry.ts 的 eager glob 进主包：进入论文页瞬间侧栏
 * 目录即完整，不依赖正文 chunk 下载与渐进挂载；headingIds 同时作为
 * 运行时 <Heading> 的锚点 id 来源，保证静态目录与 DOM 一一对齐。
 *
 * 运行时机：predev / prebuild（package.json 钩子，自动）+ dev 期文件
 * 变更（vite.config.ts 的 gen-paper-toc 插件）。产物提交入库。
 *
 * 编号推导与 src/components/paper/registry.ts 的 useToc 是同一套规则
 * （sec/sub 计数、附录从 A 重置、toc=false 不占号），两处改动需同步。
 */
import { parse } from 'vue/compiler-sfc'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const papersDir = path.join(root, 'src', 'papers')

function fail(msg) {
  console.error(`gen_toc: ${msg}`)
  process.exit(1)
}

function slugify(en) {
  const s = (en || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return s || 'heading'
}

/**
 * 读取 <Heading> 属性字面量。en="X" 与 :level="1" 都接受；任何非常量
 * 表达式（变量、拼接、v-bind="对象"）都无法静态求值，直接报错退出，
 * 让写作端改用字面量而不是悄悄产出错目录。
 */
function literalProp(node, name, file) {
  const prop = node.props.find((p) =>
    p.type === 6
      ? p.name === name
      : p.type === 7 && p.name === 'bind' && String(p.arg?.content ?? '') === name,
  )
  if (!prop) return undefined
  /* 普通属性的值就是纯文本；无值属性（appendix 简写）按 Vue 语义为 true；
     绑定表达式才是 JS 字面量，需 JSON 求值 */
  if (prop.type === 6) return prop.value === undefined ? true : prop.value.content
  const raw = prop.exp?.content
  if (raw === undefined) fail(`${file}: <Heading> 的 :${name} 不是可静态求值的字面量`)
  try {
    return JSON.parse(raw)
  } catch {
    fail(`${file}: <Heading> 的 :${name}="${raw}" 不是可静态求值的字面量`)
  }
}

/** 深度优先收集模板里按出现顺序的 <Heading> 元素节点 */
function collectHeadings(ast) {
  const out = []
  const walk = (n) => {
    if (!n || typeof n !== 'object') return
    if (n.type === 1 && n.tag === 'Heading') out.push(n)
    for (const c of n.children ?? []) walk(c)
  }
  walk(ast)
  return out
}

/** index.vue 模板里章节组件（S01、S02…）的实际渲染顺序 -> section 文件 */
function orderedSectionFiles(indexPath) {
  const src = fs.readFileSync(indexPath, 'utf8')
  const imports = new Map()
  for (const m of src.matchAll(/import\s+(\w+)\s+from\s+['"](\.\/sections\/[^'"]+\.vue)['"]/g)) {
    imports.set(m[1], m[2])
  }
  const { descriptor } = parse(src, { filename: indexPath })
  const files = []
  const walk = (n) => {
    if (!n || typeof n !== 'object') return
    if (n.type === 1 && imports.has(n.tag)) files.push(imports.get(n.tag))
    for (const c of n.children ?? []) walk(c)
  }
  walk(descriptor.template?.ast)
  if (!files.length) fail(`${indexPath}: 模板里没有引用任何 sections/*.vue`)
  return files
}

/** Heading.vue 的 props 默认值与此处保持一致（level 1、toc true） */
function extractHeading(node, file) {
  const level = literalProp(node, 'level', file) ?? 1
  const en = literalProp(node, 'en', file)
  const zh = literalProp(node, 'zh', file)
  const toc = literalProp(node, 'toc', file) ?? true
  const appendix = literalProp(node, 'appendix', file) ?? false
  if (typeof level !== 'number' || typeof toc !== 'boolean' || typeof appendix !== 'boolean') {
    fail(`${file}: <Heading> 的 level/toc/appendix 字面量类型不对`)
  }
  if (typeof en !== 'string') fail(`${file}: <Heading> 缺少字面量 en 属性（目录提取必需）`)
  return { level, en, zh: typeof zh === 'string' ? zh : undefined, toc, appendix }
}

let generated = 0
for (const dirent of fs.readdirSync(papersDir, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue
  const dir = path.join(papersDir, dirent.name)
  const indexPath = path.join(dir, 'index.vue')
  if (!fs.existsSync(indexPath)) continue

  const headings = []
  for (const rel of orderedSectionFiles(indexPath)) {
    const file = path.join(dir, rel)
    const { descriptor } = parse(fs.readFileSync(file, 'utf8'), { filename: file })
    for (const node of collectHeadings(descriptor.template?.ast)) {
      headings.push(extractHeading(node, file))
    }
  }

  /* 锚点 id：英文标题 slug，全篇去重——比运行时顺序号稳定，可被
     目录、外链长期引用 */
  const slugCount = new Map()
  const headingIds = headings.map((h) => {
    const base = `sec-${slugify(h.en)}`
    const n = (slugCount.get(base) ?? 0) + 1
    slugCount.set(base, n)
    return n === 1 ? base : `${base}-${n}`
  })

  /* 编号推导：与 registry.ts 的 useToc 逐行同规则 */
  const toc = []
  let sec = 0
  let sub = 0
  let appendix = false
  headings.forEach((h, i) => {
    if (h.toc === false || h.level > 2) return
    if (h.appendix && !appendix) {
      appendix = true
      sec = 0
      sub = 0
    }
    if (h.level === 1) {
      sub = 0
      sec++
    } else {
      sub++
    }
    const secNo = appendix ? String.fromCharCode(64 + sec) : String(sec)
    toc.push({
      domId: headingIds[i],
      level: h.level,
      number: h.level === 1 ? secNo : `${secNo}.${sub}`,
      titleEn: h.en,
      ...(h.zh !== undefined ? { titleZh: h.zh } : {}),
    })
  })

  const content = `/**
 * 本文件由 scripts/gen_toc.mjs 生成，请勿手改。
 * 自动运行时机：predev / prebuild（package.json）与 dev 期 sections
 * 变更（vite.config.ts 的 gen-paper-toc 插件）。
 */
import type { TocEntry } from '../../types'

/** 全部 <Heading> 的锚点 id（按模板顺序，含 level 3 与不进目录者）。
 *  运行时 Heading 按注册顺序逐个领取，静态目录与 DOM 据此对齐 */
export const headingIds: string[] = ${JSON.stringify(headingIds)}

/** 左侧目录条目（编号规则与 registry.ts 的 useToc 一致） */
export const toc: TocEntry[] = ${JSON.stringify(toc, null, 2)}
`
  const outPath = path.join(dir, 'toc.generated.ts')
  if (fs.existsSync(outPath) && fs.readFileSync(outPath, 'utf8') === content) continue
  fs.writeFileSync(outPath, content)
  generated++
  console.log(`gen_toc: ${dirent.name} — ${headings.length} 个标题，其中 ${toc.length} 个进目录`)
}
console.log(`gen_toc: 完成（更新 ${generated} 个文件）`)
