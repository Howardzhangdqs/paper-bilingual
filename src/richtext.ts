/**
 * 行内富文本渲染：把 LaTeX 行内标记转换为 Vue VNode。
 * 标记与组件的对应关系（详见 docs/inline-components.md）：
 *   ~\cite{a,b}          -> CiteLink   编号上标 [n]，点击跳参考文献条目
 *   \autoref{label} 等   -> RefLink    编号文本，点击跳对应图/表/公式/章节
 *   \url{..} / \href{..} -> ExtLink    外部链接
 *   $...$ / \(...\)      -> KaTeX 渲染
 *   \textbf/\emph/...    -> strong/em/...
 *   \footnote{..}        -> 上标 †，悬停显示内容
 */
import { h, type VNode } from 'vue'
import { renderTexCached } from './components/paper/texCache'
import CiteLink from './components/inline/CiteLink.vue'
import RefLink from './components/inline/RefLink.vue'
import ExtLink from './components/inline/ExtLink.vue'
import { noHover, queueTextTip, scheduleHideRefTip, showTextTipNow } from './components/paper/refPreview'

export interface RenderCtx {
  /** 中文语境：Figure 2 显示为 图 2 等 */
  zh?: boolean
  /** label -> 编号文本，如 "fig:xx" -> "Figure 2" */
  labels?: Record<string, string>
  /** label -> 目标 DOM id（点击跳转用） */
  anchors?: Record<string, string>
  /** sec label -> 章节标题（章节引用附章节名用） */
  secTitles?: Record<string, { en?: string; zh?: string }>
  /** cite key -> 文献序号 */
  cites?: Record<string, number>
  /** KaTeX 宏 */
  macros?: Record<string, string>
}

function mathVNode(src: string, display: boolean, ctx: RenderCtx): VNode {
  try {
    const html = renderTexCached(src, 'inline', { display, macros: ctx.macros })
    return h('span', { class: 'math-tex', innerHTML: html })
  } catch {
    return h('code', { class: 'math-error' }, src)
  }
}

/** 读取一个 {...} 分组，正确处理嵌套与转义 */
function readGroup(src: string, start: number): { body: string; end: number } | null {
  if (src[start] !== '{') return null
  let depth = 0
  for (let i = start; i < src.length; i++) {
    if (src[i] === '\\' && i + 1 < src.length) {
      i++
      continue
    }
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (depth === 0) return { body: src.slice(start + 1, i), end: i + 1 }
    }
  }
  return null
}

/** 读取 \命令名 */
function readCommand(src: string, start: number): { name: string; end: number } | null {
  const m = /^\\([a-zA-Z]+|[-!,:; %&#${}\\'"])/.exec(src.slice(start))
  return m ? { name: m[1], end: start + m[0].length } : null
}

/** footnote 悬停用的纯文本（去 LaTeX 标记）；$...$ 数学段原样保留
 *  （占位符保护，预览卡里由 KaTeX 渲染） */
function plainText(src: string): string {
  const maths: string[] = []
  const masked = src.replace(/\$[^$]+\$/g, (m) => {
    maths.push(m)
    return `\u0000${maths.length - 1}\u0000`
  })
  const cleaned = masked
    .replace(/\\url\{([^}]*)\}/g, '$1')
    .replace(/\\[a-zA-Z]+\{([^{}]*)\}/g, '$1')
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned.replace(/\u0000(\d+)\u0000/g, (_, d) => maths[Number(d)] ?? '')
}

/** 渲染一段行内文本为 VNode 数组 */
export function renderInline(src: string, ctx: RenderCtx = {}): VNode[] {
  const out: VNode[] = []
  let plain = '' // 连续普通字符缓冲，避免碎片 VNode
  const flush = () => {
    if (plain) {
      out.push(h('span', plain))
      plain = ''
    }
  }
  let i = 0
  const n = src.length
  while (i < n) {
    const c = src[i]
    // 行内公式 $...$
    if (c === '$' && src[i + 1] !== '$') {
      const end = src.indexOf('$', i + 1)
      if (end > i) {
        flush()
        out.push(mathVNode(src.slice(i + 1, end), false, ctx))
        i = end + 1
        continue
      }
    }
    // \(...\)
    if (c === '\\' && src[i + 1] === '(') {
      const end = src.indexOf('\\)', i + 2)
      if (end > i) {
        flush()
        out.push(mathVNode(src.slice(i + 2, end), false, ctx))
        i = end + 2
        continue
      }
    }
    if (c === '\\') {
      const cmd = readCommand(src, i)
      if (cmd) {
        i = cmd.end
        const arg = src[i] === '{' ? readGroup(src, i) : null
        switch (cmd.name) {
          case 'textbf':
            if (arg) { flush(); out.push(h('strong', null, renderInline(arg.body, ctx))); i = arg.end }
            break
          case 'emph':
          case 'em':
          case 'textit':
            if (arg) { flush(); out.push(h('em', null, renderInline(arg.body, ctx))); i = arg.end }
            break
          case 'texttt':
            if (arg) { flush(); out.push(h('code', null, renderInline(arg.body, ctx))); i = arg.end }
            break
          case 'underline':
            if (arg) { flush(); out.push(h('u', null, renderInline(arg.body, ctx))); i = arg.end }
            break
          case 'text':
          case 'mbox':
          case 'mathrm':
            if (arg) { out.push(...renderInline(arg.body, ctx)); i = arg.end }
            break
          case 'textsc':
            if (arg) { flush(); out.push(h('span', { style: 'font-variant: small-caps' }, renderInline(arg.body, ctx))); i = arg.end }
            break
          case 'cite':
          case 'citep':
          case 'citet':
            if (arg) {
              flush()
              out.push(h(CiteLink, { keys: arg.body.split(',').map(s => s.trim()), cites: ctx.cites }))
              i = arg.end
            }
            break
          case 'ref':
          case 'autoref':
          case 'cref':
          case 'Cref':
            if (arg) {
              flush()
              out.push(h(RefLink, { label: arg.body, kind: 'ref', zh: ctx.zh, labels: ctx.labels, anchors: ctx.anchors, secTitles: ctx.secTitles }))
              i = arg.end
            }
            break
          case 'eqref':
            if (arg) {
              flush()
              out.push(h(RefLink, { label: arg.body, kind: 'eqref', zh: ctx.zh, labels: ctx.labels, anchors: ctx.anchors }))
              i = arg.end
            }
            break
          case 'url':
          case 'rurl':
            if (arg) {
              flush()
              out.push(h(ExtLink, { href: arg.body, text: arg.body }))
              i = arg.end
            }
            break
          case 'href': {
            const url = arg
            if (url) {
              const second = readGroup(src, url.end)
              flush()
              if (second) {
                out.push(h(ExtLink, { href: url.body, text: plainText(second.body) || url.body }))
                i = second.end
              }
            }
            break
          }
          case 'footnote':
            if (arg) {
              flush()
              // 悬停显示脚注内容预览卡（RefTipLayer，与链接预览同款）；
              // 脚注无跳转目标，不显示方向箭头
              const text = plainText(arg.body)
              out.push(
                h(
                  'sup',
                  {
                    class: 'footnote',
                    onMouseenter: (e: MouseEvent) => {
                      if (text) queueTextTip(e.currentTarget as HTMLElement, '†', text)
                    },
                    onMouseleave: () => scheduleHideRefTip(),
                    // 触摸设备：点按直接显示（脚注无跳转，不做两段式）
                    onClick: (e: MouseEvent) => {
                      if (noHover.matches && text) {
                        e.preventDefault()
                        showTextTipNow(e.currentTarget as HTMLElement, '†', text)
                      }
                    },
                  },
                  '†',
                ),
              )
              i = arg.end
            }
            break
          case '%': case '&': case '_': case '#': case '$': case '{': case '}':
            plain += cmd.name
            break
          case ',': case ';': case ':': case ' ': case '!':
            plain += ' '
            break
          case '\\':
            flush()
            out.push(h('br'))
            break
          case 'S':
            plain += '§'
            break
          case 'L': // 波兰语 Ł
            plain += 'Ł'
            break
          case 'i': // 无点 i
            plain += 'ı'
            break
          case 'v': // 变音符号 ˇ（如 \v{r} -> ř）
            if (arg) { plain += arg.body.charAt(0) + '\u030C'; i = arg.end }
            break
          case 'c': // 下加符 ¸（如 \c{c} -> ç）
            if (arg) { plain += arg.body.charAt(0) + '\u0327'; i = arg.end }
            break
          case "'": // 锐音符（如 \'e -> é）
            if (arg) { plain += arg.body.charAt(0) + '\u0301'; i = arg.end }
            break
          case '`': // 重音符
            if (arg) { plain += arg.body.charAt(0) + '\u0300'; i = arg.end }
            break
          case '"': // 分音符（如 \"o -> ö）
            if (arg) { plain += arg.body.charAt(0) + '\u0308'; i = arg.end }
            break
          case 'natexlab': // natbib 内部年份标记：忽略
          case 'label': // 正文残留的 \label：忽略
            if (arg) i = arg.end
            break
          case 'dots': case 'ldots':
            plain += '…'
            break
          default:
            // 未知命令保留原文，便于发现漏解析的标记
            flush()
            out.push(h('span', { class: 'unknown-cmd', title: `未识别的命令 \\${cmd.name}` }, `\\${cmd.name}`))
            break
        }
        continue
      }
      i++
      continue
    }
    if (c === '~') { plain += '\u00A0'; i++; continue }
    if (c === '-' && src.startsWith('---', i)) { plain += '—'; i += 3; continue }
    if (c === '-' && src.startsWith('--', i)) { plain += '–'; i += 2; continue }
    if (c === '`' && src.startsWith('``', i)) { plain += '\u201C'; i += 2; continue }
    if (c === "'" && src.startsWith("''", i)) { plain += '\u201D'; i += 2; continue }
    if (c === '\n') { plain += ' '; i++; continue }
    plain += c
    i++
  }
  flush()
  return out
}
