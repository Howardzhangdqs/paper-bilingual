/**
 * 论文块运行时注册表：写作组件（Heading/Figure/Equation/Table）在 setup
 * 阶段按模板顺序注册，PaperBody 据此推导图表公式/章节编号、label 映射
 * 与跳转锚点——agent 写作时完全不需要维护编号。
 */
import {
  computed,
  getCurrentScope,
  inject,
  onScopeDispose,
  provide,
  reactive,
  type InjectionKey,
  type Ref,
} from 'vue'

export interface RegItem {
  /** DOM 锚点 id */
  id: string
  type: 'heading' | 'figure' | 'table' | 'equation' | 'spacer'
  label?: string
  /** heading 专属 */
  level?: number
  appendix?: boolean
  /** false 时不进左侧目录（如 Abstract、致谢） */
  toc?: boolean
  /** equation 专属：false 表示不编号 */
  numbered?: boolean
  /** equation 专属：LaTeX 源码（组首合并渲染与复制按钮用） */
  latex?: string
  /** equation 专属：符号释义（键为 LaTeX 片段）；连续公式自动合并为一个面板 */
  tips?: Record<string, string>
  /** TOC 用标题文本（heading） */
  titleEn?: string
  /** heading 中文标题（章节引用附章节名用） */
  titleZh?: string
  /** heading 编号（"1"、"3.1"、"A"，推导时写入，目录显示用） */
  number?: string
}

export interface EqGroupMember {
  id: string
  latex: string
  tips?: Record<string, string>
  /** 推导出的编号（numbered=false 时缺省） */
  number?: number
}

export interface EqGroup {
  /** 组内公式（按出现顺序），整组由组首渲染为一个块 */
  members: EqGroupMember[]
  /** 组内全部符号释义（按出现顺序去重），共享一个面板 */
  rows: { sym: string; text: string }[]
}

export interface PaperDerived {
  labels: Record<string, string>
  anchors: Record<string, string>
  /** 章节标题（heading label -> 中英文标题），章节引用附章节名用 */
  secTitles: Record<string, { en?: string; zh?: string }>
  /** 连续公式组：组首 id -> 组；单条公式自成一组 */
  eqGroups: Record<string, EqGroup>
  /** 公式 id -> 所属组首 id */
  eqGroupOf: Record<string, string>
}

interface PaperContext {
  items: RegItem[]
  seq: { n: number }
}

const CTX_KEY: InjectionKey<PaperContext> = Symbol('paper-ctx')
const DERIVED_KEY: InjectionKey<Ref<PaperDerived>> = Symbol('paper-derived')
const DATA_KEY: InjectionKey<PaperData> = Symbol('paper-data')
const LANG_KEY: InjectionKey<'en' | 'zh'> = Symbol('paper-lang')
/** 渐进挂载兜底：立即挂载全部章节并等 DOM 就绪（跳到尚未挂载的目标时用） */
const MOUNT_KEY: InjectionKey<() => Promise<void>> = Symbol('paper-ensure-mounted')

export interface PaperData {
  cites?: Record<string, number>
  macros?: Record<string, string>
  /** 显式覆盖自动推导的 label 编号（一般留空） */
  extraLabels?: Record<string, string>
}

export function providePaper(data: PaperData = {}): {
  ctx: PaperContext
  data: PaperData
  derived: Ref<PaperDerived>
} {
  const ctx: PaperContext = reactive({ items: [], seq: { n: 0 } }) as PaperContext
  provide(CTX_KEY, ctx)
  provide(DATA_KEY, data)
  const derived = computed<PaperDerived>(() => {
    const labels: Record<string, string> = {}
    const anchors: Record<string, string> = {}
    const secTitles: Record<string, { en?: string; zh?: string }> = {}
    /* 连续 equation 分组：整组由组首渲染为一个块（共享一个释义面板
       与一组工具按钮），符号按出现顺序去重 */
    const eqGroups: Record<string, EqGroup> = {}
    const eqGroupOf: Record<string, string> = {}
    let group: EqGroup | null = null
    let leadId = ''
    let fig = 0
    let tab = 0
    let eq = 0
    let sec = 0
    let sub = 0
    let appendix = false
    let headingIdx = 0
    for (const it of ctx.items) {
      if (it.type === 'equation') {
        if (!group) {
          leadId = it.id
          group = { members: [], rows: [] }
          eqGroups[leadId] = group
        }
        const number = it.numbered === false ? undefined : ++eq
        group.members.push({ id: it.id, latex: it.latex ?? '', tips: it.tips, number })
        eqGroupOf[it.id] = leadId
        if (it.tips) {
          for (const [sym, text] of Object.entries(it.tips)) {
            if (!group.rows.some((r) => r.sym === sym)) group.rows.push({ sym, text })
          }
        }
        if (number !== undefined && it.label) {
          labels[it.label] = String(number)
          anchors[it.label] = it.id
        }
        continue
      }
      group = null
      switch (it.type) {
        case 'figure':
          fig++
          if (it.label) {
            labels[it.label] = `Figure ${fig}`
            anchors[it.label] = it.id
          }
          break
        case 'table':
          tab++
          if (it.label) {
            labels[it.label] = `Table ${tab}`
            anchors[it.label] = it.id
          }
          break
        case 'heading': {
          if (it.appendix) appendix = true
          if (it.level === 1) {
            sub = 0
            sec++
          } else if (it.level === 2) {
            sub++
          }
          const secNo = appendix ? String.fromCharCode(64 + sec) : String(sec)
          const domId = it.id || `sec-${headingIdx}`
          if (it.label) {
            labels[it.label] = sub ? `§${secNo}.${sub}` : `§${secNo}`
            anchors[it.label] = domId
            secTitles[it.label] = { en: it.titleEn, zh: it.titleZh }
          }
          headingIdx++
          break
        }
      }
    }
    return {
      labels: { ...labels, ...data.extraLabels },
      anchors,
      secTitles,
      eqGroups,
      eqGroupOf,
    }
  })
  provide(DERIVED_KEY, derived)
  return { ctx, data, derived }
}

/** 行内组件用：cites / macros / 完整编号表 */
export function usePaperData(): {
  data: PaperData
  derived: Ref<PaperDerived>
} {
  const data = inject(DATA_KEY) ?? {}
  const d = inject(DERIVED_KEY)
  if (!d) throw new Error('缺少 PaperBody 上下文')
  return { data, derived: d }
}

/** En/Zh 用：声明当前语言，供 <Ref> 等自动选择「图 3 / Figure 3」 */
export function provideLang(lang: 'en' | 'zh') {
  provide(LANG_KEY, lang)
}

export function useLang(): 'en' | 'zh' {
  return inject(LANG_KEY, 'en')
}

/** 行内渲染上下文（编号表/锚点/文献/宏），供所有文本渲染点使用 */
export function makeRenderCtx(
  derived: Ref<PaperDerived>,
  data: PaperData,
): Ref<import('../../richtext').RenderCtx> {
  return computed(() => ({
    labels: derived.value.labels,
    anchors: derived.value.anchors,
    secTitles: derived.value.secTitles,
    cites: data.cites,
    macros: data.macros,
  }))
}

export function useRenderCtx(): Ref<import('../../richtext').RenderCtx> {
  const { data, derived } = usePaperData()
  return makeRenderCtx(derived, data)
}

/** 写作组件用：注册自身，返回 DOM id 与卸载清理函数 */
export function useRegister(item: Omit<RegItem, 'id'> & { id?: string }): RegItem {
  const ctx = inject(CTX_KEY)
  if (!ctx) throw new Error('论文写作组件必须放在 <PaperBody> 内')
  const n = ++ctx.seq.n
  const full: RegItem = { ...item, id: item.id || `pblk-${n}` }
  ctx.items.push(full)
  const unregister = () => {
    const i = ctx.items.indexOf(full)
    if (i >= 0) ctx.items.splice(i, 1)
  }
  if (getCurrentScope()) onScopeDispose(unregister)
  return full
}

/** 行内组件用：label 编号与锚点 */
export function useDerived(): Ref<PaperDerived> {
  const d = inject(DERIVED_KEY)
  if (!d) throw new Error('缺少 PaperBody 上下文')
  return d
}

/** PaperBody 提供：立即挂载全部章节（渐进挂载兜底） */
export function provideLazyMount(ensure: () => Promise<void>) {
  provide(MOUNT_KEY, ensure)
}

/** 引用跳转等用：目标可能尚未挂载，先确保全文就绪再定位；
 *  无 PaperBody 上下文（如主页）时为 undefined，调用方直接跳转 */
export function useLazyMount(): (() => Promise<void>) | undefined {
  return inject(MOUNT_KEY, undefined)
}

/** 目录数据：\section/\subsection 级别（含论文编号 1 / 3.1 / A），排除 toc=false */
export function useToc(ctx: PaperContext) {
  return computed(() => {
    const out: { item: RegItem; number: string; domId: string }[] = []
    let sec = 0
    let sub = 0
    let appendix = false
    for (const it of ctx.items) {
      if (it.type !== 'heading' || it.toc === false || (it.level ?? 1) > 2) continue
      if (it.appendix) appendix = true
      if (it.level === 1) {
        sub = 0
        sec++
      } else {
        sub++
      }
      const secNo = appendix ? String.fromCharCode(64 + sec) : String(sec)
      out.push({
        item: it,
        number: it.level === 1 ? secNo : `${secNo}.${sub}`,
        domId: it.id,
      })
    }
    return out
  })
}
