# 架构与文件地图

[README.md](../README.md) 是项目概览，[inline-components.md](inline-components.md)
是论文写作规范，[paper-authoring.md](paper-authoring.md) 是新增一篇论文的操作
指南；本文说明**每个文件是做什么的**，以及只看单个文件看不出来的跨文件机制。
改框架代码前建议通读「跨文件机制速查」一节。

技术栈：Vite + Vue 3 + TypeScript（组合式 API、`<script setup>`），无 UI
库，公式渲染用 KaTeX，图标用 @iconify/vue，路由 vue-router（hash 模式）。

## 全局数据流

论文从发现到渲染的完整链路（理解这个，一半的文件就对号入座了）：

1. **自动发现**：[src/data/registry.ts](../src/data/registry.ts) 用
   `import.meta.glob` 扫描 `src/papers/*/`。`meta.ts` 与
   `toc.generated.ts` eager 进主包（主页列表与目录进页即完整），
   `index.vue`（正文）由路由懒加载，不进主包。
2. **路由**：[src/router.ts](../src/router.ts) 据此逐篇注册
   `/paper/<id>`，文件夹名即论文 ID，无需手动注册。
3. **编号上下文**：[src/components/paper/registry.ts](../src/components/paper/registry.ts)
   的 `providePaper` 建立 provide/inject 上下文；写作组件
   （Heading/Figure/Equation/Table/Para）在 setup 阶段按模板顺序注册
   自身，`derived` 计算属性推导出全部编号、锚点、公式分组——**agent
   写论文时完全不用维护编号**。
4. **正文渲染**：sections/*.vue 中的文本经
   [src/richtext.ts](../src/richtext.ts)（LaTeX 行内标记 → VNode）或
   行内组件（[inline.ts](../src/components/paper/inline.ts)）渲染，
   引用跳转/预览由 [components/inline/](../src/components/inline/) 承担。
5. **编译期目录**：[scripts/gen_toc.mjs](../scripts/gen_toc.mjs) 在
   predev/prebuild（及 dev 期变更，见
   [vite.config.ts](../vite.config.ts) 的 `gen-paper-toc` 插件）扫描
   sections 提取 `<Heading>` 字面量，生成 `toc.generated.ts`（提交入库）。

## 顶层文件

| 文件 | 作用 |
|---|---|
| [index.html](../index.html) | 唯一 HTML 入口；内联防白闪脚本在 Vue 挂载前按 localStorage 偏好预置 `html.dark` |
| [vite.config.ts](../vite.config.ts) | `base: './'`（可部署任意子目录）；dev server 监听 0.0.0.0（局域网/内网穿透）；`gen-paper-toc` 插件在 dev 期 sections 变更时重跑 gen_toc |
| [tsconfig.json](../tsconfig.json) | TS 配置（`vue-tsc -b` 增量检查） |
| [package.json](../package.json) | 脚本：`dev`/`build`（predev/prebuild 自动跑 gen_toc）、`gen:toc`、`figs`（参数必带，见 [paper-authoring.md](paper-authoring.md)） |
| [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) | 推送 main → GitHub Actions 构建并部署 Pages |

## src/ —— 框架代码

### 入口与全局模块（src/ 根）

| 文件 | 作用 |
|---|---|
| [main.ts](../src/main.ts) | createApp、挂载 KaTeX CSS 与全局样式 |
| [App.vue](../src/App.vue) | 顶栏（站名/论文标题接棒/当前章节名/沉浸按钮）+ `<router-view>`；站名点击带反向飞移动画回首页；按路由同步 `html.immersive` 类 |
| [router.ts](../src/router.ts) | 路由：`/` 主页 + 逐篇 `/paper/<id>` 懒加载 + 兜底重定向 |
| [types.ts](../src/types.ts) | `PaperMeta`（论文元信息）、`TocEntry`（目录条目）两个接口 |
| [settings.ts](../src/settings.ts) | 阅读偏好（主题/显示语言/图片反色）：reactive 状态 + localStorage 持久化 + 同步为 `<html>` 类（`dark`、`lang-only-en/zh`、`invert-fig`），布局响应全在 CSS 完成 |
| [immersive.ts](../src/immersive.ts) | 沉浸式阅读开关；窄屏（≤980px）默认开启 |
| [topbarTitle.ts](../src/topbarTitle.ts) | 顶栏标题接棒状态：`titleScrolledAway`、当前章节名与换章方向/速度（PaperBody 写入，App.vue 消费） |
| [richtext.ts](../src/richtext.ts) | **行内富文本渲染核心**：`renderInline(src, ctx)` 把 LaTeX 行内标记（`$..$`、`~\cite`、`\autoref`、`\eqref`、`\url`、`\href`、`\textbf`、`\footnote`、变音符号、dash/引号等）解析为 VNode；未知命令渲染为红色提示原文 |
| [paperTransition.ts](../src/paperTransition.ts) | 首页卡片 ⇄ 论文页头部的共享元素飞移动画（手写飞移层 + WAAPI，非 View Transitions API）；导出 `paperVt.flying` 供渐进挂载避让 |
| [data/registry.ts](../src/data/registry.ts) | 论文注册表（见「全局数据流」第 1 步）：`paperMetas`、`paperMetaById`、`paperLoaders`、`paperTocById` |

### 通用组件（src/components/）

| 文件 | 作用 |
|---|---|
| [HomeView.vue](../src/components/HomeView.vue) | 主页：论文卡片列表；悬停/触摸预载正文 chunk；点击带飞移动画进入论文页 |
| [Lightbox.vue](../src/components/Lightbox.vue) | 图片灯箱：FLIP 原地飞入、滚轮锚点缩放、双指捏合、拖拽、双击 1x/2x；动画期用 PNG 位图、静止回 SVG 矢量 |
| [RichText.ts](../src/components/RichText.ts) | 函数式组件：一段文本 + 可选 RenderCtx → richtext 渲染（题注、作者、文献条目等纯字符串场景用） |
| [rasterCache.ts](../src/components/rasterCache.ts) | 同名 `.png` 位图替身的全局探测/解码缓存（Figure 预热、Lightbox 查询就绪） |
| [SettingsFab.vue](../src/components/SettingsFab.vue) | 左下角阅读设置浮钮（主题/图片反色/显示语言），全页面常驻 |

### 写作组件与论文运行时（src/components/paper/）

`index.ts` 是统一出口：sections 里 `import { Heading, Para, … } from '../../../components/paper'`。

| 文件 | 作用 |
|---|---|
| [index.ts](../src/components/paper/index.ts) | 统一出口：块组件 + 行内组件（Cite/Ref/EqRef/MathIn/Foot） |
| [registry.ts](../src/components/paper/registry.ts) | **运行时注册表**（机制核心）：`providePaper` 建上下文、`useRegister` 注册块、`derived` 推导编号/锚点/公式分组、`useToc` 运行时目录兜底；另提供语言上下文与渐进挂载兜底注入 |
| [PaperBody.vue](../src/components/paper/PaperBody.vue) | 论文容器：布局（目录 + 正文）、页头、文末 References、目录滚动高亮、顶栏章节名更新、**渐进挂载**（首批同步，其余滚动临近/空闲分批）、沉浸式目录浮层 |
| [Heading.vue](../src/components/paper/Heading.vue) | 章节标题（level/label/appendix/toc/en/zh），编号自动推导；锚点 id 优先领编译期静态 id |
| [Para.vue](../src/components/paper/Para.vue) | 双栏段落容器；注册为 spacer——打断「连续公式」分组 |
| [En.vue](../src/components/paper/En.vue) | 英文栏：slot 文本走 richtext、行内组件透传；导出 `transformSlot` 供 Zh/Th/Td 复用 |
| [Zh.vue](../src/components/paper/Zh.vue) | 中文栏，同 En（提供 zh 渲染上下文） |
| [Figure.vue](../src/components/paper/Figure.vue) | 插图：跨栏居中、正文显示 PNG 位图（缺省回退 SVG）、点击进灯箱、题注走 richtext |
| [Equation.vue](../src/components/paper/Equation.vue) | 行间公式：KaTeX 渲染、编号、`tips` 符号释义、连续公式自动合组（组首渲染整块）、复制 LaTeX/展开释义按钮 |
| [Table.vue](../src/components/paper/Table.vue) | 表格容器（编号、中英题注） |
| [Th.vue](../src/components/paper/Th.vue) / [Td.vue](../src/components/paper/Td.vue) | 表头/数据单元格（align/colspan/rowspan，文本走 richtext） |
| [Bullets.vue](../src/components/paper/Bullets.vue) / [Numbered.vue](../src/components/paper/Numbered.vue) | 无序/有序列表容器 |
| [Item.vue](../src/components/paper/Item.vue) | 列表项（内含 En/Zh 双栏格） |
| [inline.ts](../src/components/paper/inline.ts) | 行内组件定义（Cite/Ref/EqRef/MathIn/Foot），与 LaTeX 标记等价 |
| [texCache.ts](../src/components/paper/texCache.ts) | KaTeX 渲染结果缓存（键 = profile+display+源码，宏按对象 WeakMap 隔离），避免渐进挂载期重复渲染 |
| [tips.ts](../src/components/paper/tips.ts) | 公式符号释义：把 tip 键改写为 `\htmlData` 包裹，注册文案供悬停查询 |
| [TipLayer.vue](../src/components/paper/TipLayer.vue) | 符号释义悬浮卡（文档级事件委托，随 PaperBody 挂载一份） |
| [refPreview.ts](../src/components/paper/refPreview.ts) | 链接悬停预览状态机：从目标 DOM 提取摘要（公式/题注/章节/文献）、触摸两段式、防抖显示/延迟隐藏 |
| [RefTipLayer.vue](../src/components/paper/RefTipLayer.vue) | 引用预览卡片层（渲染 refPreview 状态，随 PaperBody 挂载一份） |
| [scroll.ts](../src/components/paper/scroll.ts) | 页内跳转：预载图片 → 全文实化定位 → 冻结窗口外块（content-visibility）→ ease-in-out 滚动 → 恢复；广播 `paper-jump` 事件；`undoJump` 撤销 |
| [JumpUndoFab.vue](../src/components/paper/JumpUndoFab.vue) | 「返回原处」浮钮（监听 paper-jump 事件显隐） |

### 跳转交互组件（src/components/inline/）

由 richtext.ts 与 inline.ts 渲染，一般不直接手写。

| 文件 | 作用 |
|---|---|
| [CiteLink.vue](../src/components/inline/CiteLink.vue) | 文献引用上标 `[n]`：点击跳文末条目并高亮，悬停预览，多引用各数字独立交互 |
| [RefLink.vue](../src/components/inline/RefLink.vue) | 交叉引用（图/表/公式/章节）：中文栏自动转为「图 2」「表 3」「式 14」（eqref 显示「（12）」）、章节引用附章节名；点击跳转（含渐进挂载兜底），悬停预览 |
| [ExtLink.vue](../src/components/inline/ExtLink.vue) | 外部链接（`\url`/`\href`），新标签页打开 |

## src/papers/<id>/ —— 论文内容（agent 手写）

一篇论文一个文件夹，文件夹名即 arXiv ID，glob 自动发现。现有示例：
`2305.16264`（Scaling Data-Constrained Language Models）。

| 文件 | 作用 |
|---|---|
| `meta.ts` | 元信息（标题/作者/venue/arxivUrl），随主页 eager 加载，保持轻量 |
| `index.vue` | 论文入口：`<PaperBody>` 组装各章节组件，传入 cites/references/macros |
| `sections/*.vue` | **agent 手写的正文**：每章一个文件（`NN-slug.vue`，两位序号保证排序），用写作组件组织内容 |
| `cites.json` | 文献 key → 序号（scripts/extract_cites.py 生成） |
| `references.json` | 文献 key → 条目文本（同上；条目内保留行内标记由 RichText 渲染） |
| `toc.generated.ts` | **生成产物，勿手改**：全部 Heading 锚点 id + 目录条目 |

## scripts/ —— 构建辅助脚本

| 文件 | 作用 |
|---|---|
| [gen_toc.mjs](../scripts/gen_toc.mjs) | 编译期目录生成（见「全局数据流」第 5 步）；用 vue/compiler-sfc 提取 `<Heading>` 字面量，非常量表达式直接报错；**编号规则与 registry.ts 的 useToc 逐行同规则，两处需同步改** |
| [convert_figs.py](../scripts/convert_figs.py) | `figures/*.pdf` → `public/figures/<id>/` 下的 `.svg`（矢量）+ `.png`（150 DPI 位图）；PNG/JPG 直接复制；依赖 pdftocairo（poppler-utils） |
| [extract_cites.py](../scripts/extract_cites.py) | `.bbl` → `cites.json` + `references.json`；含 LaTeX 重音/特殊字母 → Unicode 规整 |

图与文献的源（LaTeX/figures/bbl）通常来自姊妹仓库
`../arxiv-translation/<id>/translated/`（见两个 Python 脚本的用法注释）。

## public/

`public/figures/<id>/`：论文插图。每张图两个版本——`.svg`（灯箱静止时
矢量显示）与同名 `.png`（正文内嵌与灯箱动画替身）。Figure 的 `src`
写 `.svg` 路径，位图替换由框架自动完成。

## 跨文件机制速查

改以下机制时牵一发动全身，先读相关文件头部的长注释（都写得很细）：

**编号推导的双实现**：编译期（gen_toc.mjs）与运行时（registry.ts 的
`useToc`/`derived`）是同一套规则的两份代码（sec/sub 计数、附录从 A
重置、`toc=false` 不占号）。Heading 的 props 默认值也参与推导，改任何
一处必须三处同步。锚点 id（英文标题 slug）由 gen_toc 生成、运行时按
注册顺序领取，保证静态目录与 DOM 对齐。

**渐进挂载**：PaperBody 只同步挂载前几个章节，其余由哨兵
（IntersectionObserver，rootMargin 1200px）与空闲泵
（requestIdleCallback）分批补齐；目录/引用跳转可能指向未挂载目标，
`useLazyMount`（`ensureMounted`）负责先补挂再定位。飞移动画期间
（`paperVt.flying`）挂载批次主动暂避。

**content-visibility 与页内跳转**：正文块默认
`content-visibility: auto`（CSS），跳转时 scroll.ts 临时全文实化、
锁定占位高度、冻结起终点窗口之外的块（骨架灰占位），滚动动画结束后
恢复。因此 **DOM 结构类名（`pair-row`/`full-block`/`list-block`）被
scroll.ts 的选择器依赖，改动需同步 `CV_SELECTOR`**。

**双栏 DOM 协议**：`.en-col`/`.zh-col`/`.en-cap`/`.zh-cap`/
`heading-row`/`figure-block`/`table-block`/`eq-formula-row` 等类名被
refPreview.ts（摘要提取）与 style.css（布局/语言开关）依赖，重命名
等于跨三处改动。

**`<html>` 类协议**：`dark`（settings/index.html 防白闪脚本同名 key
`reading-prefs`）、`lang-only-en`/`lang-only-zh`、`invert-fig`、
`immersive`（App.vue 按路由同步）、`fly-nav`（飞移动画期）。
布局与主题的响应几乎都在 style.css 用这些类完成，组件不重渲染。

**KaTeX 宏**：论文 preamble 的 `\newcommand` 写进 index.vue 的
`macros` prop。行内公式 `$…$` 经 RenderCtx（richtext.ts → texCache）
使用；`<MathIn>` 与行间 `<Equation>` 块直接读
`usePaperData().data.macros`（texCache 按宏对象 WeakMap 隔离缓存）。
新增常用命令优先走 macros，其次才考虑扩展 richtext.ts。
