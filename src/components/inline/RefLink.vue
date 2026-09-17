<script setup lang="ts">
/**
 * 交叉引用（对应 LaTeX 的 \autoref/\ref/\cref/\eqref）：渲染为编号文本
 * （英文栏 Figure 2 / 式 (12)，中文栏自动显示 图 2 /（12））；章节引用
 * 附加对应章节名（§4 Method / §4 方法），点击平滑滚动到对应的图/表/
 * 公式/章节并高亮——与 LaTeX PDF 的 hyperref 行为一致。
 */
import { computed } from 'vue'
import { jumpTo } from '../paper/scroll'
import { useLazyMount } from '../paper/registry'
import { armTouchJump, noHover, queueRefTip, scheduleHideRefTip } from '../paper/refPreview'

const props = defineProps<{
  label: string
  kind: 'ref' | 'eqref'
  zh?: boolean
  labels?: Record<string, string>
  anchors?: Record<string, string>
  secTitles?: Record<string, { en?: string; zh?: string }>
}>()

/** 渐进挂载兜底：目标章节可能尚未挂载，跳转前确保全文就绪 */
const ensureMounted = useLazyMount()

const REF_ZH: Record<string, string> = {
  Figure: '图',
  Table: '表',
  Section: '§',
  Appendix: '附录',
  Equation: '式',
}

const text = computed(() => {
  const raw = props.labels?.[props.label]
  if (raw === undefined) return props.kind === 'eqref' ? '(?)' : '?'
  let body = raw
  if (props.kind === 'eqref') {
    return props.zh ? `（${body}）` : `(${body})`
  }
  if (/^\d+$/.test(raw)) {
    // 公式编号（labels 存纯数字）：\autoref 在 PDF 中带 Equation 前缀
    body = props.zh ? `式 ${raw}` : `Equation ${raw}`
  } else if (props.zh) {
    const m = raw.match(/^(Figure|Table|Section|Appendix|Equation)\s*(.*)$/)
    if (m) {
      const prefix = REF_ZH[m[1]]
      // 图/表/式/附录 后补空格（§ 不补），与题注里的「图 3」样式一致
      const gap = /^(图|表|式|附录)$/.test(prefix) && m[2] ? ' ' : ''
      body = `${prefix}${gap}${m[2]}`
    }
  }
  // 章节引用附章节名（表里只有 sec label，图/表/公式引用查不到）
  const title = props.secTitles?.[props.label]
  if (title) {
    const name = props.zh ? (title.zh || title.en) : title.en
    if (name) body = `${body} ${name}`
  }
  return body
})

async function doJump(el: HTMLElement | null) {
  // 渐进挂载：目标不在 DOM 时先全量补挂，再重查目标（一般挂载进行中
  // 几秒内即收敛，此路径只兜底快速跳转）
  let target = el
  if (!target && ensureMounted) {
    await ensureMounted()
    const id = props.anchors?.[props.label]
    target = id ? document.getElementById(id) : null
  }
  // 章节跳转到页面顶部（与目录跳转一致），图/表/公式保持居中展示；
  // 高亮在滚动到位后触发，避免动画在滚动途中就播完
  jumpTo(target, props.secTitles?.[props.label] ? 'start' : 'center', () => {
    target?.classList.remove('jump-flash')
    void target?.offsetWidth
    target?.classList.add('jump-flash')
  })
}

function jump(e: MouseEvent) {
  const id = props.anchors?.[props.label]
  const el = id ? document.getElementById(id) : null
  // 触摸设备两段式：首击只显示预览（卡内「点我跳转」按钮或再点一次
  // 该链接跳转），二击才跳
  if (noHover.matches && !armTouchJump(e.currentTarget as HTMLElement, el, text.value, () => doJump(el))) return
  doJump(el)
}

/* 悬停预览：显示目标摘要（公式全文/题注/章节首行）+ 上/下文方向 */
function preview(e: MouseEvent) {
  const id = props.anchors?.[props.label]
  const target = id ? document.getElementById(id) : null
  if (target) queueRefTip(e.currentTarget as HTMLElement, target, text.value)
}
</script>

<template>
  <a class="ref" @click.prevent.stop="jump" @mouseenter="preview" @mouseleave="scheduleHideRefTip">{{ text }}</a>
</template>
