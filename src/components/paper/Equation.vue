<script setup lang="ts">
/**
 * <Equation latex="L = \frac{A}{N^\alpha}" label="eq:base" />
 * <Equation latex="..." numbered="false" />   对应 equation* / \[...\]
 * <Equation latex="..." :tips="{ N: '参数量', '\alpha': '幂律指数' }" />
 * 跨栏居中，KaTeX 渲染，编号自动推导；tips 给出的符号可悬停查看释义
 * （键为 LaTeX 片段，须与 latex 中的写法一致）。
 * 连续排布的公式（中间无其他块）自动合并为一个块：共享一个符号释义
 * 面板与一组工具按钮（由组首渲染，后续成员只贡献公式行）。
 * 公式块右上角提供小按钮：展开全部释义、复制 LaTeX 源码。
 */
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { renderTexCached } from './texCache'
import { useDerived, useRegister } from './registry'
import { applyTips } from './tips'

const props = withDefaults(
  defineProps<{
    latex: string
    label?: string
    numbered?: boolean
    /** 符号悬停释义：LaTeX 片段 → 一句话中文说明 */
    tips?: Record<string, string>
  }>(),
  { numbered: true },
)

const item = useRegister({
  type: 'equation',
  label: props.label,
  numbered: props.numbered,
  latex: props.latex,
  tips: props.tips,
})
const derived = useDerived()

/** 本公式所在连续组（单条公式自成一组）与组首判定 */
const group = computed(() => {
  const lead = derived.value.eqGroupOf[item.id]
  return { lead, isLead: lead === item.id, g: derived.value.eqGroups[lead] }
})

function renderTex(tex: string, display = false): string {
  try {
    return renderTexCached(tex, 'block', { display })
  } catch {
    return `<code class="math-error">${tex.replace(/</g, '&lt;')}</code>`
  }
}

/** 组内公式行：行 id 为成员锚点（\eqref 跳转目标） */
const memberRows = computed(() =>
  (group.value.g?.members ?? []).map((m) => ({
    id: m.id,
    no: m.number,
    html: renderTex(m.tips ? applyTips(m.latex, m.tips, m.id) : m.latex, true),
  })),
)

/* 释义面板（默认展开，可收起）：整组共享一个面板，符号按出现顺序去重 */
const showTips = ref(true)
const panelRows = computed(() =>
  (group.value.g?.rows ?? []).map(({ sym, text }) => ({
    sym,
    text,
    html: renderTex(sym),
  })),
)

/**
 * 展开/收起：布局一次到位（避免逐帧内容测量卡顿），动画走合成器——
 * 面板用 clip-path 揭示 + 淡入，公式水平位移用 FLIP transform 平滑。
 */
const formulaEl = ref<HTMLElement>()
function toggleTips() {
  const el = formulaEl.value
  const before = el?.getBoundingClientRect()
  showTips.value = !showTips.value
  if (!el || !before) return
  requestAnimationFrame(() => {
    const dx = before.x - el.getBoundingClientRect().x
    if (Math.abs(dx) < 1) return
    el.style.willChange = 'transform'
    el.style.transition = 'none'
    el.style.transform = `translateX(${dx}px)`
    requestAnimationFrame(() => {
      el.style.transition = 'transform 0.3s ease'
      el.style.transform = ''
      el.addEventListener(
        'transitionend',
        () => {
          el.style.transition = ''
          el.style.willChange = ''
        },
        { once: true },
      )
    })
  })
}

/* 复制 LaTeX 源码（组内多条公式以空行分隔） */
const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined
async function copyLatex() {
  const text = (group.value.g?.members ?? []).map((m) => m.latex).join('\n\n')
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
  clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <!-- 非组首成员：整组已由组首渲染（含各成员锚点行），这里不输出；
       组首块自身不带 id，锚点统一在各成员公式行上，避免重复 id -->
  <div v-if="group.isLead" class="full-block equation-block" :class="{ tipped: panelRows.length }">
    <div class="eq-tools">
      <button
        v-if="panelRows.length"
        type="button"
        class="eq-btn"
        :class="{ on: showTips }"
        :title="showTips ? '收起符号释义' : '展开符号释义'"
        :aria-expanded="showTips"
        @click="toggleTips"
      >
        <Icon icon="material-symbols:format-list-bulleted" />
      </button>
      <button
        type="button"
        class="eq-btn"
        :class="{ ok: copied }"
        :title="copied ? '已复制' : '复制 LaTeX 源码'"
        @click="copyLatex"
      >
        <Icon :icon="copied ? 'material-symbols:check' : 'material-symbols:content-copy'" />
      </button>
    </div>

    <!-- 释义面板：常驻 DOM，外层 0fr↔1fr 轨道动画控制展开（三层：轨道折叠层/裁剪层/样式层） -->
    <div v-if="panelRows.length" class="eq-tips-wrap" :class="{ open: showTips }" :aria-hidden="!showTips">
      <div class="eq-tips-clip">
        <div class="eq-tips">
          <div v-for="row in panelRows" :key="row.sym" class="eq-tip-row">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="eq-tip-sym" v-html="row.html" />
            <span class="eq-tip-text">{{ row.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div ref="formulaEl" class="eq-formulas">
      <div v-for="row in memberRows" :id="row.id" :key="row.id" class="eq-formula-row">
        <div class="eq-formula">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="row.html" />
        </div>
        <span v-if="row.no != null" class="eq-no">({{ row.no }})</span>
      </div>
    </div>
  </div>
</template>
