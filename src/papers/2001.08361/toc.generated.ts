/**
 * 本文件由 scripts/gen_toc.mjs 生成，请勿手改。
 * 自动运行时机：predev / prebuild（package.json）与 dev 期 sections
 * 变更（vite.config.ts 的 gen-paper-toc 插件）。
 */
import type { TocEntry } from '../../types'

/** 全部 <Heading> 的锚点 id（按模板顺序，含 level 3 与不进目录者）。
 *  运行时 Heading 按注册顺序逐个领取，静态目录与 DOM 据此对齐 */
export const headingIds: string[] = ["sec-introduction","sec-summary","sec-summary-of-scaling-laws","sec-notation","sec-background-and-methods","sec-parameter-and-compute-scaling-of-transformers","sec-training-procedures","sec-datasets","sec-empirical-results-and-basic-power-laws","sec-approximate-transformer-shape-and-hyperparameter-independence","sec-performance-with-non-embedding-parameter-count-n","sec-comparing-to-lstms-and-universal-transformers","sec-generalization-among-data-distributions","sec-performance-with-dataset-size-and-compute","sec-charting-the-infinite-data-limit-and-overfitting","sec-proposed-l-n-d-equation","sec-results","sec-scaling-laws-with-model-size-and-training-time","sec-adjustment-for-training-at-b-crit-l","sec-results-for-l-n-s-min-and-performance-with-model-size-and-compute","sec-lower-bound-on-early-stopping-step","sec-optimal-allocation-of-the-compute-budget","sec-optimal-performance-and-allocations","sec-predictions-from-l-n-s-min","sec-contradictions-and-a-conjecture","sec-related-work","sec-discussion","sec-acknowledgements","sec-summary-of-power-laws","sec-empirical-model-of-compute-efficient-frontier","sec-defining-equations","sec-efficient-training","sec-comparison-to-inefficient","sec-suboptimal-model-sizes","sec-caveats","sec-supplemental-figures","sec-early-stopping-and-test-vs-train","sec-universal-transformers","sec-batch-size","sec-sample-efficiency-vs-model-size","sec-context-dependence","sec-learning-rate-schedules-and-error-analysis","sec-fit-details-and-power-law-quality","sec-generalization-and-architecture"]

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
    "domId": "sec-summary",
    "level": 2,
    "number": "1.1",
    "titleEn": "Summary",
    "titleZh": "总结"
  },
  {
    "domId": "sec-summary-of-scaling-laws",
    "level": 2,
    "number": "1.2",
    "titleEn": "Summary of Scaling Laws",
    "titleZh": "缩放律概要"
  },
  {
    "domId": "sec-notation",
    "level": 2,
    "number": "1.3",
    "titleEn": "Notation",
    "titleZh": "记号"
  },
  {
    "domId": "sec-background-and-methods",
    "level": 1,
    "number": "2",
    "titleEn": "Background and Methods",
    "titleZh": "背景与方法"
  },
  {
    "domId": "sec-parameter-and-compute-scaling-of-transformers",
    "level": 2,
    "number": "2.1",
    "titleEn": "Parameter and Compute Scaling of Transformers",
    "titleZh": "Transformer 的参数与算力标度"
  },
  {
    "domId": "sec-training-procedures",
    "level": 2,
    "number": "2.2",
    "titleEn": "Training Procedures",
    "titleZh": "训练流程"
  },
  {
    "domId": "sec-datasets",
    "level": 2,
    "number": "2.3",
    "titleEn": "Datasets",
    "titleZh": "数据集"
  },
  {
    "domId": "sec-empirical-results-and-basic-power-laws",
    "level": 1,
    "number": "3",
    "titleEn": "Empirical Results and Basic Power Laws",
    "titleZh": "实证结果与基本幂律"
  },
  {
    "domId": "sec-approximate-transformer-shape-and-hyperparameter-independence",
    "level": 2,
    "number": "3.1",
    "titleEn": "Approximate Transformer Shape and Hyperparameter Independence",
    "titleZh": "Transformer 形状与超参数的近似无关性"
  },
  {
    "domId": "sec-performance-with-non-embedding-parameter-count-n",
    "level": 2,
    "number": "3.2",
    "titleEn": "Performance with Non-Embedding Parameter Count N",
    "titleZh": "非嵌入参数量 N 与性能"
  },
  {
    "domId": "sec-performance-with-dataset-size-and-compute",
    "level": 2,
    "number": "3.3",
    "titleEn": "Performance with Dataset Size and Compute",
    "titleZh": "数据集规模与算力对应的性能"
  },
  {
    "domId": "sec-charting-the-infinite-data-limit-and-overfitting",
    "level": 1,
    "number": "4",
    "titleEn": "Charting the Infinite Data Limit and Overfitting",
    "titleZh": "绘制无限数据极限与过拟合"
  },
  {
    "domId": "sec-proposed-l-n-d-equation",
    "level": 2,
    "number": "4.1",
    "titleEn": "Proposed L(N,D) Equation",
    "titleZh": "所提出的 L(N, D) 方程"
  },
  {
    "domId": "sec-results",
    "level": 2,
    "number": "4.2",
    "titleEn": "Results",
    "titleZh": "结果"
  },
  {
    "domId": "sec-scaling-laws-with-model-size-and-training-time",
    "level": 1,
    "number": "5",
    "titleEn": "Scaling Laws with Model Size and Training Time",
    "titleZh": "模型规模与训练时间的缩放律"
  },
  {
    "domId": "sec-adjustment-for-training-at-b-crit-l",
    "level": 2,
    "number": "5.1",
    "titleEn": "Adjustment for Training at B_crit(L)",
    "titleZh": "按 B_crit(L) 训练的修正"
  },
  {
    "domId": "sec-results-for-l-n-s-min-and-performance-with-model-size-and-compute",
    "level": 2,
    "number": "5.2",
    "titleEn": "Results for L(N, S_min) and Performance with Model Size and Compute",
    "titleZh": "L(N, S_min) 的结果及模型规模与算力对应的性能"
  },
  {
    "domId": "sec-lower-bound-on-early-stopping-step",
    "level": 2,
    "number": "5.3",
    "titleEn": "Lower Bound on Early Stopping Step",
    "titleZh": "早停步数的下界"
  },
  {
    "domId": "sec-optimal-allocation-of-the-compute-budget",
    "level": 1,
    "number": "6",
    "titleEn": "Optimal Allocation of the Compute Budget",
    "titleZh": "算力预算的最优分配"
  },
  {
    "domId": "sec-optimal-performance-and-allocations",
    "level": 2,
    "number": "6.1",
    "titleEn": "Optimal Performance and Allocations",
    "titleZh": "最优性能与分配"
  },
  {
    "domId": "sec-predictions-from-l-n-s-min",
    "level": 2,
    "number": "6.2",
    "titleEn": "Predictions from L(N, S_min)",
    "titleZh": "由 L(N, S_min) 出发的预测"
  },
  {
    "domId": "sec-contradictions-and-a-conjecture",
    "level": 2,
    "number": "6.3",
    "titleEn": "Contradictions and a Conjecture",
    "titleZh": "矛盾与一个猜想"
  },
  {
    "domId": "sec-related-work",
    "level": 1,
    "number": "7",
    "titleEn": "Related Work",
    "titleZh": "相关工作"
  },
  {
    "domId": "sec-discussion",
    "level": 1,
    "number": "8",
    "titleEn": "Discussion",
    "titleZh": "讨论"
  },
  {
    "domId": "sec-summary-of-power-laws",
    "level": 1,
    "number": "A",
    "titleEn": "Summary of Power Laws",
    "titleZh": "幂律总结"
  },
  {
    "domId": "sec-empirical-model-of-compute-efficient-frontier",
    "level": 1,
    "number": "B",
    "titleEn": "Empirical Model of Compute-Efficient Frontier",
    "titleZh": "算力高效前沿的经验模型"
  },
  {
    "domId": "sec-defining-equations",
    "level": 2,
    "number": "B.1",
    "titleEn": "Defining Equations",
    "titleZh": "定义方程"
  },
  {
    "domId": "sec-efficient-training",
    "level": 2,
    "number": "B.2",
    "titleEn": "Efficient Training",
    "titleZh": "高效训练"
  },
  {
    "domId": "sec-comparison-to-inefficient",
    "level": 2,
    "number": "B.3",
    "titleEn": "Comparison to Inefficient",
    "titleZh": "与低效训练的比较"
  },
  {
    "domId": "sec-suboptimal-model-sizes",
    "level": 2,
    "number": "B.4",
    "titleEn": "Suboptimal Model Sizes",
    "titleZh": "次优模型规模"
  },
  {
    "domId": "sec-caveats",
    "level": 1,
    "number": "C",
    "titleEn": "Caveats",
    "titleZh": "注意事项"
  },
  {
    "domId": "sec-supplemental-figures",
    "level": 1,
    "number": "D",
    "titleEn": "Supplemental Figures",
    "titleZh": "补充图表"
  },
  {
    "domId": "sec-early-stopping-and-test-vs-train",
    "level": 2,
    "number": "D.1",
    "titleEn": "Early Stopping and Test vs Train",
    "titleZh": "早停与测试/训练损失"
  },
  {
    "domId": "sec-universal-transformers",
    "level": 2,
    "number": "D.2",
    "titleEn": "Universal Transformers",
    "titleZh": "Universal Transformer"
  },
  {
    "domId": "sec-batch-size",
    "level": 2,
    "number": "D.3",
    "titleEn": "Batch Size",
    "titleZh": "批量大小"
  },
  {
    "domId": "sec-sample-efficiency-vs-model-size",
    "level": 2,
    "number": "D.4",
    "titleEn": "Sample Efficiency vs Model Size",
    "titleZh": "样本效率与模型规模"
  },
  {
    "domId": "sec-context-dependence",
    "level": 2,
    "number": "D.5",
    "titleEn": "Context Dependence",
    "titleZh": "上下文依赖"
  },
  {
    "domId": "sec-learning-rate-schedules-and-error-analysis",
    "level": 2,
    "number": "D.6",
    "titleEn": "Learning Rate Schedules and Error Analysis",
    "titleZh": "学习率调度与误差分析"
  },
  {
    "domId": "sec-fit-details-and-power-law-quality",
    "level": 2,
    "number": "D.7",
    "titleEn": "Fit Details and Power Law Quality",
    "titleZh": "拟合细节与幂律质量"
  },
  {
    "domId": "sec-generalization-and-architecture",
    "level": 2,
    "number": "D.8",
    "titleEn": "Generalization and Architecture",
    "titleZh": "泛化与架构"
  }
]
