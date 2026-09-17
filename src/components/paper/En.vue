<script lang="ts">
/**
 * <En lead="可选引导语">…slot…</En>
 * slot 里可混写：
 *   - 纯文本 + LaTeX 行内标记（$..$、~\cite{k}、\autoref{k}、\textbf{} 等）
 *     ——由 richtext 渲染为公式/引用/强调（编号/锚点来自论文上下文）；
 *   - 行内组件（<Cite k=".."/>、<Ref l=".."/>、<MathIn tex=".."/>）——直接透传。
 */
import { defineComponent, h, type VNode } from 'vue'
import { renderInline } from '../../richtext'
import { provideLang, useRenderCtx } from './registry'

export function transformSlot(
  nodes: VNode[],
  zh: boolean,
  ctx: import('../../richtext').RenderCtx,
  lead?: string,
): VNode[] {
  const body = nodes
    .filter(n => n.type !== Comment)
    .map(n => (typeof n.children === 'string' ? renderInline(n.children, { ...ctx, zh }) : [n]))
    .flat()
  if (!lead) return body
  return [h('span', { class: 'lead' }, lead), ...body]
}

export default defineComponent({
  name: 'En',
  props: { lead: { type: String, default: undefined } },
  setup(props, { slots }) {
    provideLang('en')
    const ctx = useRenderCtx()
    return () =>
      h('div', { class: 'en-col' }, transformSlot(slots.default?.() ?? [], false, ctx.value, props.lead))
  },
})
</script>
