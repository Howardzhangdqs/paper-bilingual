/**
 * 首页卡片 ⇄ 论文页头部的共享元素过渡（手写飞移层 + WAAPI）。
 *
 * 曾用 View Transitions API：快照层叠顺序由合成器决定，飞行元素会被
 * 页面快照遮挡；回调期间整页冻结；且仅新浏览器支持。现改为自管飞移层：
 *
 * 流程（前进/回程对称）：
 *  1. 点击瞬间测起点标题块的 rect 与排版样式，立即建克隆摆在原地
 *     （fixed 覆盖层，z-index 拉满、pointer-events: none），起点真实
 *     元素隐藏防双影——克隆与原画面像素级重合，用户看不到任何切换；
 *  2. 普通导航（页面不冻结）。克隆在覆盖层里跨路由持续存在，页面切换
 *     的整段时间飞行内容不打断、无空窗（新页面主体轻微淡入补场）；
 *  3. 落点 DOM 挂载、布局稳定后测落点，启动动画：位移走 transform
 *     （合成器、零布局），仅 width 与 font-size 逐帧插值——克隆根
 *     all:unset 后一切排版经继承取自包裹盒，文字每帧真实重排，无位图
 *     拉伸模糊；落点真实元素隐藏防双影，各自落定即换回真实元素；
 *  4. 动画期间滚动/缩放/新导航启动 → 立即跳到末态并清理。
 *
 * 起点 roll-off 钳制：论文页读到一半时头部早已滚出视口，fixed 克隆的
 * 起点坐标会在视口外，飞入视口前的那段位移观众看不见——观感是瞬移。
 * 起点完全滚出视口时钳到顶栏下方起飞，读作「顶栏标题展开落回卡片」。
 *
 * prefers-reduced-motion、捕获失败：直接普通导航。落点等待超时：保留
 * 已显示的页面，静默收场。
 */

/** 卡片/header 两侧一一对应的内容块（两侧选择器成对）。
 *
 * 只飞标题两块：作者块含 KaTeX 富文本、多行重排，width/font-size 的
 * 每帧插值会强制其整块重新排版——四块并行时明显掉帧。标题是纯文本，
 * 重排成本可忽略；作者/出处不飞，随新页面淡入衔接 */
const PARTS = [
  { key: 'titleEn', card: '.t', head: 'h1' },
  { key: 'titleZh', card: '.tz', head: '.zh-title' },
] as const

type PartKey = (typeof PARTS)[number]['key']

/** 起点快照：元素引用（克隆内容源 + 收尾恢复可见）+ 钳制后的几何与样式 */
interface PartStart {
  el: HTMLElement
  rect: { left: number; top: number; width: number }
  fontSize: string
  fontFamily: string
  fontWeight: string
  lineHeight: string
  color: string
}

/** 跨路由协调状态：App.vue 按路由记忆，回程时定位首页落点卡片。
    flying：飞移动画进行中——渐进挂载等主线程长任务暂避（见
    PaperBody 的 mountMore/pump），避免插值帧被挤掉造成卡顿 */
export const paperVt = {
  lastId: '',
  flying: false,
}

const LAYER_Z = 2147483000
/** 单块飞行时长与标题两块间的级联错峰（接力感） */
const DURATION = 460
const STAGGER = 30
/** 起点完全滚出视口时的起飞线：顶栏（约 47px）下缘附近 */
const OFFSCREEN_TOP = 56
/** 落点出现/稳定的等待上限：nav 内已 await 路由与 nextTick，这里只等
    布局稳定的双帧，超时说明页面异常，静默收场（不动画、不拦导航） */
const LANDING_TIMEOUT = 700

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function visible(el: Element | null): el is HTMLElement {
  return el instanceof HTMLElement && el.getClientRects().length > 0
}

/** 行高的可插值取值：computed 通常给 px；Firefox 对 normal 返回
    'normal'（不可插值），用块高兜底——标题单行，块高即行高 */
function lineHeightPx(el: HTMLElement, height: number): string {
  const n = parseFloat(getComputedStyle(el).lineHeight)
  return Number.isFinite(n) ? `${n}px` : `${height}px`
}

/** 文本内容的实际左缘（Range 实测，天然兼容左对齐/居中两种元素——
    居中元素的盒左缘不在文本处）。水平位移以它为锚：克隆盒全程左对齐、
    定位在起点文本左缘，transform 终值对齐落点文本左缘。若用盒左缘
    计算位移，居中 ⇄ 左对齐之间的差只能交给 text-align 的离散切换，
    飞行中段文本会水平横跳几十像素 */
function textLeft(el: HTMLElement, rect: DOMRect): number {
  const range = document.createRange()
  range.selectNodeContents(el)
  const tr = range.getBoundingClientRect()
  return tr.width > 0 ? tr.left : rect.left
}

/** 捕获一个起点块；不可见（如仅英文模式下的中文标题）返回 null。
    完全滚出视口顶部时 top 钳到起飞线（见文件头注释） */
function captureStart(el: HTMLElement | null): PartStart | null {
  if (!visible(el)) return null
  const cs = getComputedStyle(el)
  const r = el.getBoundingClientRect()
  return {
    el,
    rect: {
      left: textLeft(el, r),
      top: r.bottom <= OFFSCREEN_TOP ? OFFSCREEN_TOP : r.top,
      width: r.width,
    },
    fontSize: cs.fontSize,
    fontFamily: cs.fontFamily,
    fontWeight: cs.fontWeight,
    lineHeight: lineHeightPx(el, r.height),
    color: cs.color,
  }
}

/** 捕获一侧容器内的全部起点块（.paper-card 或 .paper-header） */
function captureStarts(
  container: HTMLElement,
  sel: (p: (typeof PARTS)[number]) => string,
): Map<PartKey, PartStart> {
  const starts = new Map<PartKey, PartStart>()
  for (const p of PARTS) {
    const s = captureStart(container.querySelector<HTMLElement>(sel(p)))
    if (s) starts.set(p.key, s)
  }
  return starts
}

/** 等落点容器出现且布局稳定（双 rAF），超时返回 null */
function waitForLanding(find: () => HTMLElement | null): Promise<HTMLElement | null> {
  const deadline = performance.now() + LANDING_TIMEOUT
  return new Promise((resolve) => {
    const poll = () => {
      const el = find()
      if (visible(el)) {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => resolve(visible(el) ? el : null)),
        )
        return
      }
      if (performance.now() > deadline) return resolve(null)
      requestAnimationFrame(poll)
    }
    poll()
  })
}

/**
 * 建一个飞行块：包裹 div 承担几何与全部排版（transform/width/fontSize
 * 的动画帧作用在它上面，克隆根经继承自动跟随）。克隆根 all:unset——
 * 脱离原选择器作用域后（如 .paper-header h1）原 CSS 不再命中，h1 的
 * UA 默认字号/边距也被清掉，一切视觉由包裹盒供给。
 */
function makeFlyPart(start: PartStart): HTMLDivElement {
  const box = document.createElement('div')
  box.className = 'fly-part'
  Object.assign(box.style, {
    position: 'absolute',
    margin: '0',
    padding: '0',
    left: `${start.rect.left}px`,
    top: `${start.rect.top}px`,
    width: `${start.rect.width}px`,
    fontSize: start.fontSize,
    fontFamily: start.fontFamily,
    fontWeight: start.fontWeight,
    lineHeight: start.lineHeight,
    color: start.color,
    /* 全程左对齐：水平位置完全由盒左缘（文本左缘锚点）+ transform
       承担，避免 text-align 离散切换造成的横跳（见 textLeft 注释） */
    textAlign: 'start',
  })
  const clone = start.el.cloneNode(true) as HTMLElement
  clone.style.cssText = 'all: unset; display: block;'
  box.appendChild(clone)
  return box
}

/* ============================================================
 * 单次飞移的编排：互斥（新动画打断旧的）、可中断（滚动/缩放跳末态）。
 * 每个 run 持有自己的覆盖层与动画列表，teardown 只清理自己的。
 * ============================================================ */

let activeFly: { abort: () => void } | null = null
/** 活跃飞移的引用计数：动画互相打断时，旧流程的收尾不能摘掉新流程的
    fly-nav 类（新页面主体的入场淡入依赖它） */
let flyNavRefs = 0

async function runFly(
  starts: Map<PartKey, PartStart>,
  nav: () => Promise<void>,
  findLanding: () => HTMLElement | null,
  /** 落点容器内找两块的选择器（卡片侧与 header 侧不同） */
  landingSel: (p: (typeof PARTS)[number]) => string,
): Promise<void> {
  activeFly?.abort()

  const doc = document.documentElement
  doc.classList.add('fly-nav')
  flyNavRefs++
  paperVt.flying = true

  const layer = document.createElement('div')
  layer.className = 'paper-fly-layer'
  layer.style.zIndex = String(LAYER_Z)
  document.body.appendChild(layer)
  const anims: Animation[] = []
  const hiddenEls: HTMLElement[] = [] // 起点+落点被隐藏的真实元素
  let live = 0
  let settled = 0
  let done = false

  /* 滚动/缩放/新导航：落点 rect 已失真，全部跳到末态——各动画走
     finished 回调统一清理，一帧内收敛到最终画面 */
  const jumpToEnd = () => {
    for (const a of anims) {
      try {
        a.finish()
      } catch {
        /* 已结束的动画再 finish 可能抛 InvalidState，忽略 */
      }
    }
  }
  activeFly = { abort: jumpToEnd }

  const teardown = () => {
    if (done) return
    done = true
    if (--flyNavRefs <= 0) {
      flyNavRefs = 0
      doc.classList.remove('fly-nav')
    }
    paperVt.flying = flyNavRefs > 0
    layer.remove()
    window.removeEventListener('scroll', jumpToEnd, true)
    window.removeEventListener('resize', jumpToEnd)
    /* 正常路径各块落定时已自行恢复；这里兜底异常中断（导航失败、等待
       超时）时仍在文档里的隐藏元素（页面已卸载的恢复不了也无需） */
    for (const el of hiddenEls) {
      if (el.isConnected) el.style.visibility = ''
    }
    if (activeFly?.abort === jumpToEnd) activeFly = null
  }
  const isMine = () => activeFly?.abort === jumpToEnd

  /* 第一步：导航前就在起点原地接管——克隆与原画面重合，页面切换期间
     飞行内容持续存在，没有「消失再突现」的空窗 */
  const boxes = new Map<PartKey, HTMLDivElement>()
  for (const p of PARTS) {
    const start = starts.get(p.key)
    if (!start) continue
    const box = makeFlyPart(start)
    layer.appendChild(box)
    boxes.set(p.key, box)
    start.el.style.visibility = 'hidden'
    hiddenEls.push(start.el)
  }
  if (boxes.size === 0) return teardown()

  try {
    await nav()
    if (!isMine()) return teardown() // 被更新的导航打断：只清理自己的残留
    /* 滚动同步归零：vue-router 的 scrollBehavior 在 push resolve 之后
       才异步执行，落点测量若抢在它前面，卡片 rect 还带着上一篇论文页
       的滚动偏移，克隆会飞向错误位置——这里主动归零（与 scrollBehavior
       的 {top: 0} 语义一致，幂等），测量必定正确 */
    window.scrollTo(0, 0)
    const landing = await waitForLanding(findLanding)
    if (!isMine()) return teardown()
    if (!landing) return teardown() // 落点迟迟不出现：静默收场保导航

    window.addEventListener('scroll', jumpToEnd, { capture: true, passive: true })
    window.addEventListener('resize', jumpToEnd)

    PARTS.forEach((p, i) => {
      const start = starts.get(p.key)
      const box = boxes.get(p.key)
      const landEl = landing.querySelector<HTMLElement>(landingSel(p))
      if (!start || !box || !visible(landEl)) return
      const endRect = landEl.getBoundingClientRect()
      const cs = getComputedStyle(landEl)
      landEl.style.visibility = 'hidden'
      hiddenEls.push(landEl)
      live++

      /* 位移走 transform（合成器属性，不触发布局），width/font-size/
         font-weight/line-height/color 逐帧插值——字号、字重（卡片中文
         标题 400 → 页头 700）与行高（页头 h1 显式 1.3，克隆默认继承
         body 的 1.6+，不插值则落定瞬间垂直跳动）随飞行平滑渐变，落定
         与真实元素像素级重合；只有两行纯文本的重排，成本可忽略。
         水平位移以文本左缘为锚（见 textLeft）：起点居中 ⇄ 落点左对齐
         的全部水平距离都进入 dx 插值，没有 text-align 离散切换的横跳 */
      const dx = textLeft(landEl, endRect) - start.rect.left
      const dy = endRect.top - start.rect.top
      const anim = box.animate(
        [
          {
            transform: 'translate(0px, 0px)',
            width: `${start.rect.width}px`,
            fontSize: start.fontSize,
            fontWeight: start.fontWeight,
            lineHeight: start.lineHeight,
            color: start.color,
          },
          {
            transform: `translate(${dx}px, ${dy}px)`,
            width: `${endRect.width}px`,
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            lineHeight: lineHeightPx(landEl, endRect.height),
            color: cs.color,
          },
        ],
        {
          duration: DURATION,
          delay: i * STAGGER,
          /* easeInOutCubic：两端缓、中段快（对称），贝塞尔近似即此 */
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          fill: 'forwards',
        },
      )
      anims.push(anim)
      anim.finished
        .catch(() => undefined)
        .then(() => {
          landEl.style.visibility = ''
          box.remove()
          if (++settled >= live) teardown()
        })
    })

    if (live === 0) teardown() // 落点两块都不可见（如仅英文模式）：收场
  } catch {
    jumpToEnd()
    teardown()
  }
}

/**
 * 前进：点击首页卡片 → 标题飞向论文页头部。
 * nav 内完成路由跳转并等 DOM 更新。
 */
export function flyToPaper(card: HTMLElement, nav: () => Promise<void>): Promise<void> {
  if (reducedMotion()) return nav()
  const starts = captureStarts(card, (p) => p.card)
  if (!starts.size) return nav()
  return runFly(
    starts,
    nav,
    () => document.querySelector<HTMLElement>('.paper-header'),
    (p) => p.head,
  )
}

/**
 * 回程：论文页点站名返回 → 头部标题飞回首页对应卡片（paperVt.lastId）。
 */
export function flyBackToHome(nav: () => Promise<void>): Promise<void> {
  if (reducedMotion()) return nav()
  const header = document.querySelector<HTMLElement>('.paper-header')
  if (!visible(header)) return nav()
  const starts = captureStarts(header, (p) => p.head)
  if (!starts.size) return nav()
  const lastId = paperVt.lastId
  return runFly(
    starts,
    nav,
    () => document.querySelector<HTMLElement>(`.paper-card[data-id="${lastId}"]`),
    (p) => p.card,
  )
}
