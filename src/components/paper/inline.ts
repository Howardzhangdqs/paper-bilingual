/**
 * 模板行内组件：在 <En>/<Zh> 的 slot 里直接使用，与 LaTeX 标记等价。
 *   <Cite k="vaswani2017attention"/>      ~\cite{vaswani2017attention}
 *   <Ref l="fig:returnalloc"/>            \autoref{fig:returnalloc}
 *   <EqRef l="eq:base"/>                  \eqref{eq:base}
 *   <Math tex="N^\alpha"/>                $N^\alpha$
 *   <Foot>脚注内容</Foot>                  \footnote{...}
 * 语言上下文（图 3 / Figure 3）由所处的 <En>/<Zh> 自动决定。
 */
import { defineComponent, h, type VNode } from 'vue'
import katex from 'katex'
import CiteLink from '../inline/CiteLink.vue'
import RefLink from '../inline/RefLink.vue'
import { noHover, queueTextTip, scheduleHideRefTip, showTextTipNow } from './refPreview'
import { useLang, usePaperData } from './registry'

export const Cite = defineComponent({
  name: 'Cite',
  props: { k: { type: String, required: true } },
  setup(props) {
    const { data } = usePaperData()
    return () =>
      h(CiteLink, { keys: props.k.split(',').map(s => s.trim()), cites: data.cites })
  },
})

export const Ref = defineComponent({
  name: 'Ref',
  props: { l: { type: String, required: true } },
  setup(props) {
    const { derived } = usePaperData()
    const zh = useLang() === 'zh'
    return () =>
      h(RefLink, {
        label: props.l,
        kind: 'ref' as const,
        zh,
        labels: derived.value.labels,
        anchors: derived.value.anchors,
        secTitles: derived.value.secTitles,
      })
  },
})

export const EqRef = defineComponent({
  name: 'EqRef',
  props: { l: { type: String, required: true } },
  setup(props) {
    const { derived } = usePaperData()
    const zh = useLang() === 'zh'
    return () =>
      h(RefLink, {
        label: props.l,
        kind: 'eqref' as const,
        zh,
        labels: derived.value.labels,
        anchors: derived.value.anchors,
      })
  },
})

export const MathIn = defineComponent({
  name: 'MathIn',
  props: { tex: { type: String, required: true } },
  setup(props) {
    const { data } = usePaperData()
    return () => {
      try {
        const html = katex.renderToString(props.tex, {
          throwOnError: false,
          strict: false,
          macros: data.macros,
          trust: true,
        })
        return h('span', { class: 'math-tex', innerHTML: html })
      } catch {
        return h('code', { class: 'math-error' }, props.tex)
      }
    }
  },
})

export const Foot = defineComponent({
  name: 'Foot',
  setup(_, { slots }) {
    const text = () =>
      (slots.default?.() ?? [])
        .map((n: VNode) => (typeof n.children === 'string' ? n.children : ''))
        .join(' ')
        .replace(/\\[a-zA-Z]+\{([^{}]*)\}/g, '$1')
        .replace(/\\[a-zA-Z]+/g, '')
        .replace(/[{}]/g, '')
    /* 悬停显示脚注内容预览卡（RefTipLayer，与链接预览同款）；脚注无
       跳转目标，不显示方向箭头 */
    return () =>
      h(
        'sup',
        {
          class: 'footnote',
          onMouseenter: (e: MouseEvent) => {
            const t = text()
            if (t) queueTextTip(e.currentTarget as HTMLElement, '†', t)
          },
          onMouseleave: () => scheduleHideRefTip(),
          // 触摸设备：点按直接显示（脚注无跳转，不做两段式）
          onClick: (e: MouseEvent) => {
            const t = text()
            if (noHover.matches && t) {
              e.preventDefault()
              showTextTipNow(e.currentTarget as HTMLElement, '†', t)
            }
          },
        },
        '†',
      )
  },
})
