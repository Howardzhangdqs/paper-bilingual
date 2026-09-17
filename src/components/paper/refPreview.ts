/**
 * 链接悬停预览：式/图/表/章节交叉引用（RefLink）与文献引用（CiteLink）
 * 悬停时显示目标内容摘要 + 上下文方向（↑上文 / ↓下文），由 RefTipLayer
 * 渲染。摘要直接从目标 DOM 提取：
 * - 公式行（.eq-formula-row）→ KaTeX 渲染结果整段克隆；
 * - 图/表（figure-block / table-block）→ 中英题注逐行克隆（保留行内公式）；
 * - 章节（heading-row）→ 后续首块正文文字摘要；
 * - 文献条目（li#cite-*）→ 条目文本。
 * 目标块可能处于 content-visibility 占位态（未渲染布局），文本一律用
 * textContent（innerText 依赖布局会取到空）；KaTeX/题注的 HTML 在 DOM
 * 中已就绪，克隆进卡片后由浏览器正常渲染。
 */
import { reactive } from 'vue'
import katex from 'katex'

export interface RefPreviewData {
  /** 编号/标题行（“式 (12)”“Figure 3”“§6 …”“[42]”） */
  title: string
  /** 目标相对当前视口的方向：up 上文 / down 下文 / null 当前可见 */
  dir: 'up' | 'down' | null
  /** 正文 HTML（公式/题注克隆，已渲染的 KaTeX 等）；与 text 二选一 */
  html: string
  /** 纯文本正文（章节/文献摘要），换行分段 */
  text: string
}

/** RefTipLayer 渲染用的共享状态 */
export const refTip = reactive({
  visible: false,
  left: '0px',
  top: '0px',
  host: null as HTMLElement | null,
  data: null as RefPreviewData | null,
  /** 触摸两段式：卡片内「点我跳转」按钮要执行的跳转动作（仅触摸
   *  首击设置；桌面悬停与纯文本提示为 null，不渲染按钮） */
  jumpAction: null as (() => void) | null,
})

let pending: ReturnType<typeof setTimeout> | null = null
/** 延迟隐藏句柄：离开链接后短暂保留卡片，给鼠标移入卡片的时间 */
let hideTimer: ReturnType<typeof setTimeout> | null = null
/** 触摸两段式点击已激活（显示过预览）的链接元素 */
let armedHost: HTMLElement | null = null

/** 触摸设备（无悬停）：链接预览走“点一下显示、再点一下跳转”两段式 */
export const noHover = matchMedia('(hover: none)')

/** 链接/卡片 mouseleave：短暂延迟后隐藏——期间鼠标移入卡片则保留 */
export function scheduleHideRefTip() {
  if (pending) {
    clearTimeout(pending)
    pending = null
  }
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    hideTimer = null
    refTip.visible = false
  }, 220)
}

/** 卡片 mouseenter / 重新悬停：取消延迟隐藏 */
export function keepRefTip() {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

/** 重置触摸两段式状态（跳转完成后调用——下次点击该链接重新走两段式；
 *  滚动隐藏卡片不重置：预览已看过，再点直接跳转） */
export function resetTouchArm() {
  armedHost = null
}

/** 悬停 150ms 后显示预览（防鼠标扫过误触）；离开时调 cancelRefTip */
export function queueRefTip(host: HTMLElement, target: HTMLElement | null, title: string) {
  cancelRefTip()
  pending = setTimeout(() => {
    pending = null
    showRefTipNow(host, target, title)
  }, 150)
}

/** 立即显示链接预览（触摸两段式点击的首击用，无防抖延迟） */
export function showRefTipNow(host: HTMLElement, target: HTMLElement | null, title: string) {
  if (!target?.isConnected) return
  const data = buildRefPreview(target, title)
  if (!data) return
  refTip.host = host
  refTip.data = data
  refTip.jumpAction = null
  refTip.visible = true
}

/** 触摸两段式点击：首击显示预览卡并返回 false（调用方不跳转）——
 *  卡内「点我跳转」按钮执行 onJump，再击同一链接也返回 true 跳转；
 *  点击其他链接或空白由 document 级委托重置（见模块尾部）。 */
export function armTouchJump(
  host: HTMLElement,
  target: HTMLElement | null,
  title: string,
  onJump: () => void,
): boolean {
  if (armedHost === host) {
    armedHost = null
    return true
  }
  armedHost = host
  cancelRefTip()
  showRefTipNow(host, target, title)
  refTip.jumpAction = onJump
  return false
}

/** 无跳转目标的悬停预览（如脚注 †）：直接给定文本，不显示方向箭头；
 *  文本中的 $...$ 行内数学用 KaTeX 渲染 */
export function queueTextTip(host: HTMLElement, title: string, text: string) {
  cancelRefTip()
  pending = setTimeout(() => {
    pending = null
    showTextTipNow(host, title, text)
  }, 150)
}

/** 立即显示文本预览（触摸点击脚注用） */
export function showTextTipNow(host: HTMLElement, title: string, text: string) {
  if (!host.isConnected) return
  refTip.host = host
  refTip.data = { title, dir: null, html: mathToHtml(text), text: '' }
  refTip.jumpAction = null
  refTip.visible = true
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c)
}

/** 文本 → HTML：$...$ 行内数学段用 KaTeX 渲染，其余段 HTML 转义。
 *  数学段只在 $ 成对出现时生效（split 捕获组的奇数索引） */
function mathToHtml(text: string): string {
  if (!text.includes('$')) return escapeHtml(text)
  return text
    .split(/\$([^$]+)\$/g)
    .map((seg, i) =>
      i % 2
        ? katex.renderToString(seg, { throwOnError: false, strict: false })
        : escapeHtml(seg),
    )
    .join('')
}

/** 取消未显示的延迟预览并立即隐藏已显示的卡片（滚动/Esc/换目标用） */
export function cancelRefTip() {
  if (pending) {
    clearTimeout(pending)
    pending = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  refTip.visible = false
}

/** 压平空白并按需截断加省略号 */
function clip(s: string | null | undefined, n: number): string {
  const t = (s ?? '').replace(/\s+/g, ' ').trim()
  return t.length > n ? `${t.slice(0, n).trimEnd()}…` : t
}

/** 章节摘要：中文标题 + 后续 1~2 块正文的中文列/中文题注文字 */
function sectionDigest(heading: HTMLElement): string {
  const parts: string[] = []
  const zhTitle = heading.querySelector('.zh-col')?.textContent?.trim()
  if (zhTitle) parts.push(zhTitle)
  let el: HTMLElement | null = heading
  let n = 0
  while (el && n < 2) {
    el = el.nextElementSibling as HTMLElement | null
    if (!el || el.classList.contains('heading-row')) break
    const zhCol = el.querySelector('.zh-col')?.textContent?.trim()
    const zhCap = el.querySelector('.zh-cap')?.textContent?.trim()
    const body = clip(zhCol || zhCap || el.textContent, 120)
    if (body) {
      parts.push(body)
      n++
    }
  }
  return parts.join('\n')
}

export function buildRefPreview(target: HTMLElement, title: string): RefPreviewData | null {
  const r = target.getBoundingClientRect()
  const dir: 'up' | 'down' | null = r.bottom < 0 ? 'up' : r.top > innerHeight ? 'down' : null

  // 公式行（\eqref 目标）
  const eqRow = target.closest('.eq-formula-row')
  if (eqRow) {
    const html = eqRow.querySelector('.eq-formula')?.innerHTML
    if (html) return { title, dir, html, text: '' }
  }

  // 图/表题注（\ref 目标）
  if (target.classList.contains('figure-block') || target.classList.contains('table-block')) {
    const cap = target.querySelector(':scope > .caption')
    if (cap) {
      const lines = ['.en-cap', '.zh-cap']
        .map((sel) => cap.querySelector(sel)?.innerHTML?.trim())
        .filter(Boolean)
        .map((h) => `<div class="cap-line">${h}</div>`)
        .join('')
      if (lines) return { title, dir, html: lines, text: '' }
    }
  }

  // 章节标题（\autoref{sec:...} 目标）
  if (target.classList.contains('heading-row')) {
    const text = sectionDigest(target)
    if (text) return { title, dir, html: '', text }
  }

  // 兜底：目标块自身文本（文献条目等）
  const text = clip(target.textContent, 280)
  return text ? { title, dir, html: '', text } : null
}

/* 触摸设备：点击预览卡与带预览的链接以外的区域时收起卡片、重置
 * 两段式状态（capture 阶段先于链接自身的 click 处理器执行） */
if (noHover.matches) {
  document.addEventListener(
    'click',
    (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      if (t.closest('.ref-tip')) return
      if (t.closest('a.ref, .cite-n, sup.footnote')) return
      armedHost = null
      cancelRefTip()
    },
    true,
  )
}
