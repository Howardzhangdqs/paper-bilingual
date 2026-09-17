/**
 * 论文元信息。论文正文不再使用数据接口——agent 直接用写作组件
 * （src/components/paper/）写 Vue 模板，详见 web/docs/writing-guide.md。
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
