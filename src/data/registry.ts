/**
 * 论文注册表：自动发现 src/papers/<id>/。
 *
 * 一篇论文 = 一个文件夹：
 *   - meta.ts    轻量元信息，随主页 eager 加载（列表展示）；
 *   - index.vue  正文组件（组装 sections/*.vue），由路由动态加载，
 *                不进主包——主页不背论文代码。
 * 文件夹名即论文 ID（如 src/papers/2305.16264/ -> /paper/2305.16264），
 * 主页与路由自动生效，无需手动注册。
 */
import type { Component } from 'vue'
import type { PaperMeta } from '../types'

export interface PaperModule {
  default: Component
  meta: PaperMeta
}

/** meta.ts eager 加载：文件极小（纯数据），主页列表直接可用 */
const metaModules = import.meta.glob('../papers/*/meta.ts', { eager: true }) as Record<
  string,
  { meta: PaperMeta }
>

/** index.vue 懒加载：路由进入该论文时才下载并编译正文组件 */
const moduleLoaders = import.meta.glob('../papers/*/index.vue') as Record<
  string,
  () => Promise<PaperModule>
>

/** 文件路径 -> 论文 ID（文件所在文件夹名） */
function idOf(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 2]
}

export const paperMetas: PaperMeta[] = Object.values(metaModules)
  .map(mod => mod.meta)
  .filter(m => !!m?.id)
  .sort((a, b) => a.id.localeCompare(b.id))

/** 论文 ID -> meta（顶栏标题等按 ID 查询用） */
export const paperMetaById: Record<string, PaperMeta> = Object.fromEntries(
  paperMetas.map(m => [m.id, m]),
)

/** 论文 ID -> 正文组件的动态加载器（无该论文时为 undefined） */
export const paperLoaders: Record<string, (() => Promise<PaperModule>) | undefined> =
  Object.fromEntries(Object.entries(moduleLoaders).map(([path, load]) => [idOf(path), load]))
