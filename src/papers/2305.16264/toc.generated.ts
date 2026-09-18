/**
 * 本文件由 scripts/gen_toc.mjs 生成，请勿手改。
 * 自动运行时机：predev / prebuild（package.json）与 dev 期 sections
 * 变更（vite.config.ts 的 gen-paper-toc 插件）。
 */
import type { TocEntry } from '../../types'

/** 全部 <Heading> 的锚点 id（按模板顺序，含 level 3 与不进目录者）。
 *  运行时 Heading 按注册顺序逐个领取，静态目录与 DOM 据此对齐 */
export const headingIds: string[] = ["sec-abstract","sec-introduction","sec-background","sec-method-data-constrained-scaling-laws","sec-parametric-fit","sec-experimental-setup","sec-results-resource-allocation-for-data-constrained-scaling","sec-results-resource-return-for-data-constrained-scaling","sec-results-complementary-strategies-for-obtaining-additional-data","sec-related-work","sec-conclusion","sec-acknowledgments","sec-derivation-of-data-constrained-scaling-laws","sec-analytical-properties-of-compute-optimal-point","sec-c4-scaling-coefficients","sec-additional-contour-plots","sec-double-descent","sec-repeating-on-heavily-deduplicated-data","sec-do-excess-parameters-hurt-plateau-or-help","sec-case-study-galactica","sec-training-loss","sec-scaling-curves-on-the-oscar-corpus","sec-validation-loss-by-epoch","sec-evaluation-details","sec-downstream-repetition-results","sec-detailed-code-augmentation-results","sec-filtering-procedure","sec-detailed-filtering-results","sec-loss-curves-for-complementary-strategies","sec-limitations-and-future-work","sec-contributions","sec-hyperparameters-and-setup","sec-prompts-and-samples","sec-other-experiments","sec-release-of-artifacts","sec-version-control","sec-broader-impacts"]

/** 左侧目录条目（编号规则与 registry.ts 的 useToc 一致） */
export const toc: TocEntry[] = [
  {
    "domId": "sec-introduction",
    "level": 1,
    "number": "1",
    "titleEn": "Introduction",
    "titleZh": "引言"
  },
  {
    "domId": "sec-background",
    "level": 1,
    "number": "2",
    "titleEn": "Background",
    "titleZh": "背景"
  },
  {
    "domId": "sec-method-data-constrained-scaling-laws",
    "level": 1,
    "number": "3",
    "titleEn": "Method: Data-Constrained Scaling Laws",
    "titleZh": "方法：数据受限的缩放定律"
  },
  {
    "domId": "sec-parametric-fit",
    "level": 2,
    "number": "3.1",
    "titleEn": "Parametric Fit",
    "titleZh": "参数化拟合"
  },
  {
    "domId": "sec-experimental-setup",
    "level": 1,
    "number": "4",
    "titleEn": "Experimental Setup",
    "titleZh": "实验设置"
  },
  {
    "domId": "sec-results-resource-allocation-for-data-constrained-scaling",
    "level": 1,
    "number": "5",
    "titleEn": "Results: Resource Allocation for Data-Constrained Scaling",
    "titleZh": "结果：数据受限扩展的资源分配"
  },
  {
    "domId": "sec-results-resource-return-for-data-constrained-scaling",
    "level": 1,
    "number": "6",
    "titleEn": "Results: Resource Return for Data-Constrained Scaling",
    "titleZh": "结果：数据受限扩展的资源回报"
  },
  {
    "domId": "sec-results-complementary-strategies-for-obtaining-additional-data",
    "level": 1,
    "number": "7",
    "titleEn": "Results: Complementary Strategies for Obtaining Additional Data",
    "titleZh": "结果：获取额外数据的互补策略"
  },
  {
    "domId": "sec-related-work",
    "level": 1,
    "number": "8",
    "titleEn": "Related Work",
    "titleZh": "相关工作"
  },
  {
    "domId": "sec-conclusion",
    "level": 1,
    "number": "9",
    "titleEn": "Conclusion",
    "titleZh": "结论"
  },
  {
    "domId": "sec-derivation-of-data-constrained-scaling-laws",
    "level": 1,
    "number": "A",
    "titleEn": "Derivation of Data-Constrained Scaling Laws",
    "titleZh": "数据受限缩放定律的推导"
  },
  {
    "domId": "sec-analytical-properties-of-compute-optimal-point",
    "level": 2,
    "number": "A.1",
    "titleEn": "Analytical properties of compute-optimal point",
    "titleZh": "计算最优点的解析性质"
  },
  {
    "domId": "sec-c4-scaling-coefficients",
    "level": 1,
    "number": "B",
    "titleEn": "C4 Scaling Coefficients",
    "titleZh": "C4 缩放系数"
  },
  {
    "domId": "sec-additional-contour-plots",
    "level": 1,
    "number": "C",
    "titleEn": "Additional Contour Plots",
    "titleZh": "更多等值线图"
  },
  {
    "domId": "sec-double-descent",
    "level": 1,
    "number": "D",
    "titleEn": "Double Descent",
    "titleZh": "双下降"
  },
  {
    "domId": "sec-repeating-on-heavily-deduplicated-data",
    "level": 1,
    "number": "E",
    "titleEn": "Repeating on Heavily Deduplicated Data",
    "titleZh": "在深度去重数据上的重复训练"
  },
  {
    "domId": "sec-do-excess-parameters-hurt-plateau-or-help",
    "level": 1,
    "number": "F",
    "titleEn": "Do Excess Parameters Hurt, Plateau or Help?",
    "titleZh": "过剩参数有害、趋平还是有帮助？"
  },
  {
    "domId": "sec-case-study-galactica",
    "level": 1,
    "number": "G",
    "titleEn": "Case Study: Galactica",
    "titleZh": "案例分析：Galactica"
  },
  {
    "domId": "sec-training-loss",
    "level": 1,
    "number": "H",
    "titleEn": "Training Loss",
    "titleZh": "训练损失"
  },
  {
    "domId": "sec-scaling-curves-on-the-oscar-corpus",
    "level": 1,
    "number": "I",
    "titleEn": "Scaling Curves on the OSCAR Corpus",
    "titleZh": "OSCAR 语料库上的缩放曲线"
  },
  {
    "domId": "sec-validation-loss-by-epoch",
    "level": 1,
    "number": "J",
    "titleEn": "Validation Loss by Epoch",
    "titleZh": "按 epoch 展示的验证损失"
  },
  {
    "domId": "sec-evaluation-details",
    "level": 1,
    "number": "K",
    "titleEn": "Evaluation Details",
    "titleZh": "评估细节"
  },
  {
    "domId": "sec-downstream-repetition-results",
    "level": 1,
    "number": "L",
    "titleEn": "Downstream Repetition Results",
    "titleZh": "下游重复训练结果"
  },
  {
    "domId": "sec-detailed-code-augmentation-results",
    "level": 1,
    "number": "M",
    "titleEn": "Detailed Code Augmentation Results",
    "titleZh": "代码增广的详细结果"
  },
  {
    "domId": "sec-filtering-procedure",
    "level": 1,
    "number": "N",
    "titleEn": "Filtering Procedure",
    "titleZh": "过滤流程"
  },
  {
    "domId": "sec-detailed-filtering-results",
    "level": 1,
    "number": "O",
    "titleEn": "Detailed Filtering Results",
    "titleZh": "过滤的详细结果"
  },
  {
    "domId": "sec-loss-curves-for-complementary-strategies",
    "level": 1,
    "number": "P",
    "titleEn": "Loss Curves for Complementary Strategies",
    "titleZh": "互补策略的损失曲线"
  },
  {
    "domId": "sec-limitations-and-future-work",
    "level": 1,
    "number": "Q",
    "titleEn": "Limitations and Future Work",
    "titleZh": "局限与未来工作"
  },
  {
    "domId": "sec-contributions",
    "level": 1,
    "number": "R",
    "titleEn": "Contributions",
    "titleZh": "贡献"
  },
  {
    "domId": "sec-hyperparameters-and-setup",
    "level": 1,
    "number": "S",
    "titleEn": "Hyperparameters and Setup",
    "titleZh": "超参数与设置"
  },
  {
    "domId": "sec-prompts-and-samples",
    "level": 1,
    "number": "T",
    "titleEn": "Prompts and Samples",
    "titleZh": "提示与样本"
  },
  {
    "domId": "sec-other-experiments",
    "level": 1,
    "number": "U",
    "titleEn": "Other Experiments",
    "titleZh": "其他实验"
  },
  {
    "domId": "sec-release-of-artifacts",
    "level": 1,
    "number": "V",
    "titleEn": "Release of Artifacts",
    "titleZh": "成果发布"
  },
  {
    "domId": "sec-version-control",
    "level": 1,
    "number": "W",
    "titleEn": "Version Control",
    "titleZh": "版本记录"
  },
  {
    "domId": "sec-broader-impacts",
    "level": 1,
    "number": "X",
    "titleEn": "Broader Impacts",
    "titleZh": "更广泛的影响"
  }
]
