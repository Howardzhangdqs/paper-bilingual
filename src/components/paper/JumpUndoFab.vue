<script setup lang="ts">
/**
 * 跳转撤销按钮：页内跳转成功到位后出现在右下角，点击以同样的滚动
 * 体验（冻结灰块 + ease-in-out）回到跳转前位置。跳转被用户输入打断
 * 时不出现（用户已自己接管滚动）。显示/隐藏由 scroll.ts 广播的
 * paper-jump 事件驱动：arrived 显示，start/interrupted/undone 隐藏。
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { JUMP_EVENT, undoJump, type JumpState } from './scroll'

const visible = ref(false)

function onJump(e: Event) {
  visible.value = (e as CustomEvent<JumpState>).detail === 'arrived'
}

function undo() {
  visible.value = false
  undoJump()
}

onMounted(() => window.addEventListener(JUMP_EVENT, onJump))
onBeforeUnmount(() => window.removeEventListener(JUMP_EVENT, onJump))
</script>

<template>
  <Transition name="jump-undo">
    <button v-if="visible" type="button" class="jump-undo-fab" @click="undo">
      <Icon icon="material-symbols:undo" />
      返回原处
    </button>
  </Transition>
</template>

<style scoped>
.jump-undo-fab {
  position: fixed;
  right: 22px;
  bottom: calc(26px + env(safe-area-inset-bottom));
  z-index: 90; /* 低于灯箱(100)：灯箱打开时不干扰 */
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 16px;
  border: 1px solid var(--accent-line);
  border-radius: 999px;
  background: var(--fab-bg);
  backdrop-filter: blur(6px);
  color: var(--accent);
  font-size: 13.5px;
  font-family: var(--zh-font);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.18);
  cursor: pointer;
  transition: background-color 0.15s, box-shadow 0.15s;
}
.jump-undo-fab:hover {
  background: var(--panel);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.26);
}
.jump-undo-fab svg { width: 14px; height: 14px; }

.jump-undo-enter-active,
.jump-undo-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.jump-undo-enter-from,
.jump-undo-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
