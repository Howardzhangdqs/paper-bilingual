/**
 * 论文元信息。论文正文不再使用数据接口——agent 直接用写作组件
 * （src/components/paper/）写 Vue 模板，详见 docs/paper-authoring.md。
 */
export interface PaperMeta {
  /** arXiv ID，如 "2305.16264"，同时用作路由参数与文件夹名 */
  id: string
  titleEn: string
  titleZh: string
  /** 作者，自由文本（可含 $..$ 上标等行内标记） */
  authors: string
  venue?: string
  year?: number
  arxivUrl?: string
}

/**
 * 左侧目录条目。编译期由 scripts/gen_toc.mjs 从 sections/*.vue 的
 * <Heading> 字面量提取（toc.generated.ts，随主包 eager 加载，进页即
 * 完整）；未生成静态目录的论文由运行时注册表推导出同形数据兜底。
 */
export interface TocEntry {
  /** DOM 锚点 id（Heading 按注册顺序领取的静态 id） */
  domId: string
  level: 1 | 2
  /** 章节号（"3"、"3.1"、"A"），推导规则与 registry.ts 的 useToc 一致 */
  number: string
  titleEn?: string
  titleZh?: string
}
