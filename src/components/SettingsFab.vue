<script setup lang="ts">
/**
 * 左下角常驻阅读设置按钮（全页面显示，沉浸式时移到目录圆钮右侧避让）：
 * 点击向上弹出面板，可切换主题（浅色/深色/跟随系统）与显示语言
 * （双语/仅英文/仅中文）。状态与 <html> 类同步在 settings.ts。
 */
import { onBeforeUnmount, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { settings } from '../settings'

const open = ref(false)
const wrap = ref<HTMLElement>()

/* 点击面板与按钮以外的位置自动收起。@click.stop 切断按钮自身冒泡——
   图标态切换的 patch 会让本次点击的靶点游离出 DOM，冒泡判定失真
   （与 PaperBody 的目录浮层同一坑）；靶点已游离时视为面板内点击 */
function onDocClick(e: MouseEvent) {
  if (!open.value) return
  const t = e.target
  if (!(t instanceof Node)) return
  if (wrap.value?.contains(t)) return
  if (!document.contains(t)) return
  open.value = false
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
document.addEventListener('click', onDocClick)
document.addEventListener('keydown', onKeydown)
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="wrap" class="settings-wrap">
    <button
      type="button"
      class="settings-fab"
      :class="{ on: open }"
      title="阅读设置"
      @click.stop="open = !open"
    >
      <Icon icon="material-symbols:tune" />
    </button>
    <Transition name="pop">
      <div v-if="open" class="settings-panel" @click.stop>
        <div class="group">
          <div class="label">主题</div>
          <div class="seg" role="radiogroup" aria-label="主题">
            <button
              type="button"
              :class="{ on: settings.theme === 'light' }"
              @click="settings.theme = 'light'"
            >
              <Icon icon="material-symbols:light-mode" />浅色
            </button>
            <button
              type="button"
              :class="{ on: settings.theme === 'dark' }"
              @click="settings.theme = 'dark'"
            >
              <Icon icon="material-symbols:dark-mode" />深色
            </button>
            <button
              type="button"
              :class="{ on: settings.theme === 'system' }"
              @click="settings.theme = 'system'"
            >
              <Icon icon="material-symbols:routine" />跟随系统
            </button>
          </div>
        </div>
        <div class="group">
          <div class="toggle-row">
            <span class="toggle-text">
              <span class="label">图片反色</span>
              <span class="hint">深色模式下插图反色显示</span>
            </span>
            <button
              type="button"
              class="switch"
              role="switch"
              :aria-checked="settings.invertFigures"
              :class="{ on: settings.invertFigures }"
              @click="settings.invertFigures = !settings.invertFigures"
            >
              <span class="knob" />
            </button>
          </div>
        </div>
        <div class="group">
          <div class="label">显示语言</div>
          <div class="seg" role="radiogroup" aria-label="显示语言">
            <button
              type="button"
              :class="{ on: settings.lang === 'both' }"
              @click="settings.lang = 'both'"
            >双语</button>
            <button
              type="button"
              :class="{ on: settings.lang === 'en' }"
              @click="settings.lang = 'en'"
            >仅英文</button>
            <button
              type="button"
              :class="{ on: settings.lang === 'zh' }"
              @click="settings.lang = 'zh'"
            >仅中文</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* wrap 定位一处声明；沉浸式时目录圆钮占住左下角 18px 位，本钮右移
   与其并排——偏移规则依赖论文页的 html.immersive 类，放在全局
   style.css 的目录圆钮区（scoped 的 :global 编译不可靠） */
.settings-wrap {
  position: fixed;
  left: 18px;
  bottom: calc(20px + env(safe-area-inset-bottom));
  z-index: 96; /* 与目录圆钮同层系（95），高于正文；低于灯箱(100) */
}

.settings-fab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--accent-line);
  border-radius: 50%;
  background: var(--fab-bg);
  backdrop-filter: blur(6px);
  color: var(--accent);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.18);
  cursor: pointer;
  transition: background-color 0.15s, box-shadow 0.15s;
}
.settings-fab:hover,
.settings-fab.on {
  background: var(--panel);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.26);
}
.settings-fab svg {
  width: 22px;
  height: 22px;
  transition: transform 0.2s ease;
}
.settings-fab.on svg {
  transform: rotate(90deg);
}

/* 面板：自按钮上方弹出，风格与沉浸目录浮层一致 */
.settings-panel {
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  width: 236px;
  padding: 12px 14px 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: 0 10px 40px rgba(20, 30, 60, 0.18);
  transform-origin: 24px calc(100% + 34px); /* 圆钮中心 */
  font-family: var(--zh-font);
}
.group + .group {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}
.label {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 7px;
}
/* 开关行（图片反色）：左侧标签+说明，右侧滑动开关 */
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.toggle-row .toggle-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.toggle-row .label {
  margin-bottom: 0;
  color: var(--ink-soft);
  font-size: 13px;
}
.toggle-row .hint {
  font-size: 11px;
  color: var(--muted);
}
.switch {
  flex: none;
  position: relative;
  width: 36px;
  height: 20px;
  border: none;
  border-radius: 999px;
  background: var(--td-line);
  cursor: pointer;
  transition: background-color 0.15s;
}
.switch .knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: transform 0.15s ease;
}
.switch.on {
  background: var(--accent);
}
.switch.on .knob {
  transform: translateX(16px);
}
.seg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}
.seg button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 2px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: transparent;
  color: var(--ink-soft);
  font-family: var(--zh-font);
  font-size: 12.5px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.12s, color 0.12s, border-color 0.12s;
}
.seg button svg {
  width: 13px;
  height: 13px;
}
.seg button:hover {
  border-color: var(--accent-line);
  color: var(--accent);
}
.seg button.on {
  border-color: var(--accent-line);
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

/* 出入场：淡入淡出 + 自钮方向轻微缩放滑入 */
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}
</style>
