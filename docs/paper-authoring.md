# 新增一篇论文（操作指南）

本文是**从零新增一篇论文**的完整操作步骤。[README.md](../README.md) 是项目概览，
[architecture.md](architecture.md) 讲每个文件「是什么」，本文讲「怎么一步步做」；
行内写法（引用、公式、脚注、LaTeX 标记、tips 规则）的完整规范在
[inline-components.md](inline-components.md)，本文不重复细节。

一篇论文 = `src/papers/<arXiv-id>/` 一个文件夹，由
[src/data/registry.ts](../src/data/registry.ts) 的 `import.meta.glob` 自动发现：
**文件夹名即论文 ID 即路由参数**（`/paper/<id>`），无需任何注册。现有示例：
[src/papers/2305.16264/](../src/papers/2305.16264/)。下文 `<id>` 代指新论文的
arXiv ID（如 `2305.16264`）。

## 1. 前置材料

LaTeX 翻译稿与配套产物通常在姊妹仓库 `../arxiv-translation/<id>/translated/`
（相对本仓库根目录；实际位置不同就换成真实路径）。需要其中三样：

| 材料 | 用途 |
|---|---|
| `translated/figures/`（*.pdf 或 png/jpg） | 第 3 步转图 |
| `translated/main.bbl` | 第 4 步提取文献 |
| LaTeX 正文与 preamble（*.tex） | 第 7 步人工改写成 sections/*.vue |

姊妹仓库还没有该论文时，先完成 LaTeX 翻译再回来（本仓库不做源码转换）。

## 2. 建文件夹

```bash
mkdir -p src/papers/<id>/sections
```

目标结构（各文件何时来见后续步骤）：

```
src/papers/<id>/
├── meta.ts            # 第 5 步手写：元信息
├── index.vue          # 第 6 步手写：组装章节
├── cites.json         # 第 4 步生成
├── references.json    # 第 4 步生成
├── toc.generated.ts   # 第 8 步生成，勿手改
└── sections/          # 第 7 步手写：每章一个 .vue
```

## 3. 转图

[convert_figs.py](../scripts/convert_figs.py) 把 `figures/*.pdf` 转成 `.svg`（矢量）
+ `.png`（150 DPI 位图）成对产物，输出到 `public/figures/<id>/`；PNG/JPG 源直接
复制。依赖 poppler-utils 的 `pdftocairo`（缺则 `sudo apt install poppler-utils`）。

```bash
# bun script 只是转发，参数必须带全（不带参数会因缺 --id 直接报错）
bun run figs -- ../arxiv-translation/<id>/translated/figures --id <id>
# 等价写法
python3 scripts/convert_figs.py ../arxiv-translation/<id>/translated/figures --id <id>
# 源图更新后重转已存在文件，加 --force；输出目录可用 --out 覆盖（默认 public/figures/<id>）
```

Figure 组件的 `src` 写 **`.svg` 路径**（如 `figures/<id>/return_alloc.svg`），
正文位图替换由框架自动完成。

## 4. 提取文献

[extract_cites.py](../scripts/extract_cites.py) 从 `.bbl` 生成两个 JSON（没有
bun 包装，直接 python3）：

```bash
python3 scripts/extract_cites.py ../arxiv-translation/<id>/translated/main.bbl \
    --out-dir src/papers/<id>
```

- `cites.json`：文献 key → 序号，供 `~\cite` 上标编号；
- `references.json`：文献 key → 条目文本，文末 References 列表与引用跳转的落点。

## 5. 写 meta.ts

字段定义见 [src/types.ts](../src/types.ts) 的 `PaperMeta`；照抄示例
[src/papers/2305.16264/meta.ts](../src/papers/2305.16264/meta.ts)：

```ts
import type { PaperMeta } from '../../types'

export const meta: PaperMeta = {
  id: '<id>',                      // 必须与文件夹名一致
  venue: 'NeurIPS',
  year: 2023,
  arxivUrl: 'https://arxiv.org/abs/<id>',
  titleEn: '…',
  titleZh: '…',
  authors: 'Niklas Muennighoff~$^1$ … \\\\ $^1$Hugging Face …',  // 自由文本，可含行内标记
}
```

注意：meta.ts 随主页 **eager 进主包**，保持纯数据、别放正文；`authors` 走
richtext 渲染，上标 `$^1$`、换行 `\\\\` 等行内标记可用。

## 6. 写 index.vue

`<PaperBody>` 组装各章节并传入数据（props 含义见
[PaperBody.vue](../src/components/paper/PaperBody.vue) 头注释）：

```vue
<script lang="ts">
export { meta } from './meta'
import { meta } from './meta'
</script>

<script setup lang="ts">
import { PaperBody } from '../../components/paper'
import cites from './cites.json'
import references from './references.json'
import S01 from './sections/01-abstract.vue'
import S02 from './sections/02-introduction.vue'
// …每章一个 import，全部列出
</script>

<template>
  <PaperBody
    :meta="meta"
    :cites="cites"
    :references="references"
    :macros="{ '\\argmin': '\\operatorname*{argmin}' }"
  >
    <S01 />
    <S02 />
  </PaperBody>
</template>
```

- `macros`：论文 preamble 的 `\newcommand{\argmin}{\operatorname*{argmin}}`
  写成键值对（反斜杠在 TS 字符串里转义为 `\\`），公式里即可使用。
- `extraLabels`：仅在自动编号覆盖不到时用（如原文坏引用），一般留空。
- 章节组件在模板中的**出现顺序决定编号顺序**，与文件名序号保持一致。

## 7. 写 sections/NN-slug.vue

命名：`两位序号-英文slug.vue`（`01-abstract.vue`、`02-introduction.vue`…），
两位序号保证目录排序即章节顺序；slug 可截断（示例有 `06-…-sca.vue`）。
组件统一从 `'../../../components/paper'` 导入，清单见
[architecture.md](architecture.md)「写作组件」表，行内组件与 LaTeX 标记对照见
[inline-components.md](inline-components.md)。真实小段（摘自示例论文，略有删节）：

```vue
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Bullets, Item } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:background" en="Background" zh="背景" />

<Para>
  <En>Chinchilla~\cite{hoffmann2022training} uses three methods for making scaling predictions:</En>
  <Zh>Chinchilla~\cite{hoffmann2022training} 使用三种方法进行缩放预测：</Zh>
</Para>

<Bullets>
  <Item>
    <En>(\textit{Fixed Parameters}) Train with a fixed model size but on varying amounts of data.</En>
    <Zh>（\textit{Fixed Parameters}，固定参数）以固定的模型规模在不同数据量上训练。</Zh>
  </Item>
</Bullets>

<Equation label="eq:model" latex="\argmin_{N, D} L(N, D) \text{ s.t. } \text{FLOPs}(N, D) = C"
  :tips="{ N: '模型的非词嵌入参数量', D: '训练处理的词元（token）总数' }" />
</template>
```

常见坑：

- **Heading 的属性必须是静态字面量**（`en="…"`、`:level="1"`、`:toc="false"`
  都可以；变量、拼接、`v-bind="对象"` 不行）——[gen_toc.mjs](../scripts/gen_toc.mjs)
  遇到无法静态求值的表达式会直接报错退出。
- `toc.generated.ts` 是生成产物，**勿手改**（见第 8 节）。
- 编号全自动：图/表/公式/章节编号及 `\autoref`、`~\cite` 的显示全部由框架按
  组件出现顺序推导，**绝不手写「图 3」「[42]」这类编号**，只写 `label` 与引用。
- 新章节必须 import 进 index.vue 并放进 `<PaperBody>` 的 slot——gen_toc 按
  index.vue 模板里的出现顺序扫描。
- Equation 的 `tips` 键必须与 `latex` 里逐字一致（含转义写法），完整匹配规则
  见 [inline-components.md](inline-components.md)「公式符号悬停释义」。
- 页面出现红色下划线的未识别命令时回 section 修正，处理方式见
  [inline-components.md](inline-components.md)「未识别命令的处理」。

## 8. 生成目录

`gen_toc.mjs` 扫描 sections 提取 `<Heading>` 字面量，生成
`src/papers/<id>/toc.generated.ts`。运行时机：

- `predev`/`prebuild` 自动跑（`bun run dev`、`bun run build` 前置钩子）；
- dev 期间 vite 插件 `gen-paper-toc`（[vite.config.ts](../vite.config.ts)）监听
  `src/papers/**/*.vue` 变更自动重跑（防抖合并）；
- 手动：`bun run gen:toc`。

改了章节结构（新增/改名/调级）后，用 `git diff` 确认 `toc.generated.ts`
已更新；该产物**提交入库**（随主包 eager 加载，进页即完整目录）。

## 9. 验证清单

```bash
bun run dev
```

- 主页出现新论文卡片，进入 `/#/paper/<id>`；
- 页面无红色「未识别命令」标记；
- 图/表/公式编号正确，Figure 显示正常、点击进灯箱；
- 左侧目录完整，点击跳转正确；`\cite` 跳文末 References，`\autoref` 跳对应
  图表/公式/章节；公式符号悬停释义生效。

```bash
bun run build    # vue-tsc 类型检查 + vite 构建，必须通过
```

## 10. 上线

提交全部新文件（含 `cites.json`、`references.json`、`toc.generated.ts`、
`public/figures/<id>/`）并合并到 `main`，GitHub Actions
（[.github/workflows/deploy.yml](../.github/workflows/deploy.yml)）自动构建并
部署 GitHub Pages，无需手动操作。
