/**
 * 页内跳转：content-visibility: auto 的正文块用占位高度参与文档坐标
 * 计算，滚动到位后实化展开——终点会越滚越偏。做法（在 rAF 中执行，
 * 跳出事件派发栈——事件处理器内同步定位拿到的是占位/实化混合的布
 * 局）：跳转前把正文块临时设为 visible 并强制同步布局（visible 无需
 * 视口判定，全部以真实尺寸参与计算），二次定位拿到准确终点；随后把
 * **起点/终点视口窗口之外的块冻结**为 content-visibility: hidden 并把
 * contain-intrinsic-size 锁定为各自真实高度——占位与实化尺寸逐像素
 * 一致，布局零变化，而滚动途中浏览器完全跳过这些块的内容布局与绘制
 * （视觉为浅灰骨架占位），长距离滚动全程无渲染开销。随后自驱动滚动
 * 动画（rAF 逐帧 scrollTo + ease-in-out 缓动：慢起-快中-缓收，时长随
 * 距离自适应；原生 behavior:'smooth' 曲线观感生硬）到位后恢复 auto：
 * 远处回落占位与目标视口同帧生效，视觉零跳变。用户输入（滚轮/触摸/
 * 按键/拖动）随时打断动画并同步恢复 auto（纯写批成本极低，不重定位
 * 不回调）。
 *
 * 性能约束——本文件所有 DOM 几何读写必须整批进行：读批（一次强制布
 * 局后把全部块的 top/height 读尽，期间零写入）在前，写批（只写
 * containIntrinsicSize / contentVisibility，末尾统一强制一次布局）在
 * 后。若逐块读写交替，每读一块都会因前一块的写入而强制一次全文档同
 * 步布局，两百多个块会冻结主线程秒级（必须避免）。
 */
const CV_SELECTOR = '.paper-body .pair-row, .paper-body .full-block, .paper-body .list-block'

/** 冻结块的骨架占位样式类（浅灰底，见 style.css） */
const FROZEN_CLASS = 'cv-frozen'

/** 起点/终点视口向前后各扩展的缓冲（屏） */
const FREEZE_BUFFER_SCREENS = 1

/** 滚动动画时长（ms）：距离自适应，钳在 [SCROLL_MIN_MS, SCROLL_MAX_MS] */
const SCROLL_MIN_MS = 350
const SCROLL_MAX_MS = 1500
const SCROLL_MS_PER_PX = 0.09

/** 当前跳转的收尾句柄：新跳转开始前先取消旧的（恢复 auto、不重定位） */
let cancelSettle: (() => void) | null = null

/** 跳转状态广播事件名（window 上的 CustomEvent，撤销按钮等 UI 监听） */
export const JUMP_EVENT = 'paper-jump'

/** 跳转状态：start 开始（隐藏按钮）/ arrived 到位（显示撤销按钮）/
 *  interrupted 被用户输入打断 / undone 撤销已发起 */
export type JumpState = 'start' | 'arrived' | 'interrupted' | 'undone'

/** 最近一次成功跳转的起点（撤销目标）；无撤销点时为 null */
let undoY: number | null = null

function emitJump(state: JumpState) {
  window.dispatchEvent(new CustomEvent(JUMP_EVENT, { detail: state }))
}

/** 单个正文块的实化几何：top 为文档绝对坐标，contentH 为内容盒高度 */
interface BlockGeom {
  el: HTMLElement
  top: number
  contentH: number
}

export function jumpTo(
  el: HTMLElement | null | undefined,
  block: ScrollLogicalPosition = 'start',
  /** 滚动到位后回调（跳转被用户输入打断时不触发）——目标高亮用 */
  onArrive?: () => void,
) {
  if (!el) return
  beginJump(
    () => {
      el.scrollIntoView({ behavior: 'instant', block })
      void document.body.offsetHeight
      el.scrollIntoView({ behavior: 'instant', block }) // 二次定位，消除残余偏差
      return scrollY
    },
    onArrive,
  )
}

/** 撤销最近一次跳转：以同样的滚动体验回到跳转前位置。撤销跳转本身
 *  不产生新的撤销点（避免来回横跳），按钮由 undone 事件隐藏。 */
export function undoJump() {
  if (undoY == null) return
  const y = undoY
  undoY = null
  emitJump('undone')
  beginJump(() => y, undefined, true)
}

/** 离开论文页等场景：取消进行中的跳转并丢弃撤销点 */
export function resetJump() {
  cancelSettle?.()
  cancelSettle = null
  undoY = null
}

/**
 * 跳转主流程：preload 图片 → 全文实化（读批采集几何）→ resolveTo 得到
 * 终点 → 冻结窗口外的块（写批）→ ease-in-out 滚动 → 恢复 auto。普通
 * 跳转成功后记录撤销点（起点）并广播 arrived；被打断则丢弃撤销点并广
 * 播 interrupted；撤销跳转（isUndo）两者皆不做。
 */
function beginJump(resolveTo: () => number, onArrive?: () => void, isUndo = false) {
  cancelSettle?.()
  cancelSettle = null
  emitJump('start')
  // 懒加载图片未就位时，滚动途中图片陆续加载会持续撑高布局，把进行中的
  // smooth 滚动中止在中途——先请求并解码全部正文图片（本地资源很快，
  // 800ms 兜底），布局稳定后再定位滚动
  void preloadLazyImages().then(() => {
    requestAnimationFrame(() => {
      const nodes = document.querySelectorAll<HTMLElement>(CV_SELECTOR)
      for (const n of nodes) n.style.contentVisibility = 'visible'
      // 等两个渲染帧：content-visibility 的 last-remembered-size 在渲染
      // （paint）后才记录，否则恢复 auto 时块会立即回落到占位高度，
      // 长距离滚动的终点随内容收缩而漂移
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // —— 读批：采集全部块的真实几何，期间不做任何写入 ——
          const geoms = collectGeom(nodes)
          const from = scrollY
          const to = resolveTo()
          if (Math.abs(to - from) < 2) {
            unfreeze(nodes)
            onArrive?.()
            return
          }
          // —— 写批：锁定占位高度，冻结滚动窗口之外的块 ——
          freeze(geoms, from, to)
          scrollTo(0, from)
          cancelSettle = animateScroll(to, (arrived) => {
            cancelSettle = null
            unfreeze(nodes)
            if (arrived) {
              onArrive?.()
              if (!isUndo) {
                undoY = from
                emitJump('arrived')
              }
            } else {
              undoY = null
              emitJump('interrupted')
            }
          })
        })
      })
    })
  })
}

/** 请求并解码正文懒加载图片（带兜底超时），消除加载中的布局漂移 */
function preloadLazyImages(): Promise<void> {
  const imgs = [...document.querySelectorAll<HTMLImageElement>('.paper-body img')]
  const pending = imgs.filter((i) => !i.complete)
  if (!pending.length) return Promise.resolve()
  for (const i of pending) i.loading = 'eager'
  return Promise.race([
    Promise.all(pending.map((i) => i.decode().catch(() => {}))),
    new Promise<void>((r) => setTimeout(r, 800)),
  ]).then(() => {})
}

/** 读批：全文实化后采集各块文档坐标与内容盒高度（contain-intrinsic-size
 *  语义为内容盒尺寸，而 offsetHeight 是边框盒尺寸，须扣除 padding/border） */
function collectGeom(nodes: NodeListOf<HTMLElement>): BlockGeom[] {
  void document.body.offsetHeight // 强制同步布局，使 visible 立即生效
  return [...nodes].map((el) => {
    const cs = getComputedStyle(el)
    const extra =
      parseFloat(cs.paddingTop) +
      parseFloat(cs.paddingBottom) +
      parseFloat(cs.borderTopWidth) +
      parseFloat(cs.borderBottomWidth)
    return {
      el,
      top: el.getBoundingClientRect().top + scrollY,
      contentH: el.offsetHeight - extra,
    }
  })
}

/** 写批：全部块占位高度锁定为真实尺寸；起点/终点视口（含缓冲屏）之外
 *  的块冻结为 hidden——占位尺寸不变，文档高度与 smooth 终点全程稳定，
 *  滚动途中被扫过的区域零布局零绘制（骨架占位） */
function freeze(geoms: BlockGeom[], from: number, to: number) {
  const buf = FREEZE_BUFFER_SCREENS * window.innerHeight
  const windows = [
    [from - buf, from + window.innerHeight + buf],
    [to - buf, to + window.innerHeight + buf],
  ]
  for (const g of geoms) {
    g.el.style.containIntrinsicSize = `auto ${g.contentH}px`
    const keep = windows.some(([w0, w1]) => g.top < w1 && g.top + g.contentH > w0)
    if (!keep) {
      g.el.style.contentVisibility = 'hidden'
      g.el.classList.add(FROZEN_CLASS)
    }
  }
  void document.body.offsetHeight
}

/** 写批：恢复全部块为 CSS 里的 content-visibility: auto，移除骨架样式。
 *  占位高度已在冻结时逐块锁定为真实尺寸，恢复 auto 布局零变化。 */
function unfreeze(nodes: NodeListOf<HTMLElement>) {
  for (const n of nodes) {
    n.style.contentVisibility = ''
    n.classList.remove(FROZEN_CLASS)
  }
  void document.body.offsetHeight
}

/** ease-in-out（cubic）：慢起-快中-缓收，峰值速度约为均速的 3 倍 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/** 视为“用户接管滚动”的输入事件（拖滚动条由 pointerdown 覆盖） */
const INPUT_EVENTS: (keyof WindowEventMap)[] = ['wheel', 'touchstart', 'keydown', 'pointerdown']

/**
 * 自驱动平滑滚动：rAF 逐帧 scrollTo + ease-in-out 插值（浏览器原生
 * behavior:'smooth' 无法定制曲线）。任何用户输入立即让位并按被打断
 * 收尾；返回停止句柄供新跳转取消旧动画。系统偏好减少动画时瞬时到位。
 */
function animateScroll(to: number, onEnd: (arrived: boolean) => void): () => void {
  const from = scrollY
  const dist = to - from
  if (Math.abs(dist) < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scrollTo(0, to)
    onEnd(true)
    return () => {}
  }
  const duration = Math.min(
    SCROLL_MAX_MS,
    Math.max(SCROLL_MIN_MS, SCROLL_MIN_MS + Math.abs(dist) * SCROLL_MS_PER_PX),
  )
  const start = performance.now()
  let raf = 0
  let stopped = false
  const stop = () => finish(false)
  function finish(arrived: boolean) {
    if (stopped) return
    stopped = true
    cancelAnimationFrame(raf)
    for (const ev of INPUT_EVENTS) window.removeEventListener(ev, stop)
    onEnd(arrived)
  }
  for (const ev of INPUT_EVENTS) window.addEventListener(ev, stop, { passive: true })
  const frame = (now: number) => {
    if (stopped) return
    const t = Math.min(1, (now - start) / duration)
    scrollTo(0, from + dist * easeInOutCubic(t))
    if (t >= 1) finish(true)
    else raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)
  return stop
}
