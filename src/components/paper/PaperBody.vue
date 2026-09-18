<script setup lang="ts">
/**
 * 论文容器：包住各 section 组件。负责布局（目录 + 正文）、编号上下文、
 * 文末 References 与滚动高亮；slot 章节渐进挂载（首批同步，其余滚动
 * 临近/空闲分批，详见下方「渐进挂载」）。论文入口 index.vue：
 *
 * <PaperBody :meta="meta" :cites="cites" :references="references" :macros="{...}">
 *   <S01 /><S02 /> ...
 * </PaperBody>
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import { Icon } from '@iconify/vue'
import type { PaperMeta, TocEntry } from '../../types'
import { immersive } from '../../immersive'
import { settings } from '../../settings'
import { paperTocById } from '../../data/registry'
import RichText from '../RichText'
import { makeRenderCtx, provideLazyMount, providePaper, useToc } from './registry'
import { jumpTo, resetJump } from './scroll'
import { titleScrolledAway, topbarSectionLabel, topbarSectionDir, topbarSectionFast } from '../../topbarTitle'
import JumpUndoFab from './JumpUndoFab.vue'
import RefTipLayer from './RefTipLayer.vue'
import TipLayer from './TipLayer.vue'

const props = defineProps<{
  meta: PaperMeta
  cites?: Record<string, number>
  references?: Record<string, string>
  macros?: Record<string, string>
  /** 修正自动推导覆盖不到的 label 编号（如原文坏引用），一般留空 */
  extraLabels?: Record<string, string>
}>()

const paperCtx = providePaper({
  cites: props.cites,
  macros: props.macros,
  extraLabels: props.extraLabels,
  /* 编译期目录的锚点 id 表：Heading 按注册顺序领取，DOM 与目录对齐 */
  headingIds: paperTocById[props.meta.id]?.headingIds,
})
const ctx = paperCtx.ctx
const rctx = makeRenderCtx(paperCtx.derived, paperCtx.data)

/* 目录数据源：编译期静态目录优先（scripts/gen_toc.mjs 生成，随主包
   eager 加载，进页即完整，不随正文渐进挂载逐步补齐）；未生成的论文
   回退运行时注册表推导（形态与静态条目一致） */
const runtimeToc = useToc(ctx)
const toc = computed<TocEntry[]>(() => {
  const staticToc = paperTocById[props.meta.id]?.toc
  if (staticToc) return staticToc
  return runtimeToc.value.map((h) => ({
    domId: h.domId,
    level: (h.item.level ?? 1) as 1 | 2,
    number: h.number,
    titleEn: h.item.titleEn,
    titleZh: h.item.titleZh,
  }))
})

const referenceItems = computed(() => {
  if (!props.references) return []
  return Object.entries(props.references).sort(
    (a, b) => (props.cites?.[a[0]] ?? 0) - (props.cites?.[b[0]] ?? 0),
  )
})

/* 目录滚动高亮 */
const activeId = ref('')

/* 渐进挂载：整篇论文 4 万+ DOM 节点、近千个公式一次性同步挂载是一个
   秒级长任务（点击后白屏等待）。改为首批章节同步挂载，其余在滚动临近
   （哨兵 IntersectionObserver）或浏览器空闲时分小批挂载——首屏立即可
   读，后续批次也不卡交互；图表公式编号随挂载逐步收敛（目录为编译期
   静态数据，进页即完整），跳转到尚未挂载的目标时由 ensureMounted
   立即补齐 */
const slots = useSlots()
/** slot 子节点里的章节组件（过滤注释/空白等非组件 vnode） */
const children = computed(() =>
  (slots.default?.() ?? []).filter((n) => typeof n.type === 'object' || typeof n.type === 'function'),
)
const MOUNT_INITIAL = 3 // 首批同步挂载的章节数（约首屏两三屏）
const MOUNT_SCROLL_BATCH = 4 // 哨兵可见时挂载批量
const MOUNT_IDLE_BATCH = 2 // 空闲补挂批量
const mountedCount = ref(MOUNT_INITIAL)
const sentinelEl = ref<HTMLElement>()

function mountMore(n: number) {
  const total = children.value.length
  if (mountedCount.value < total) mountedCount.value = Math.min(total, mountedCount.value + n)
}

/** 立即挂载全部章节并等 DOM 就绪（目录/引用跳转兜底） */
const ensureMounted = async () => {
  mountedCount.value = children.value.length
  await nextTick()
}
provideLazyMount(ensureMounted)

/** 空闲调度：优先 requestIdleCallback（带超时保证推进），兜底 setTimeout */
function scheduleIdle(fn: () => void): () => void {
  if ('requestIdleCallback' in window) {
    const id = requestIdleCallback(fn, { timeout: 300 })
    return () => cancelIdleCallback(id)
  }
  const id = setTimeout(fn, 200)
  return () => clearTimeout(id)
}
let mountIO: IntersectionObserver | null = null
let cancelIdle: (() => void) | undefined

/* 窄屏目录折叠：默认收起为一个标题按钮；宽屏 CSS 始终展开列表 */
const narrowToc = window.matchMedia('(max-width: 980px)')
const tocOpen = ref(!narrowToc.matches)
function onNarrowChange(e: MediaQueryListEvent) {
  if (!e.matches) tocOpen.value = true
}
narrowToc.addEventListener('change', onNarrowChange)

async function scrollToId(id: string) {
  let el = document.getElementById(id)
  if (!el) {
    // 目标章节尚未挂载（渐进挂载）：全量补挂并等 DOM 就绪再定位
    await ensureMounted()
    el = document.getElementById(id)
  }
  jumpTo(el, 'start')
  // 窄屏点击目录项跳转后收起，避免展开的目录挡住正文；
  // 沉浸式目录浮层同理
  if (narrowToc.matches || immersive.on) tocOpen.value = false
}

/* 沉浸式：进入时收起目录（浮层不默认展开） */
watch(
  () => immersive.on,
  (on) => {
    if (on) tocOpen.value = false
  },
)

function exitImmersive() {
  immersive.on = false
  // 退出后目录恢复常态：宽屏展开侧栏，窄屏保持收起
  tocOpen.value = !narrowToc.matches
}

/* 沉浸式目录浮层：点击浮层与圆钮以外的位置、或按 Esc 自动收起 */
function onDocClick(e: MouseEvent) {
  if (!immersive.on || !tocOpen.value) return
  const t = e.target
  if (!(t instanceof Node)) return
  if (document.querySelector('.toc')?.contains(t)) return
  if (document.querySelector('.toc-fab')?.contains(t)) return
  /* 兜底：点击圆钮会切换按钮图标，Vue patch 把本次点击的靶点（旧图标
     节点）移出 DOM，冒泡到此处时 contains 判定失真，刚展开的浮层会被
     同一次点击立即收掉（表现为点按无效；图片加载期布局跳动会加剧）。
     靶点已游离、或物理点击坐标仍落在圆钮/浮层内，都视为相关点击 */
  if (!document.contains(t)) return
  const hit = (el: Element | null) => {
    if (!el) return false
    const r = el.getBoundingClientRect()
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
  }
  if (hit(document.querySelector('.toc-fab')) || hit(document.querySelector('.toc'))) return
  tocOpen.value = false
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && immersive.on && tocOpen.value) tocOpen.value = false
}

function updateActive() {
  /* 标题区完全滚出视口顶部后，顶栏站名切换为论文标题（App.vue 消费） */
  titleScrolledAway.value = !!headerEl && headerEl.getBoundingClientRect().bottom <= 0
  const line = 96
  let current = ''
  for (const h of toc.value) {
    const el = document.getElementById(h.domId)
    if (el && el.getBoundingClientRect().top <= line) current = h.domId
  }
  // 页面顶部还没有章节进入判定线时，高亮第一章
  activeId.value = current || toc.value[0]?.domId || ''
  followToc(activeId.value)
  updateTopbarSection()
}

/* 顶栏当前章节：与目录高亮同源（activeId），显示语言同目录链接；
   章节变化时按 toc 顺序的前进/后退写入方向，供顶栏上下顶替动画选向。
   距上次换章不足 240ms 视为高速换章（跳转飞行、快速滚掠），顶栏动画
   切到 0.12s 的快档 */
let lastSectionIdx = -1
let lastLabelAt = 0
function updateTopbarSection() {
  const idx = toc.value.findIndex((h) => h.domId === activeId.value)
  const item = toc.value[idx]
  const label = item
    ? settings.lang === 'zh' && item.titleZh
      ? item.titleZh
      : item.titleEn || item.titleZh || ''
    : ''
  if (label !== topbarSectionLabel.value) {
    if (lastSectionIdx >= 0 && idx >= 0) topbarSectionDir.value = idx > lastSectionIdx ? 1 : -1
    const now = performance.now()
    topbarSectionFast.value = now - lastLabelAt < 240
    lastLabelAt = now
    topbarSectionLabel.value = label
  }
  lastSectionIdx = idx
}

/* 目录侧栏跟随：current 项变化时滚动目录容器，保持该项可见 */
let lastFollow = ''
function followToc(id: string) {
  if (!id || id === lastFollow) return
  lastFollow = id
  const tocEl = document.querySelector('.toc')
  const link = tocEl?.querySelector(`a[href="#${id}"]`)
  if (!(tocEl instanceof HTMLElement) || !link) return
  const lr = link.getBoundingClientRect()
  const tr = tocEl.getBoundingClientRect()
  const M = 8
  let delta = 0
  if (lr.top < tr.top + M) delta = lr.top - tr.top - M
  else if (lr.bottom > tr.bottom - M) delta = lr.bottom - tr.bottom + M
  if (delta) tocEl.scrollTo({ top: tocEl.scrollTop + delta, behavior: 'smooth' })
}

let onScroll: (() => void) | null = null
/** 页内标题区（顶栏站名切换为论文标题的判定元素），onMounted 时取一次 */
let headerEl: Element | null = null

onMounted(() => {
  onScroll = () => updateActive()
  headerEl = document.querySelector('.paper-header')
  window.addEventListener('scroll', onScroll, { passive: true })
  // 窗口尺寸变化也会改变标题区与视口的相对位置，与滚动同判
  window.addEventListener('resize', onScroll, { passive: true })
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
  updateActive()
  // 渐进挂载：哨兵进入视口下方预判范围（约一屏半）即挂载下一批；
  // 快速滚动者由这里保证内容先于阅读位置就绪
  const sentinel = sentinelEl.value
  if (sentinel) {
    mountIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) mountMore(MOUNT_SCROLL_BATCH)
      },
      { rootMargin: '1200px 0px' },
    )
    mountIO.observe(sentinel)
  }
  // 空闲补挂：小批推进直至全文挂载完成，编号/目录/交叉引用快速收敛。
  // 图片保持 loading="lazy" 按视口加载（跳转前由 scroll.ts 预加载兜底）
  const pump = () => {
    if (mountedCount.value >= children.value.length) return
    mountMore(MOUNT_IDLE_BATCH)
    cancelIdle = scheduleIdle(pump)
  }
  cancelIdle = scheduleIdle(pump)
})
onBeforeUnmount(() => {
  if (onScroll) {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
  titleScrolledAway.value = false // 离开论文页恢复站名，避免带回首页/下一篇
  topbarSectionLabel.value = '' // 章节名同理清空，避免带回下一篇/首页
  topbarSectionFast.value = false
  lastSectionIdx = -1
  lastLabelAt = 0
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
  narrowToc.removeEventListener('change', onNarrowChange)
  mountIO?.disconnect()
  cancelIdle?.()
  resetJump() // 取消进行中的跳转并丢弃撤销点（撤销按钮随组件一起卸载）
})
watch(toc, () => updateActive())
</script>

<template>
  <div class="paper-layout">
    <aside v-if="toc.length" class="toc" :class="{ open: tocOpen }">
      <!-- 沉浸式目录浮层的头部：标题 + 退出沉浸（其余场景不显示） -->
      <div class="toc-float-head">
        <span class="t">目录</span>
        <button type="button" class="exit" @click="exitImmersive">
          退出沉浸
          <Icon icon="material-symbols:close-fullscreen" />
        </button>
      </div>
      <div class="toc-title">目录</div>
      <button type="button" class="toc-toggle" :aria-expanded="tocOpen" @click="tocOpen = !tocOpen">
        目录
        <Icon icon="material-symbols:expand-less" />
      </button>
      <ol>
        <li v-for="h in toc" :key="h.domId">
          <a
            :href="`#${h.domId}`"
            :class="[`lvl-${h.level}`, { current: activeId === h.domId }]"
            @click.prevent="scrollToId(h.domId)"
            >{{ settings.lang === 'zh' && h.titleZh ? h.titleZh : h.titleEn }}</a>
        </li>
      </ol>
    </aside>

    <main class="paper-body">
      <header class="paper-header">
        <h1>{{ meta.titleEn }}</h1>
        <div class="zh-title">{{ meta.titleZh }}</div>
        <div class="authors"><RichText :text="meta.authors" :ctx="rctx" /></div>
        <div class="venue">
          <template v-if="meta.venue">{{ meta.venue }} <template v-if="meta.year">· {{ meta.year }}</template></template>
          <a v-if="meta.arxivUrl" :href="meta.arxivUrl" target="_blank" rel="noreferrer">arXiv</a>
        </div>
      </header>

      <!-- 渐进挂载：只渲染前 mountedCount 个章节，其余待滚动临近/空闲补挂 -->
      <template v-for="(child, i) in children" :key="i">
        <component :is="child" v-if="i < mountedCount" />
      </template>
      <div
        v-if="mountedCount < children.length"
        ref="sentinelEl"
        class="mount-sentinel"
        aria-hidden="true"
      ></div>

      <section v-if="referenceItems.length" id="sec-references" class="references">
        <div class="pair-row heading-row lvl-1">
          <div class="en-col">References</div>
          <div class="zh-col">参考文献</div>
        </div>
        <ol class="ref-list">
          <li v-for="[key, text] in referenceItems" :id="`cite-${key}`" :key="key">
            <RichText :text="text" :ctx="rctx" />
          </li>
        </ol>
      </section>
    </main>

    <TipLayer />
    <RefTipLayer />
    <JumpUndoFab />

    <!-- 沉浸式：左下角目录圆钮，点击弹出目录浮层。.stop 切断冒泡——
         图标切换的 patch 会让靶点游离，冒泡到文档级的收起判定会失真 -->
    <button
      v-if="immersive.on"
      type="button"
      class="toc-fab"
      :title="tocOpen ? '收起目录' : '展开目录'"
      @click.stop="tocOpen = !tocOpen"
    >
      <Icon :icon="tocOpen ? 'material-symbols:close' : 'material-symbols:format-list-bulleted'" />
    </button>
  </div>
</template>
