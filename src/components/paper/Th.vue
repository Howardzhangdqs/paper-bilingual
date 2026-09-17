<script lang="ts">
/** <Th align="left" :colspan="2">表头单元格</Th>：加粗、上下边框，文本走 richtext */
import { defineComponent, h } from 'vue'
import { transformSlot } from './En.vue'
import { useRenderCtx } from './registry'

export default defineComponent({
  name: 'Th',
  props: {
    align: { type: String, default: 'center' },
    colspan: { type: Number, default: undefined },
    rowspan: { type: Number, default: undefined },
  },
  setup(props, { slots }) {
    const ctx = useRenderCtx()
    return () =>
      h(
        'th',
        { style: { textAlign: props.align }, colspan: props.colspan, rowspan: props.rowspan },
        transformSlot(slots.default?.() ?? [], false, ctx.value),
      )
  },
})
</script>
