<script setup lang="ts">
/**
 * 公式符号悬停释义层：文档级事件委托，悬停 KaTeX 输出中的 [data-tip]
 * 元素时，查 tips.ts 注册表显示「符号 + 一句话释义」卡片。
 * 随 PaperBody 挂载一份即可；触摸设备改为点按符号显示/隐藏。
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import katex from 'katex'
import { lookupTip } from './tips'

const card = ref<HTMLElement>()
const shown = ref(false)
const pos = ref({ left: '0px', top: '0px' })
const symHtml = ref('')
const text = ref('')

/**
 * 释义文字里的 LaTeX 特征片段（如 R_N^*、10^{-3}、\alpha——须带下标/
 * 上标/命令反斜杠，避免误伤普通英文词）用 KaTeX 渲染，其余按纯文本
 */
const LATEX_SNIPPET =
  /(?:\\[a-zA-Z]+(?:\{[^{}]*\})?|[A-Za-z0-9'][A-Za-z0-9']*(?:[_^](?:\{[^{}]*\}|[A-Za-z0-9'+*-]+))+)/g

const textParts = computed(() => {
  const out: { text?: string; html?: string }[] = []
  let last = 0
  for (const m of text.value.matchAll(LATEX_SNIPPET)) {
    if (m.index > last) out.push({ text: text.value.slice(last, m.index) })
    out.push({
      html: katex.renderToString(m[0], { throwOnError: false, strict: false }),
    })
    last = m.index + m[0].length
  }
  if (last < text.value.length) out.push({ text: text.value.slice(last) })
  return out
})

let current: HTMLElement | null = null

function targetOf(e: Event): HTMLElement | null {
  const t = (e.target as Element | null)?.closest?.('[data-tip]')
  return t instanceof HTMLElement && lookupTip(t.dataset.tip ?? '') ? t : null
}

function show(el: HTMLElement) {
  current = el
  const tip = lookupTip(el.dataset.tip ?? '')
  if (!tip) return
  try {
    symHtml.value = katex.renderToString(tip.sym, { throwOnError: false, strict: false })
  } catch {
    symHtml.value = ''
  }
  text.value = tip.text
  shown.value = true
  nextTick(() => place(el))
}

function place(el: HTMLElement) {
  const c = card.value
  if (!c) return
  const r = el.getBoundingClientRect()
  const w = c.offsetWidth
  const h = c.offsetHeight
  const GAP = 10
  const M = 8
  let top = r.top - h - GAP
  if (top < M) top = Math.min(r.bottom + GAP, innerHeight - h - M)
  const left = Math.max(M, Math.min(r.left + r.width / 2 - w / 2, innerWidth - w - M))
  pos.value = { left: `${left}px`, top: `${top}px` }
}

function hide() {
  shown.value = false
  current = null
}

const onOver = (e: PointerEvent) => {
  // 触摸的 pointerover 由 click 接管，避免 tap 后被本次 click 关闭
  if (e.pointerType === 'touch') return
  const t = targetOf(e)
  if (t && t !== current) show(t)
}
const onOut = (e: PointerEvent) => {
  if (current && !(e.relatedTarget instanceof Node && current.contains(e.relatedTarget))) hide()
}
const onScrollOrResize = () => hide()
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') hide()
}
const onClick = (e: MouseEvent) => {
  const t = targetOf(e)
  if (t) {
    e.preventDefault()
    e.stopPropagation()
    if (t === current) hide()
    else show(t)
  } else if (current) hide()
}

const noHover = matchMedia('(hover: none)')

onMounted(() => {
  document.addEventListener('pointerover', onOver)
  document.addEventListener('pointerout', onOut)
  document.addEventListener('scroll', onScrollOrResize, { capture: true, passive: true })
  document.addEventListener('keydown', onKey)
  window.addEventListener('resize', onScrollOrResize)
  if (noHover.matches) document.addEventListener('click', onClick, true)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerover', onOver)
  document.removeEventListener('pointerout', onOut)
  document.removeEventListener('scroll', onScrollOrResize, { capture: true })
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onScrollOrResize)
  if (noHover.matches) document.removeEventListener('click', onClick, true)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="tip-fade">
      <div v-if="shown" ref="card" class="formula-tip" :style="pos">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-if="symHtml" class="tip-sym" v-html="symHtml" />
        <span class="tip-text"><template v-for="(p, i) in textParts" :key="i"><!-- eslint-disable-next-line vue/no-v-html --><span v-if="p.html" class="tip-math" v-html="p.html" /><template v-else>{{ p.text }}</template></template></span>
      </div>
    </Transition>
  </Teleport>
</template>
