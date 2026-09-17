<script setup lang="ts">
/**
 * 移动端调试悬浮按钮（仅触屏设备显示）：点击收集视口、横向溢出、
 * 滚动容器裁切等布局数据，复制为 JSON 供粘贴给开发者排查。
 * 手机端布局问题排查结束后，删除本组件与 App.vue 中的引用即可。
 */
import { onBeforeUnmount, ref } from 'vue'

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

/** 收集当前页面的布局诊断数据（会把横向滚动容器滚到最右测裁切，测完还原） */
async function collect(): Promise<string> {
  const vw = document.documentElement.clientWidth
  const de = document.documentElement
  const out: Record<string, unknown> = {
    ua: navigator.userAgent,
    at: new Date().toISOString(),
    viewport: {
      innerW: innerWidth,
      innerH: innerHeight,
      clientW: vw,
      clientH: de.clientHeight,
      dpr: devicePixelRatio,
      vvW: visualViewport ? Math.round(visualViewport.width) : -1,
      vvScale: visualViewport ? Math.round(visualViewport.scale * 100) / 100 : -1,
    },
    media: {
      hoverNone: matchMedia('(hover: none)').matches,
      coarse: matchMedia('(pointer: coarse)').matches,
    },
    page: {
      scrollW: de.scrollWidth,
      clientW: vw,
      hOverflow: de.scrollWidth - vw,
    },
  }

  // 横向滚动容器：滚到最右后，内容右缘与容器右缘的差（>0 表示内容被裁）
  const boxes: unknown[] = []
  const restore: [HTMLElement, number][] = []
  for (const el of document.querySelectorAll<HTMLElement>('.paper-body *')) {
    if (!(el.clientWidth > 100) || !(el.scrollWidth > el.clientWidth + 4)) continue
    restore.push([el, el.scrollLeft])
    el.scrollLeft = el.scrollWidth
    const r = el.getBoundingClientRect()
    let maxRight = 0
    let rightmost = ''
    for (const child of el.querySelectorAll('*')) {
      const cr = child.getBoundingClientRect()
      if (cr.width > 0 && cr.right > maxRight) {
        maxRight = cr.right
        rightmost = child.tagName + '.' + String(child.className).slice(0, 20)
      }
    }
    boxes.push({
      cls: String(el.className).slice(0, 30),
      clientW: el.clientWidth,
      scrollW: el.scrollWidth,
      maxScroll: el.scrollWidth - el.clientWidth,
      gotScroll: Math.round(el.scrollLeft),
      contentCut: Math.round(maxRight - r.right),
      rightmost,
    })
  }
  for (const [el, left] of restore) el.scrollLeft = left
  out.hScroll = boxes

  // 超出视口右缘的元素（前 8 个；katex-mathml 是 1px 无障碍层，
  // 其内部元素矩形是测量伪影，跳过）
  const outside: unknown[] = []
  for (const el of document.querySelectorAll('.paper-layout *')) {
    if (el.closest('.katex-mathml')) continue
    const r = el.getBoundingClientRect()
    if (r.width > 0 && r.right > vw + 1) {
      outside.push({
        tag: el.tagName,
        cls: String(el.className).slice(0, 30),
        right: Math.round(r.right),
        w: Math.round(r.width),
      })
      if (outside.length >= 8) break
    }
  }
  out.outsideViewport = outside

  return JSON.stringify(out)
}

async function copy() {
  const text = await collect()
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 2000)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <button type="button" class="debug-fab" :class="{ ok: copied }" @click="copy">
    {{ copied ? '已复制 ✓' : '调试' }}
  </button>
</template>

<style scoped>
/* 桌面（有悬停）不显示：开发者可直接在 DevTools 里取同样的数据 */
.debug-fab {
  display: none;
}
@media (hover: none) {
  .debug-fab {
    position: fixed;
    right: 14px;
    bottom: calc(18px + env(safe-area-inset-bottom));
    z-index: 90; /* 低于灯箱(100)：灯箱打开时不干扰 */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 14px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--fab-bg);
    color: var(--ink-soft);
    font-size: 13px;
    font-family: system-ui, sans-serif;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16);
    opacity: 0.75;
  }
  .debug-fab.ok {
    background: #e7f6ec;
    color: #1d9e55;
    opacity: 1;
  }
}
</style>
