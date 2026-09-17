<script lang="ts">
import { defineComponent, h } from 'vue'
import { transformSlot } from './En.vue'
import { provideLang, useRenderCtx } from './registry'

export default defineComponent({
  name: 'Zh',
  props: { lead: { type: String, default: undefined } },
  setup(props, { slots }) {
    provideLang('zh')
    const ctx = useRenderCtx()
    return () =>
      h('div', { class: 'zh-col' }, transformSlot(slots.default?.() ?? [], true, ctx.value, props.lead))
  },
})
</script>
