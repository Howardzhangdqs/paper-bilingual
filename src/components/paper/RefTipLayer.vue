<script setup lang="ts">
/**
 * 链接悬停预览层：渲染 refPreview.ts 共享状态的摘要卡片（式/图/表/
 * 章节引用与文献条目，带 ↑上文/↓下文 方向指示）。滚动、缩放或 Esc 即
 * 隐藏；卡片 pointer-events:none，不与鼠标交互。随 PaperBody 挂载一份。
 */
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { cancelRefTip, keepRefTip, refTip, resetTouchArm, scheduleHideRefTip } from './refPreview'

const card = ref<HTMLElement>()

function place() {
  const host = refTip.host
  const c = card.value
  if (!host?.isConnected || !c) return
  const r = host.getBoundingClientRect()
  const GAP = 10
  const M = 8
  let top = r.top - c.offsetHeight - GAP
  if (top < M) top = Math.min(r.bottom + GAP, innerHeight - c.offsetHeight - M)
  const left = Math.max(M, Math.min(r.left + r.width / 2 - c.offsetWidth / 2, innerWidth - c.offsetWidth - M))
  refTip.left = `${left}px`
  refTip.top = `${top}px`
}

function onHide() {
  cancelRefTip()
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') cancelRefTip()
}

/* 触摸两段式的「点我跳转」按钮：执行首击链接的跳转动作并收卡 */
function jumpFromTip() {
  const action = refTip.jumpAction
  cancelRefTip()
  resetTouchArm()
  action?.()
}

watch(
  () => refTip.visible,
  (v) => {
    if (v) nextTick(place)
  },
)

onMounted(() => {
  document.addEventListener('scroll', onHide, { capture: true, passive: true })
  document.addEventListener('keydown', onKey)
  window.addEventListener('resize', onHide)
})
onBeforeUnmount(() => {
  document.removeEventListener('scroll', onHide, { capture: true })
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onHide)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="tip-fade">
      <div
        v-if="refTip.visible && refTip.data"
        ref="card"
        class="ref-tip"
        :style="{ left: refTip.left, top: refTip.top }"
        @mouseenter="keepRefTip"
        @mouseleave="scheduleHideRefTip"
      >
      <div v-if="refTip.data" class="ref-tip-head">
        <span
          v-if="refTip.data.dir"
          class="dir"
          :class="refTip.data.dir"
          :title="refTip.data.dir === 'up' ? '目标位于上文' : '目标位于下文'"
        >
          <Icon :icon="refTip.data.dir === 'up' ? 'material-symbols:arrow-upward' : 'material-symbols:arrow-downward'" />
        </span>
        <span class="ref-tip-title">{{ refTip.data.title }}</span>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="refTip.data?.html" class="ref-tip-body rich" v-html="refTip.data.html" />
      <div v-else-if="refTip.data?.text" class="ref-tip-body">{{ refTip.data.text }}</div>
      <!-- 触摸设备两段式：卡内按钮直接跳转（与再点一次链接等效）；
           仅触摸首击设置了 jumpAction 时渲染，桌面悬停无此按钮 -->
      <button v-if="refTip.jumpAction" type="button" class="ref-tip-jump" @click.stop="jumpFromTip">
        点我跳转
      </button>
      </div>
    </Transition>
  </Teleport>
</template>
