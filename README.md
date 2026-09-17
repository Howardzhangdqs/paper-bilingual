# 论文双语对照阅读网页

Vite + Vue3 + TS 框架：左栏英文（Times New Roman）、右栏中文逐行对照，
图片 / 表格 / 行间公式跨栏居中显示，KaTeX 渲染公式，左侧目录随滚动高亮，
窄屏自动降级单栏。插图点击进入灯箱（原地飞入放大、滚轮锚点缩放、拖拽
平移；动画用位图、静止回矢量）。

## 论文由 agent 手写 Vue 模板

论文内容不是数据文件，也不是脚本转换的产物——由 agent 阅读 LaTeX 源码后
用**写作组件**亲手编写模板源码（一篇论文一个文件夹，glob 自动发现）：

```
web/src/papers/<id>/
├── meta.ts          # 论文元信息（主页 eager 加载，独立于正文组件）
├── index.vue        # <PaperBody> 组装各章节组件（路由动态加载）
├── cites.json       # 文献编号（scripts/extract_cites.py 生成）
├── references.json  # 文末 References 列表数据
└── sections/        # agent 手写：每章一个 .vue，用写作组件组织内容
```

写作组件（`src/components/paper/`，统一出口 `import {...} from '…/paper'`）：

```vue
<Heading :level="1" label="sec:intro" en="Introduction" zh="引言" />
<Para>
  <En>Scaling up transformers~\cite{vaswani2017attention} …</En>
  <Zh>扩展 transformer~\cite{vaswani2017attention} ……</Zh>
</Para>
<Equation label="eq:model" latex="L = \frac{A}{N^\alpha} + E" />
<Figure src="figures/<id>/x.svg" label="fig:x" caption-en="…" caption-zh="…" />
<Table label="tab:x"><tr><Th>…</Th></tr><tr><Td>$4$</Td></tr></Table>
<Bullets><Item><En>…</En><Zh>…</Zh></Item></Bullets>
```

图表/公式/章节编号、目录、引用跳转（cite → 文末文献、autoref → 对应图表）
全部由框架按组件出现顺序自动推导，写上 `label` 即可。

完整写作规范见 [docs/inline-components.md](docs/inline-components.md)。

## 目录结构

```
web/
├── scripts/
│   ├── convert_figs.py   # figures/*.pdf -> public/figures/<id>/*.svg + *.png
│   └── extract_cites.py  # main.bbl -> cites.json + references.json
├── src/
│   ├── components/
│   │   ├── paper/        # ★ 写作组件（Heading/Para/Figure/…/En/Zh/Cite/Ref）
│   │   ├── inline/       # CiteLink/RefLink/ExtLink（跳转交互）
│   │   ├── Lightbox.vue  # 图片灯箱（FLIP 飞入/缩放/拖拽）
│   │   └── RichText.ts   # 行内 LaTeX 标记 → VNode
│   ├── papers/<id>/      # ★ 论文（文件夹 = 自动发现的路由）
│   ├── data/registry.ts  # import.meta.glob 自动发现论文
│   └── types.ts          # PaperMeta
└── public/figures/<id>/  # 论文图：SVG 矢量 + PNG 位图（灯箱动画替身）
```

## 开发

```bash
npm install
npm run dev      # 开发
npm run build    # 构建到 dist/（base 为相对路径，可静态部署任意子目录）
```
