# 行内组件与行内标记

论文 sections/*.vue 里，正文写在 `<En>…</En>` / `<Zh>…</Zh>` 的 slot
中（表格单元格 `<Td>`/`<Th>` 的 slot、Figure 的 `caption-en`/
`caption-zh` 题注字符串同理）。行内的引用、公式、链接用**行内组件**
书写（推荐），同一位置也支持等价的 **LaTeX 行内标记**（由 richtext
渲染器转换为同样的组件）——两种写法可在同一段落里混用，渲染结果
与交互完全一致。

## 行内组件（推荐写法）

在 `<En>`/`<Zh>` 等的 slot 里直接使用；语言上下文（图 3 / Figure 3）
由所处的 `<En>`/`<Zh>` 自动决定。定义见
[inline.ts](../src/components/paper/inline.ts)。

```vue
<Para>
  <En>Scaling up transformers~<Cite k="vaswani2017attention"/> shows that
  loss follows <MathIn tex="L = A/N^{\alpha}"/>, as shown in
  <Ref l="fig:returnalloc"/> and <EqRef l="eq:base"/>.</En>
  <Zh>扩展 transformer~<Cite k="vaswani2017attention"/> 表明损失服从
  <MathIn tex="L = A/N^{\alpha}"/>，见<Ref l="fig:returnalloc"/>与
  <EqRef l="eq:base"/>。</Zh>
</Para>
```

| 组件 | 等价 LaTeX 标记 | 用途 |
|---|---|---|
| `<Cite k="key"/>`（多 key 逗号分隔） | `~\cite{a,b}`（`\citep`/`\citet` 同义） | 文献引用 |
| `<Ref l="label"/>` | `\autoref{label}`（`\ref`/`\cref`/`\Cref` 同义） | 交叉引用 |
| `<EqRef l="label"/>` | `\eqref{label}` | 公式引用（带括号） |
| `<MathIn tex="..."/>` | `$...$` 或 `\(...\)` | 行内公式 |
| `<Foot>脚注内容</Foot>` | `\footnote{...}` | 脚注 |

## LaTeX 行内标记（等价写法）

与组件完全等价，直接写在 slot 文本或题注字符串里，保持与 LaTeX
源码几乎一致的书写习惯：

```vue
<En>Scaling up transformers~\cite{vaswani2017attention} has shown that
performance follows $N^{-\alpha}$, as shown in \autoref{fig:returnalloc}
and \eqref{eq:base}. Data is available at
\url{https://github.com/huggingface/datablations}.</En>
```

仅有 LaTeX 标记、暂无组件等价的行内写法：

```latex
\textbf{大语言模型}（LLM）...       % 加粗
\emph{effective data} ...           % 强调（斜体）
see \href{https://arxiv.org/abs/2305.16264}{the paper}   % 自定义链接文字
```

## 各位置的行内支持范围

| 位置 | 说明 |
|---|---|
| `<En>`/`<Zh>` slot | 纯文本走 richtext（LaTeX 标记生效）；行内组件直接透传 |
| `<Td>`/`<Th>` slot | 同上 |
| Figure `caption-en`/`caption-zh` | 题注字符串走 richtext（LaTeX 标记生效，不支持 slot 组件） |
| `<Heading en zh>` | 纯文本插值，不走 richtext |

## 渲染与交互（两种写法共用）

### 文献引用（CiteLink / `<Cite/>`）

| 项 | 说明 |
|---|---|
| 渲染 | 蓝色上标 `[42]`（编号按 references 顺序）；无编号映射时显示 key 原文 |
| 交互 | **点击平滑滚动到文末 References 列表的对应条目并金色高亮 1.4s**；悬停约 150ms 弹出预览卡显示条目内容（带 ↑上文/↓下文 方向指示）；合并的多引用（`[1, 2]`）各数字独立跳转与预览 |
| 触摸 | 无悬停的设备两段式：首击显示预览卡（卡内「点我跳转」按钮或再点一次该数字），二击跳转 |
| 数据 | `cites.json` + `references.json`（scripts/extract_cites.py 生成） |

### 交叉引用（RefLink / `<Ref/>` / `<EqRef/>`）

```latex
As shown in \autoref{fig:returnalloc} ...           % 推荐写法之一
```

| 项 | 说明 |
|---|---|
| 渲染 | 英文栏 `Figure 2`、`§4.1`、`Table 3`、`Equation 14`；**中文栏自动显示 `图 2`、`表 3`、`式 14`**（`eqref` 显示 `（12）`）；**章节引用自动附章节名：`§4.1 Method` / `§4.1 方法`**（取该 `Heading` 的 `en`/`zh`） |
| 交互 | **点击平滑滚动到对应的图/表/公式/章节并金色高亮**——章节跳到页面顶部（与目录一致），图/表/公式居中展示；悬停约 150ms 弹出预览卡：公式显示整段 KaTeX、图表显示中英题注、章节显示中文标题 + 首块正文摘要（卡片带 ↑上文/↓下文 方向指示） |
| 触摸 | 两段式：首击显示预览卡（卡内「点我跳转」按钮或再点一次该链接），二击跳转 |
| 前提 | 目标块上写 `label` 字段（照抄 LaTeX 的 `\label` key），编号、锚点与章节名由框架自动推导；目标章节尚未渐进挂载时框架会先补挂全文再跳转 |

### 外部链接（ExtLink，仅 LaTeX 标记 `\url`/`\href`）

| 项 | 说明 |
|---|---|
| 渲染 | 蓝色链接 |
| 交互 | 新标签页打开 |

### 行内公式（`<MathIn/>` / `$...$`）

KaTeX 渲染；论文 preamble 的 `\newcommand` 写进 index.vue 的 `macros`
即可在公式中使用。行间（跨栏居中）公式用 `Equation` 块，不是行内写法。

## 公式符号悬停释义（Equation 的 tips）

行间公式可给符号配一句话释义，鼠标悬停（触摸设备点按）符号时显示
「符号 + 中文释义」卡片：

```vue
<Equation label="eq:ccbase"
  latex="L(N,D) = \frac{A}{N^\alpha} + \frac{B}{D^\beta} + E"
  :tips="{
    L: '交叉熵损失',
    N: '非词嵌入参数量',
    D: '训练词元数',
    '\\alpha': '参数项幂律指数',
    'R_D^*': '重复的临界值（学得常数）',
  }" />
```

写作要点：

- **键是 latex 里逐字出现的 LaTeX 片段**（`R_D^*` 就写 `R_D^*`，与公式
  中写法一致才能匹配；公式里同一符号多处出现会全部标上）。
- 含撇号的键用转义写法：`'D\\''`（即 `D'`）；含反斜杠的键写 `'\\alpha'`。
- 组合符号优先于其前缀（`R_D^*` 先于 `R_D`），按长度自动排序，无需关心顺序。
- 键前不能紧邻字母（防误配命令名内部），键后不能紧跟字母；连写变量
  （如 `12lh^2` 中的 `l`）匹配不到，可给整段 `12lh^2` 或改用组合键。
- 释义写一句话（20 字左右），说明该符号在本文中的含义即可；带释义的
  符号自动显示浅蓝点状下划线，悬停加深并弹卡片（触摸设备点按符号
  显示/隐藏）；释义文字里的 LaTeX 片段（如 `R_N^*`、`\alpha`）自动用
  KaTeX 渲染。
- 公式块右上角自动提供两个小按钮（框架行为，无需写作）：**展开全部
  释义**（面板出现在公式左侧，左右分屏布局，默认展开）与**复制
  LaTeX 源码**；无 tips 的公式只有复制按钮。连续排布的公式（中间无
  其他内容块）自动合并为一个块：共享一个符号释义面板与一组工具
  按钮，符号按出现顺序去重，复制按钮复制整组 LaTeX 源码（多条公式
  以空行分隔）。
- 实现见 [tips.ts](../src/components/paper/tips.ts)（LaTeX 改写 + 注册表）
  与 [TipLayer.vue](../src/components/paper/TipLayer.vue)（符号释义悬浮卡）。

## 转义与杂项

`\%` `\&` `\_` `\#` `\$` `\{` `\}` 输出字符本身；`~` 为不断行空格；
`--` 为 en dash、`---` 为 em dash；`` `` `` 与 `''` 排版为弯引号；
`\dots` 为 …；`\v{r}`→ř、`\c{c}`→ç、`\'e`→é 等变音符号已支持；
`\texttt{...}` 等宽、`\underline{...}` 下划线、`\textsc{...}` 小型大写。

## 未识别命令的处理

遇到不认识的 `\命令`，渲染为带红色下划线的原文并高亮提示，方便在页面上
一眼发现漏写的内容——看到它们就回到 section 文件修正（选择：补译成普通
文本、删除，或确属常用标记时在 `src/richtext.ts` 增加支持）。
