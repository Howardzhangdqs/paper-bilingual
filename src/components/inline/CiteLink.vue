<script setup lang="ts">
/**
 * 文献引用（对应 LaTeX 的 ~\cite{key,...}）：渲染为蓝色编号上标 [n]，
 * 仅数字带点线下划线（方括号/逗号不带）；点击跳转到文末 References
 * 对应条目并高亮，悬停预览条目内容（RefTipLayer）。合并的多引用
 * （如 [1, 2]）各数字独立交互——各自跳转与预览。无编号映射时数字
 * 位置显示 key 原文。
 */
import { computed } from 'vue'
import { jumpTo } from '../paper/scroll'
import { armTouchJump, noHover, queueRefTip, scheduleHideRefTip } from '../paper/refPreview'

const props = defineProps<{
  keys: string[]
  cites?: Record<string, number>
}>()

const items = computed(() =>
  props.keys.map((key) => {
    const no = props.cites?.[key]
    return { key, no, text: no != null ? String(no) : key }
  }),
)

function doJump(key: string) {
  const el = document.getElementById(`cite-${key}`)
  // 高亮在滚动到位后触发（scroll.ts 的 onArrive）；立即加类的话，
  // 1.4s 的闪烁动画会在长距离滚动途中就播完
  jumpTo(el, 'center', () => {
    el?.classList.remove('jump-flash')
    void (el as HTMLElement).offsetWidth // 重新触发动画
    el?.classList.add('jump-flash')
  })
}

function jump(e: MouseEvent, key: string) {
  // 触摸设备两段式：首击只显示条目预览（卡内「点我跳转」按钮或再点
  // 一次该数字跳转），二击才跳
  if (noHover.matches && !armTouchJump(e.currentTarget as HTMLElement, document.getElementById(`cite-${key}`), `[${props.cites?.[key] ?? key}]`, () => doJump(key))) return
  doJump(key)
}

/* 悬停预览：显示该数字对应的文献条目 + 上/下文方向 */
function preview(e: MouseEvent, key: string) {
  const target = document.getElementById(`cite-${key}`)
  const title = `[${props.cites?.[key] ?? key}]`
  if (target) queueRefTip(e.currentTarget as HTMLElement, target, title)
}
</script>

<template>
  <sup class="cite">[<template v-for="(it, i) in items" :key="it.key"><span v-if="i" class="cite-sep">, </span><a
    class="cite-n"
    @click.prevent.stop="jump($event, it.key)"
    @mouseenter="preview($event, it.key)"
    @mouseleave="scheduleHideRefTip"
  >{{ it.text }}</a></template>]</sup>
</template>
