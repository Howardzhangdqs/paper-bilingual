/**
 * 首页卡片 ⇄ 论文页头部的共享元素过渡（View Transitions API）。
 *
 * 前进：点击卡片时给卡内的英文标题/中文标题/作者/出处打上
 * view-transition-name，论文页头部的同名元素（style.css 静态声明）
 * 即为落点，浏览器自动播放飞移 + 快照交叉淡入。
 * 回程：从论文页点站名返回时置 backPending，首页 HomeView 挂载时给
 * 最近一篇论文的卡片（paperVt.lastId）打上同名，动画反向播放。
 * 浏览器不支持、或系统开启「减弱动态效果」时直接普通导航，无动画。
 */

/** 过渡名：论文页头部（style.css 静态声明）与首页卡片（动态打标）共用 */
export const VT = {
  titleEn: 'vt-title-en',
  titleZh: 'vt-title-zh',
  authors: 'vt-authors',
  venue: 'vt-venue',
} as const

/** 跨路由的过渡协调状态 */
export const paperVt = {
  /** 最近浏览的论文 id（App.vue 按路由记忆），回程时定位对应卡片 */
  lastId: '',
  /** 站名返回导航进行中：HomeView 挂载时消费，给对应卡片打过渡名 */
  backPending: false,
}

/** 已打上过渡名的元素：下次打标前清掉，避免同名重复导致过渡失效 */
let marked: HTMLElement[] = []

/** 给首页卡片的四个内容块打上过渡名（选择器与论文页头部一一对应） */
export function markCardForTransition(card: Element) {
  clearMarkedCard()
  const pairs: Array<readonly [string, string]> = [
    ['.t', VT.titleEn],
    ['.tz', VT.titleZh],
    ['.m-authors', VT.authors],
    ['.m-venue', VT.venue],
  ]
  for (const [sel, name] of pairs) {
    const el = card.querySelector<HTMLElement>(sel)
    if (!el) continue
    el.style.setProperty('view-transition-name', name)
    marked.push(el)
  }
}

function clearMarkedCard() {
  for (const el of marked) el.style.removeProperty('view-transition-name')
  marked = []
}

/**
 * 导航包装：支持动画时经 startViewTransition 执行 nav（nav 内完成
 * 路由跳转并等 DOM 更新），否则直接普通导航。
 */
export function navigateWithTransition(nav: () => Promise<void>): Promise<void> {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduceMotion) return nav()
  return document.startViewTransition(nav).finished
}
