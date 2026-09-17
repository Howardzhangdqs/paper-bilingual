/**
 * KaTeX 渲染结果缓存：同一 LaTeX 源（同渲染选项）只调一次
 * renderToString。
 *
 * 背景：论文挂载期间，编号上下文（derived）随写作组件逐个注册而多次
 * 重算，文本组件因此整体重渲染——行内/行间公式的 KaTeX 输出只依赖
 * 源码与宏，不依赖编号，重算纯属浪费（实测一次导航 1953 次调用、
 * DOM 中仅 985 个公式）。缓存后重复渲染只做字符串比对。
 *
 * 缓存键含调用方 profile（行内与行间公式的 trust 等渲染选项不同）；
 * 行内宏随论文而异，按宏对象 WeakMap 隔离，切换论文后旧缓存可回收。
 */
import katex from 'katex'

export type TexProfile = 'inline' | 'block'

const macroCaches = new WeakMap<object, Map<string, string>>()
const plainCache = new Map<string, string>()

export function renderTexCached(
  tex: string,
  profile: TexProfile,
  opts: { display?: boolean; macros?: Record<string, string> } = {},
): string {
  const { display = false, macros } = opts
  const key = `${profile}|${display ? 'D' : 'I'}|${tex}`
  let cache = plainCache
  if (macros) {
    cache = macroCaches.get(macros) ?? new Map()
    macroCaches.set(macros, cache)
  }
  const hit = cache.get(key)
  if (hit !== undefined) return hit
  const html = katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    strict: false,
    macros,
    trust: profile === 'inline' ? true : (c) => c.command === '\\htmlData',
  })
  cache.set(key, html)
  return html
}
