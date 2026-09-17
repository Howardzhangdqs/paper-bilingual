<script setup lang="ts">
/**
 * <Table label="tab:xxx" caption-en="..." caption-zh="...">
 *   <tr><Th align="left">Dataset</Th><Th>Epochs</Th></tr>
 *   <tr><Td align="left">C4</Td><Td>$4$</Td></tr>
 * </Table>
 * 跨栏居中，编号自动推导；单元格文本支持 LaTeX 行内标记。
 */
import { computed } from 'vue'
import RichText from '../RichText'
import { useDerived, useRegister, useRenderCtx } from './registry'

const props = defineProps<{
  label?: string
  captionEn?: string
  captionZh?: string
}>()

const item = useRegister({ type: 'table', label: props.label })
const derived = useDerived()
const rctx = useRenderCtx()
const no = computed(() => {
  const v = props.label ? derived.value.labels[props.label] : undefined
  const m = v?.match(/(\d+)/)
  return m ? Number(m[1]) : undefined
})
</script>

<template>
  <div :id="item.id" class="full-block table-block">
    <div v-if="captionEn || captionZh" class="caption">
      <div class="en-cap">
        <span v-if="no" class="fig-no">Table {{ no }}: </span>
        <RichText v-if="captionEn" :text="captionEn" :ctx="rctx" />
      </div>
      <div class="zh-cap">
        <span v-if="no" class="fig-no">表 {{ no }}：</span>
        <RichText v-if="captionZh" :text="captionZh" zh :ctx="rctx" />
      </div>
    </div>
    <table>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
