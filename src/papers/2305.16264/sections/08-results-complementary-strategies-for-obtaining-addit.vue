<!-- Results: Complementary Strategies for Obtaining Additional Data -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:beyond" en="Results: Complementary Strategies for Obtaining Additional Data" zh="结果：获取额外数据的互补策略" />

<Figure src="figures/2305.16264/strategies.svg" :width="40" label="fig:beyond" caption-en="\textbf{Strategies for data-constrained settings and their downstream performance.} \emph{(Left):} Schematic showing alternative data use strategies of code filling and filtering. \emph{(Right):} $N=4.2$ billion parameter models trained for a total of $D=84$ billion tokens with varying budgets $D_C$. For repeating and filling with code, five models with different seeds are trained for each dot and the standard deviation is visualized as the shaded area." caption-zh="\textbf{面向数据受限情形的策略及其下游性能。}\emph{（左）：}代码填充与过滤等替代性数据使用策略的示意图。\emph{（右）：}$N=42$ 亿参数的模型在总词元数 $D=840$ 亿、数据预算 $D_C$ 各不相同下训练。对重复与代码填充，每个数据点训练 5 个不同随机种子的模型，阴影区域表示标准差。" />

<Para>
  <En>While repeating data is effective, it has diminishing returns. We therefore consider strategies for scaling $D$ targeting improved downstream performance as opposed to directly minimizing loss.</En>
  <Zh>重复数据虽然有效，但存在回报递减。因此，我们考虑以提升下游性能为目标的 $D$ 扩展策略，而非直接最小化损失。</Zh>
</Para>

<Para>
  <En>\autoref{fig:beyond}~(left) illustrates the strategies: \textbf{(a) Code augmentation:}  We use Python code from The Stack~\cite{kocetkov2022stack} to make up for missing natural language data. The combined dataset consisting of code and natural language samples is shuffled randomly. \textbf{(b) Adapting filtering:} We investigate the performance impact of deduplication and perplexity filtering, two common filtering steps that can severely limit available data. Removing such filtering steps can free up additional training data.</En>
  <Zh>\autoref{fig:beyond}（左）展示了这些策略：\textbf{(a) 代码增广：}我们使用来自 The Stack~\cite{kocetkov2022stack} 的 Python 代码来弥补自然语言数据的不足。由代码与自然语言样本组成的混合数据集会被随机打乱。\textbf{(b) 调整过滤：}我们研究去重与困惑度过滤这两种会严重限制可用数据量的常见过滤步骤对性能的影响。取消这类过滤步骤可以释放额外的训练数据。</Zh>
</Para>

<Para>
  <En>For these experiments, we set a maximum data budget ($D_C$) of 84 billion tokens. For repetition and code filling, only a subset of $D_C$ is available and the rest needs to be compensated for via repeating or adding code. For both filtering methods, we start out with approximately twice the budget (178 billion tokens), as it is easier to gather noisy data and filter it than it is to gather clean data for training. For perplexity filtering, we select the top 25\% samples with the lowest perplexity according to a language model trained on Wikipedia. This results in 44 billion tokens that are repeated for close to two epochs to reach the full data budget. For deduplication filtering, all samples with a 100-char overlap are removed resulting in 21 billion tokens that are repeated for four epochs during training. See \autoref{sec:filtering} for more details on the filtering procedures.</En>
  <Zh>在这些实验中，我们把最大数据预算（$D_C$）设为 840 亿词元。对重复与代码填充，只有 $D_C$ 的一个子集可用，其余部分需要通过重复或添加代码来补足。对两种过滤方法，我们以约两倍的预算（1780 亿词元）作为起点，因为收集含噪数据再过滤，比直接收集干净的训练数据更容易。对困惑度过滤，我们依据在维基百科上训练的语言模型，选择困惑度最低的前 25\% 样本，得到 440 亿词元，再重复训练接近 2 个 epoch 以达到完整数据预算。对去重过滤，移除所有存在 100 字符重叠的样本后得到 210 亿词元，训练中重复 4 个 epoch。过滤流程的更多细节见 \autoref{sec:filtering}。</Zh>
</Para>

<Para>
  <En>When comparing across data strategies, loss ceases to be a good evaluation metric as the models are trained on different data distributions. We thus evaluate models on 19 natural language tasks with zero to five in-context few-shot exemplars~\cite{brown2020language} producing 114 scores per model. As our evaluation tasks cover different metrics and random baselines, we re-scale all scores to be in the same range to better reflect performance ranges before averaging. Details on the evaluation datasets are in \autoref{sec:eval}.</En>
  <Zh>在不同数据策略之间比较时，由于各模型的训练数据分布不同，损失不再是合适的评估指标。因此，我们在 19 个自然语言任务上、以 0 到 5 个上下文少样本示例（few-shot exemplars）~\cite{brown2020language}评估模型，每个模型产生 114 个分数。由于各评估任务的度量与随机基线不同，我们在取平均之前先把所有分数重新缩放到相同区间，以更好地反映性能差异。评估数据集的细节见 \autoref{sec:eval}。</Zh>
</Para>

<Para>
  <En>In \autoref{fig:beyond} (right) we compare the downstream performance of all strategies. For repeating data, differences in downstream performance are insignificant for up to around 4 epochs (25\% budget) and then start dropping, which aligns with our results on test loss in \autoref{sec:fixc}. Filling up to 50\% of data with code (42 billion tokens) also shows no deterioration. Beyond that, performance decreases quickly on natural language tasks. However, adding more code data may benefit non-natural language tasks, which are not considered in the benchmarking. Two of the tasks benchmarked, WebNLG~\cite{castro-ferreira20:bilin-bi-direc-webnl-shared,gehrmann2021gem}, a generation task, and bAbI~\cite{weston2015towards,liang2022holistic}, a reasoning task, see jumps in performance as soon as code is added, possibly due to code enabling models to learn long-range state-tracking capabilities beneficial for these tasks.</En>
  <Zh>在 \autoref{fig:beyond}（右）中，我们比较了所有策略的下游性能。对重复数据而言，直到约 4 个 epoch（25\% 预算）之前，下游性能差异都不显著，之后才开始下降，这与 \autoref{sec:fixc} 中关于测试损失的结果一致。用代码填充至多 50\% 的数据（420 亿词元）也没有表现出性能退化。超过这一比例后，自然语言任务上的性能迅速下降。不过，加入更多代码数据可能有利于非自然语言任务，而这类任务未纳入本基准测试。在所测评的任务中，生成任务 WebNLG~\cite{castro-ferreira20:bilin-bi-direc-webnl-shared,gehrmann2021gem} 与推理任务 bAbI~\cite{weston2015towards,liang2022holistic} 一旦加入代码，性能便出现跃升，这可能是因为代码使模型学到了有利于这些任务的长程状态跟踪能力。</Zh>
</Para>

<Para>
  <En>Of the filtering approaches, we find perplexity-filtering to be effective, while deduplication does not help. Prior work found deduplication was able to improve perplexity~\cite{deduplicatinglee2021}; however, it did not evaluate on downstream tasks. Deduplication may have value not captured in our benchmark, such as reducing memorization \cite{kandpal2022deduplicating,hernandez2022scaling,carlini2022quantifying,biderman2023emergent}. We also investigate filtering on a different noisier dataset in \autoref{sec:addfilter}, where we find it to be more effective. Overall, in a data-constrained regime, we recommend reserving filtering for noisy datasets and using both code augmentation and repeating to increase data tokens. For example, first doubling the available data by adding code and then repeating the new dataset for four epochs results in 8$\times$ more training tokens that are expected to be just as good as having had 8$\times$ more unique data from the start.</En>
  <Zh>在过滤方法中，我们发现困惑度过滤有效，而去重没有帮助。已有工作发现去重能够改善困惑度~\cite{deduplicatinglee2021}，但并未在下游任务上评估。去重可能具有我们的基准未能体现的价值，例如减少记忆化（memorization）\cite{kandpal2022deduplicating,hernandez2022scaling,carlini2022quantifying,biderman2023emergent}。我们还在另一个更含噪的数据集上研究了过滤（\autoref{sec:addfilter}），发现过滤在那里更为有效。总体而言，在数据受限情形下，我们建议把过滤保留给含噪数据集，并通过代码增广与重复两种手段来增加数据词元。例如，先通过添加代码使可用数据翻倍，再对新数据集重复训练 4 个 epoch，可以得到 8$\times$ 的训练词元，其效果预计与一开始就拥有 8$\times$ 的唯一数据相当。</Zh>
</Para>
</template>
