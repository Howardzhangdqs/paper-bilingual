# AGENTS.md —— 项目入口指引

论文双语对照阅读网站：左栏英文、右栏中文逐行对照，图表与行间公式
跨栏居中，KaTeX 渲染公式，左侧目录随滚动高亮，GitHub Pages 部署。

当前形态：Vite + Vue3 + TypeScript，bun 管理依赖与脚本。

- 无测试框架，无 linter 配置（以 `package.json` 为准）。
- 论文内容由 agent 用「写作组件」手写 Vue 模板：一篇论文 =
  `src/papers/<arXiv-id>/` 一个文件夹，`import.meta.glob` 自动发现。

## 按任务路由的必读文档

任何任务先读 [README.md](README.md)，再按下表深入：

| 任务 | 必读文档 |
| --- | --- |
| 新增 / 修改论文内容 | [docs/paper-authoring.md](docs/paper-authoring.md)（完整流程）＋ [docs/inline-components.md](docs/inline-components.md)（行内写法） |
| 改框架代码 / 构建 / 样式 | [docs/architecture.md](docs/architecture.md)，尤其「跨文件机制速查」一节 |

写作前还需过目（重点看文件头注释）：

- [package.json](package.json) —— 脚本入口与依赖。
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) —— 部署链路。
- [scripts/gen_toc.mjs](scripts/gen_toc.mjs) —— 编译期目录与编号推导。
- [src/data/registry.ts](src/data/registry.ts) —— 论文自动发现与加载分层。
- [src/components/paper/registry.ts](src/components/paper/registry.ts) —— 运行时注册表与编号推导。

## 常用命令

- `bun run dev` —— 本地开发。
  - `predev` 钩子自动生成目录，无需手动先跑。
- `bun run build` —— `vue-tsc` 类型检查 ＋ vite 构建。
  - 改完代码必须跑；CI 也靠它把关。
- `bun run gen:toc` —— 手动重新生成各论文的 `toc.generated.ts`。
- `bun run figs` —— 论文图转换（`scripts/convert_figs.py`）。参数必带
  （图源目录与 `--id`，缺省会报错），完整命令见
  [docs/paper-authoring.md](docs/paper-authoring.md)。

## 硬性约定（红线）

- **一篇论文 = 一个文件夹**：放入 `src/papers/<id>/` 即自动发现并生成路由。
  - 为什么：注册表由 glob 驱动；手动注册路由或改
    `src/data/registry.ts` 会破坏自动发现，纯属画蛇添足。
- **编号全自动**：图表/公式/章节编号、目录、引用锚点全部由框架按组件
  出现顺序推导；写论文时不要手写编号，写 `label` 即可。
  - 为什么：内容一旦增删，手写编号会悄悄失配，且与目录对不上。
- **`<Heading>` 的属性必须是静态字面量**。
  - 为什么：`gen_toc.mjs` 用 `vue/compiler-sfc` 静态求值，非常量
    表达式直接报错退出，不给你悄悄产出错目录的机会。
- **生成产物勿手改**：`toc.generated.ts` / `cites.json` / `references.json`。
  - 为什么：都是脚本产物，手改会被下次生成覆盖。
- **编号规则多处同步**：推导逻辑在 `scripts/gen_toc.mjs`（编译期）与
  `src/components/paper/registry.ts` 的 `useToc`（运行时）重复实现，
  `Heading.vue` 的 props 默认值（`{ level: 1, toc: true }`）是同一口径。
  - 为什么：任一处单独改动会让静态目录与运行时编号不一致。
- **DOM 类名协议**：`.en-col` / `.zh-col` / `.pair-row` / `.full-block` /
  `.heading-row` / `.figure-block` / `.table-block` / `.eq-formula-row` 等。
  - 为什么：`src/style.css`（布局/语言切换）、
    `src/components/paper/scroll.ts`（`CV_SELECTOR`）、
    `src/components/paper/refPreview.ts`（摘要提取）都按名字取节点，
    改名是跨文件改动，须一并更新。
- **`<html>` 类协议**：`dark` / `lang-only-en` / `lang-only-zh` /
  `invert-fig` / `immersive` / `fly-nav`。
  - 为什么：布局与主题响应几乎都在 CSS 完成，改行为先查
    `style.css` 中这些类的规则。
- **localStorage key `reading-prefs`**：`index.html` 的防白闪内联脚本与
  `src/settings.ts` 共用。
  - 为什么：改 key 只动一处，刷新时用户偏好会闪回默认值。
- **push 即公开部署**：提交到 `main` 会由 GitHub Actions 自动构建并
  发布到 GitHub Pages。
  - 为什么：外发效果，线上立即可见；未经用户明确要求不要 push。

## 交流语言

- 与用户交流一律使用简体中文。
- 本仓代码注释惯例也为中文。

## 验证习惯

- 改论文内容后：本地 `bun run dev`，检查页面上红色的「未识别命令」
  标记，以及编号与跳转是否正确。
- 改任何代码后：跑 `bun run build`，确认类型检查与构建通过。
- **改动即更新文档**：行为、结构、命令或约定一旦变化，同步修订受影响
  的文档（[README.md](README.md) 与 [docs/](docs) 下相关文档，含本文件），
  与代码改动一并提交。
  - 为什么：文档是后续 agent 与协作者的路标，与代码失配的文档比
    没有文档更误导。
