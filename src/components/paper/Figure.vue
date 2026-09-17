<script setup lang="ts">
/**
 * <Figure src="figures/<id>/name.svg" :width="100" label="fig:xxx"
 *         caption-en="..." caption-zh="..." />
 * 跨栏居中，编号自动推导；点击进入灯箱（原地复制品飞入放大）。
 * 正文显示同名 .png 位图（150 DPI，解码与传输都远轻于复杂 SVG，
 * 后者单张解码可达数 MB）；SVG 只在灯箱静止时加载显示（放大锐利，
 * 动画期间灯箱自行切回已缓存的位图替身）。PNG 缺失时回退 SVG。
 */
import { computed, ref } from 'vue'
import RichText from '../RichText'
import Lightbox from '../Lightbox.vue'
import { useDerived, useRegister, useRenderCtx } from './registry'

const props = withDefaults(
  defineProps<{
    src: string
    width?: number
    label?: string
    captionEn?: string
    captionZh?: string
  }>(),
  { width: 100 },
)

const item = useRegister({ type: 'figure', label: props.label })
const derived = useDerived()
const rctx = useRenderCtx()
const no = computed(() => {
  const v = props.label ? derived.value.labels[props.label] : undefined
  const m = v?.match(/(\d+)/)
  return m ? Number(m[1]) : undefined
})

/** 正文位图：同名 .png；加载失败（无位图）时回退 SVG 原图 */
const thumbSrc = computed(() => props.src.replace(/\.svg$/, '.png'))
const thumbOk = ref(true)

const zoomed = ref(false)
const zoomFrom = ref<{ left: number; top: number; width: number; height: number }>()

function open(e: Event) {
  const r = (e.target as HTMLImageElement).getBoundingClientRect()
  zoomFrom.value = { left: r.left, top: r.top, width: r.width, height: r.height }
  zoomed.value = true
}
</script>

<template>
  <figure :id="item.id" class="full-block figure-block">
    <img
      :src="thumbOk ? thumbSrc : src"
      :style="{ width: width + '%' }"
      :alt="captionEn"
      loading="lazy"
      decoding="async"
      class="zoomable"
      @error="thumbOk = false"
      @click="open"
    />
    <figcaption v-if="captionEn || captionZh" class="caption">
      <div class="en-cap">
        <span v-if="no" class="fig-no">Figure {{ no }}: </span>
        <RichText v-if="captionEn" :text="captionEn" :ctx="rctx" />
      </div>
      <div class="zh-cap">
        <span v-if="no" class="fig-no">图 {{ no }}：</span>
        <RichText v-if="captionZh" :text="captionZh" zh :ctx="rctx" />
      </div>
    </figcaption>
    <Lightbox v-if="zoomed" :src="src" :alt="captionEn" :from="zoomFrom" @close="zoomed = false" />
  </figure>
</template>
