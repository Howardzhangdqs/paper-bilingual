# 行内标记与组件对照表

agent 在论文 sections/*.vue 的字符串字段（`en`/`zh`/`captionEn`/表格
`text` 等）里**直接写 LaTeX 标记**，框架的 RichText 渲染器会把它们映射为
对应的 Vue 组件。写作时不需要写任何 HTML——保持与 LaTeX 源码几乎一致的
书写习惯即可。

组件源码位于 `src/components/inline/`，行为对齐 LaTeX PDF（hyperref）。

## 文献引用

```latex
Scaling up transformers~\cite{vaswani2017attention} has ...
Scaling up transformers~\cite{a,b,c} has ...        % 多个 key 逗号分隔
Chinchilla~\citep{hoffmann2022training} shows ...   % \citep/\citet 同义
```

| 组件 | [CiteLink](../src/components/inline/CiteLink.vue) |
|---|---|
| 渲染 | 蓝色上标 `[42]`（编号按 references 顺序） |
| 交互 | **点击平滑滚动到文末 References 列表的对应条目并金色高亮 1.4s**；悬停显示 cite key |
| 数据 | `cites.json` + `references.json`（scripts/extract_cites.py 生成） |

## 交叉引用

```latex
As shown in \autoref{fig:returnalloc} ...           % 推荐（自动带前缀）
As shown in Figure~\ref{fig:returnalloc} ...        % \ref 只给编号
following (\ref{eq:base}) 或~\eqref{eq:base} ...    % 公式引用带括号
\cref{tab:fits} / \Cref{sec:fixc}                   % 同 \autoref
```

| 组件 | [RefLink](../src/components/inline/RefLink.vue) |
|---|---|
| 渲染 | 英文栏 `Figure 2`、`§4.1`、`Table 3`、`Equation 14`；**中文栏自动显示 `图 2`、`表 3`、`式 14`**（`eqref` 显示 `（12）`）；**章节引用自动附章节名：`§4.1 Method` / `§4.1 方法`**（取该 `Heading` 的 `en`/`zh`） |
| 交互 | **点击平滑滚动到对应的图/表/公式/章节并金色高亮** |
| 前提 | 目标块上写 `label` 字段（照抄 LaTeX 的 `\label` key），编号、锚点与章节名由框架自动推导 |

## 外部链接

```latex
available at \url{https://github.com/...}
see \href{https://arxiv.org/abs/2305.16264}{the paper}   % 链接文字自定义
```

| 组件 | [ExtLink](../src/components/inline/ExtLink.vue) |
|---|---|
| 渲染 | 蓝色链接 |
| 交互 | 新标签页打开 |

## 公式

```latex
损失 $L(N,D) = \frac{A}{N^\alpha}$ 随 ...     % 行内公式
系数为 \(R^*_D\) ...                          % 等价写法
```

KaTeX 渲染；论文 preamble 的 `\newcommand` 写进 index.vue 的 `macros`
即可在公式中使用。行间（跨栏居中）公式用 `equation` 块，不是行内标记。

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
  符号自动显示浅蓝点状下划线，悬停加深并弹卡片。
- 公式块左上角自动提供两个小按钮（框架行为，无需写作）：**展开全部
  释义**（面板出现在公式左侧，左右分屏布局，默认展开）与**复制
  LaTeX 源码**；无 tips 的公式只有复制按钮。连续排布的公式（中间无
  其他内容块）自动合并为一个块：共享一个符号释义面板与一组工具
  按钮，符号按出现顺序去重，复制按钮复制整组 LaTeX 源码。
- 实现见 [tips.ts](../src/components/paper/tips.ts)（LaTeX 改写 + 注册表）
  与 [TipLayer.vue](../src/components/paper/TipLayer.vue)（全局悬浮卡片）。

## 强调与脚注

```latex
\textbf{大语言模型}（LLM）...       % 加粗
\emph{effective data} ...           % 强调（斜体）
... 详见\footnote{https://...} ...  % 上标 †，悬停显示内容
```

## 转义与杂项

`\%` `\&` `\_` `\#` `\$` 输出字符本身；`~` 为不断行空格；`---` 为 em dash；
`\v{r}`→ř、`\c{c}`→ç 等变音符号已支持。

## 未识别命令的处理

遇到不认识的 `\命令`，渲染为带红色下划线的原文并高亮提示，方便在页面上
一眼发现漏写的内容——看到它们就回到 section 文件修正（选择：补译成普通
文本、删除，或确属常用标记时在 `src/richtext.ts` 增加支持）。
