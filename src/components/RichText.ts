/**
 * 行内富文本渲染组件：把 LaTeX 行内标记渲染为 VNode（公式/引用/链接等）。
 * 用法：<RichText :text="..." :zh="false" :ctx="ctx" />
 */
import { defineComponent, h, type PropType } from 'vue'
import { renderInline, type RenderCtx } from '../richtext'

export const RichText = defineComponent({
  name: 'RichText',
  props: {
    text: { type: String, required: true },
    zh: { type: Boolean, default: false },
    ctx: { type: Object as PropType<RenderCtx>, default: undefined },
  },
  setup(props) {
    return () => h('span', null, renderInline(props.text, { zh: props.zh, ...props.ctx }))
  },
})

export default RichText
