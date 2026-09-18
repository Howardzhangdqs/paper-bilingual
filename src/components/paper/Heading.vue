<script setup lang="ts">
/**
 * <Heading :level="1|2|3" label="sec:xxx" :appendix="true"
 *          en="Introduction" zh="引言" />
 * 章节编号（§x / §A.1）由框架按出现顺序自动推导。
 */
import { computed } from 'vue'
import { useNextHeadingId, useRegister } from './registry'

const props = withDefaults(
  defineProps<{
    level?: 1 | 2 | 3
    label?: string
    appendix?: boolean
    /** false 时不进左侧目录（如 Abstract、致谢） */
    toc?: boolean
    en: string
    zh?: string
  }>(),
  { level: 1, toc: true },
)

/* 锚点 id 优先用编译期目录分配的静态 id（scripts/gen_toc.mjs，与目录
   对齐且 URL 稳定）；无静态数据时回退运行时顺序号 */
const item = useRegister({
  type: 'heading',
  id: useNextHeadingId(),
  level: props.level,
  label: props.label,
  appendix: props.appendix,
  toc: props.toc,
})
item.titleEn = props.en
item.titleZh = props.zh
const domId = item.id
const lvl = computed(() => props.level)
</script>

<template>
  <div :id="domId" class="pair-row heading-row" :class="`lvl-${lvl}`">
    <div class="en-col">{{ en }}</div>
    <div class="zh-col">{{ zh }}</div>
  </div>
</template>
