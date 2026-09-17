<script lang="ts">
/** <Td align="right" :colspan="2">$4$</Td>：数据单元格，文本走 richtext（$..$、\cite 等） */
import { defineComponent, h } from 'vue'
import { transformSlot } from './En.vue'
import { useRenderCtx } from './registry'

export default defineComponent({
  name: 'Td',
  props: {
    align: { type: String, default: 'center' },
    colspan: { type: Number, default: undefined },
    rowspan: { type: Number, default: undefined },
  },
  setup(props, { slots }) {
    const ctx = useRenderCtx()
    return () =>
      h(
        'td',
        { style: { textAlign: props.align }, colspan: props.colspan, rowspan: props.rowspan },
        transformSlot(slots.default?.() ?? [], false, ctx.value),
      )
  },
})
</script>
