<script setup lang="ts">
/**
 * 图片灯箱：
 * - 打开时从论文缩略图位置 FLIP 飞入（原地复制品立即出现，无淡入淡出）；
 * - 滚轮以鼠标位置为锚点缩放，双指捏合缩放（触屏），拖拽即时跟手，
 *   快速双击（含触屏 double-tap）1x/2x；
 * - 飞入动画与交互期间显示同名 .png 位图替身（GPU 缩放流畅，需已由
 *   rasterCache 预热就绪），空闲后换回 .svg 矢量重光栅化（锐利）；
 * - ESC 或点击空白处关闭，复制品飞回原位。
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { isRasterReady, prewarmRaster } from './rasterCache'

interface Rect {
  left: number
  top: number
  width: number
  height: number
}

const props = defineProps<{ src: string; alt?: string; from?: Rect }>()
const emit = defineEmits<{ close: [] }>()

const imgEl = ref<HTMLImageElement>()
const scale = ref(1)
const x = ref(0)
const y = ref(0)
const dragging = ref(false)
const smooth = ref(false)
const compositing = ref(false)
const leaving = ref(false)
/** 复制品就绪前隐藏：先摆到缩略图正上方，再显示并放大，避免闪现 */
const ready = ref(false)
/** 遮罩渐入状态（关闭时由 leaving 触发渐出） */
const maskIn = ref(false)
/** 同名 .png 位图替身是否可用 */
const pngOk = ref(false)

const rasterSrc = computed(() => props.src.replace(/\.svg$/, '.png'))
/** 起飞（飞入动画首帧）时刻位图替身是否已解码就绪 */
const takeoffPng = ref(false)
/** 飞入动画进行中：src 锁定为起飞时刻的选择，中途不切换 */
const flipping = ref(false)
const displaySrc = computed(() => {
  if (flipping.value) return takeoffPng.value ? rasterSrc.value : props.src
  return pngOk.value && (compositing.value || leaving.value) ? rasterSrc.value : props.src
})
/** 显式锁定布局尺寸：src 在 svg/png 间切换时固有尺寸不同，须防止重排 */
const fixedSize = ref<{ w: number; h: number } | null>(null)

/** scale=1、translate=0 时图片的布局位置与尺寸 */
let base = { left: 0, top: 0, w: 1, h: 1 }
let idleTimer: number | undefined

function markActivity(ms = 260) {
  compositing.value = true
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    compositing.value = false
  }, ms)
}

function measure() {
  const el = imgEl.value
  if (!el || !el.offsetWidth) return
  base = { left: el.offsetLeft, top: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }
  fixedSize.value = { w: base.w, h: base.h }
}

/** 复制品就位后显示，并从缩略图位置（原地）放大到全屏 */
function enterFromThumb() {
  if (props.from && base.w > 1) {
    scale.value = props.from.width / base.w
    x.value = props.from.left - base.left
    y.value = props.from.top - base.top
  }
  flipping.value = true
  // 第一帧：复制品以缩略图正上方的位置显示（原地，无淡入），遮罩开始渐入；
  // 第二帧起：过渡回全屏位置
  requestAnimationFrame(() => {
    ready.value = true
    maskIn.value = true
    requestAnimationFrame(() => {
      if (props.from && base.w > 1) {
        smooth.value = true
        scale.value = 1
        x.value = 0
        y.value = 0
      }
    })
  })
  // 动画（240ms）结束后解除 src 冻结；与 compositing 窗口同时收口，
  // 静止状态直接停在矢量版，避免 png→svg 的多余切换
  setTimeout(() => {
    flipping.value = false
  }, 320)
}

function close() {
  if (leaving.value) return
  leaving.value = true
  smooth.value = true
  markActivity(380)
  let delay = 200
  if (props.from && base.w) {
    // 飞回缩略图位置
    scale.value = props.from.width / base.w
    x.value = props.from.left - base.left
    y.value = props.from.top - base.top
    delay = 300
  }
  setTimeout(() => emit('close'), delay)
}

/** 以视口 (cx, cy) 为锚点缩放到 next */
function zoomAt(cx: number, cy: number, next: number) {
  const px = (cx - base.left - x.value) / (base.w * scale.value)
  const py = (cy - base.top - y.value) / (base.h * scale.value)
  x.value = cx - px * base.w * next - base.left
  y.value = cy - py * base.h * next - base.top
  scale.value = next
  smooth.value = true
  markActivity()
}

function onWheel(e: WheelEvent) {
  const ratio = e.deltaY < 0 ? 1.18 : 1 / 1.18
  zoomAt(e.clientX, e.clientY, Math.min(30, Math.max(0.1, scale.value * ratio)))
}

/* 触屏双指捏合：跟踪活动指针，双指时以「初始两指中点在图片上的位置」
   为锚点缩放，锚点跟随当前中点移动（缩放 + 双指平移一体） */
const pointers = new Map<number, { x: number; y: number }>()
let pinch: { dist: number; scale: number; px: number; py: number } | null = null

function pinchStart() {
  const pts = [...pointers.values()]
  if (pts.length < 2) {
    pinch = null
    return
  }
  const [a, b] = pts
  const cx = (a.x + b.x) / 2
  const cy = (a.y + b.y) / 2
  pinch = {
    dist: Math.hypot(a.x - b.x, a.y - b.y) || 1,
    scale: scale.value,
    px: (cx - base.left - x.value) / (base.w * scale.value),
    py: (cy - base.top - y.value) / (base.h * scale.value),
  }
}

function pinchMove() {
  if (!pinch) return
  const [a, b] = [...pointers.values()].slice(0, 2)
  const cx = (a.x + b.x) / 2
  const cy = (a.y + b.y) / 2
  const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1
  const next = Math.min(30, Math.max(0.1, (pinch.scale * dist) / pinch.dist))
  scale.value = next
  x.value = cx - pinch.px * base.w * next - base.left
  y.value = cy - pinch.py * base.h * next - base.top
  smooth.value = false // 捏合即时跟手
  markActivity()
}

let dragStart: { px: number; py: number; x: number; y: number } | null = null
/** 上一次轻点的时刻与位置（双击检测，含触屏 double-tap） */
let lastTap = { t: 0, x: 0, y: 0 }

function onPointerDown(e: PointerEvent) {
  // 点击空白背景：直接关闭（不能用 click.self——拖拽经 setPointerCapture
  // 后，click 会被派发到背景层，造成松手即误关闭）
  if ((e.target as HTMLElement).tagName !== 'IMG') {
    close()
    return
  }
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
  if (pointers.size === 1) {
    dragStart = { px: e.clientX, py: e.clientY, x: x.value, y: y.value }
    dragging.value = true
    smooth.value = false // 拖拽即时跟手
  } else {
    // 第二指落下：进入捏合，暂停单指拖拽
    dragStart = null
    dragging.value = false
    pinchStart()
  }
  markActivity()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!pointers.has(e.pointerId)) return
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
  if (pointers.size >= 2) {
    pinchMove()
    return
  }
  if (!dragStart) return
  markActivity()
  x.value = dragStart.x + (e.clientX - dragStart.px)
  y.value = dragStart.y + (e.clientY - dragStart.py)
}

function onPointerUp(e: PointerEvent) {
  const down = pointers.get(e.pointerId)
  pointers.delete(e.pointerId)
  if (pointers.size === 1) {
    // 双指抬起一指：以剩余手指重建拖拽基准，图片不跳变
    const rest = [...pointers.values()][0]
    dragStart = { px: rest.x, py: rest.y, x: x.value, y: y.value }
    dragging.value = true
    pinch = null
    return
  }
  if (pointers.size > 0) return
  dragStart = null
  dragging.value = false
  pinch = null
  // 快速双击轻点（鼠标双击与触屏 double-tap 统一走这里）：1x/2x
  if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) >= 8) return
  const now = performance.now()
  const isDouble =
    now - lastTap.t < 350 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 40
  lastTap = isDouble ? { t: 0, x: 0, y: 0 } : { t: now, x: e.clientX, y: e.clientY }
  if (isDouble) zoomAt(e.clientX, e.clientY, scale.value > 1.05 ? 1 : 2)
}

/** 滚动相关按键：打开期间不允许滚动背景（滚动条保持可见但不响应） */
const SCROLL_KEYS = new Set([
  ' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown',
])

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
  } else if (SCROLL_KEYS.has(e.key)) {
    e.preventDefault()
  }
}

/** 触屏（无悬停）设备：底部提示显示触屏手势 */
const touchUi = matchMedia('(hover: none)').matches

onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', measure)
  markActivity(320) // 首帧起即合成层，窗口与飞入动画同步收口
  takeoffPng.value = isRasterReady(props.src)
  measure()
  enterFromThumb()
  // 探测位图替身（Figure 已预热过则命中缓存，微任务内即就绪）
  prewarmRaster(props.src).then((ok) => (pngOk.value = ok))
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', measure)
  clearTimeout(idleTimer)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="lightbox"
      :class="{ dragging, leaving, 'mask-in': maskIn }"
      @wheel.prevent="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <img
        ref="imgEl"
        :src="displaySrc"
        :alt="alt"
        draggable="false"
        :class="{ smooth: smooth && !dragging, compositing, ready }"
        :style="{
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          ...(fixedSize ? { width: fixedSize.w + 'px', height: fixedSize.h + 'px' } : {}),
        }"
        @load="measure"
      />
      <span class="lightbox-hint">{{
        touchUi ? '双指缩放 · 拖拽移动 · 双击放大 · 点按空白处关闭' : '滚轮缩放 · 拖拽移动 · 双击 1x/2x · ESC 关闭'
      }}</span>
    </div>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(12, 12, 16, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  touch-action: none;
  user-select: none;
  transition: background-color 0.26s ease-out;
}
/* 挂载首帧遮罩透明，随复制品起飞同步渐入 */
.lightbox:not(.mask-in) {
  background: rgba(12, 12, 16, 0);
}
/* 关闭：遮罩随复制品飞回同步渐出 */
.lightbox.leaving {
  background: rgba(12, 12, 16, 0);
  transition: background-color 0.3s ease-in;
  pointer-events: none;
}
.lightbox img {
  max-width: 92vw;
  /* dvh 随手机浏览器工具栏伸缩，旧浏览器回退到 vh */
  max-height: 92vh;
  max-height: 92dvh;
  transform-origin: 0 0;
  cursor: grab;
  /* 论文图 SVG 多为透明背景，深色遮罩上会透出灰暗——垫白底与图片内容一致 */
  background: #fff;
  box-shadow: 0 8px 60px rgba(0, 0, 0, 0);
  transition: box-shadow 0.32s ease-out;
}
/* 阴影随放大动画淡入；关闭飞回时淡出（落回原图时阴影恰好消失） */
.lightbox img.ready {
  box-shadow: 0 8px 60px rgba(0, 0, 0, 0.6);
}
.lightbox.leaving img {
  box-shadow: 0 8px 60px rgba(0, 0, 0, 0);
}
/* 就绪前隐藏：避免以全屏姿态闪现一帧 */
.lightbox img:not(.ready) {
  visibility: hidden;
}
/* 交互期间提升合成层：GPU 变换流畅；空闲移除后按当前倍率矢量重光栅化 */
.lightbox img.compositing {
  will-change: transform;
}
.lightbox img.smooth {
  transition:
    transform 0.24s cubic-bezier(0.25, 0.6, 0.3, 1),
    box-shadow 0.32s ease-out;
}
.lightbox.dragging img {
  cursor: grabbing;
  transition: none;
}
.lightbox-hint {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  /* 触屏提示文案较长，按屏幕宽度计算上限（两侧各留 16px），
     避免窄屏上贴边或被截断；换行后仍居中 */
  max-width: calc(100vw - 32px);
  text-align: center;
  color: #cfd3dd;
  background: rgba(30, 32, 40, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12.5px;
  font-family: 'Times New Roman', serif;
  pointer-events: none;
}
.lightbox.leaving .lightbox-hint {
  display: none;
}
</style>
