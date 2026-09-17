<!-- Results: Resource Return for Data-Constrained Scaling -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:beyond" en="Results: Resource Return for Data-Constrained Scaling" zh="结果：数据受限扩展的资源回报" />

<Figure src="figures/2305.16264/dualplot.svg" :width="100" label="fig:epochs" caption-en="\textbf{Empirical and Extrapolated loss with constrained data.} \textit{(Left):} Loss as a function of repeated tokens for three different training budgets each with fixed number of parameters. Loss curves predicted by our data-constrained scaling laws are shifted to exactly match the loss at 100\% unique data. Return on FLOPs decays with repeated data in a regular pattern. \textit{(Right):} Extrapolating from the proposed data-constrained  scaling law shows that
        at small numbers epochs are benign, but at large number of epochs loss stops improving." caption-zh="\textbf{数据受限下的实测损失与外推损失。}\textit{（左）：}三个不同训练预算（各自参数量固定）下损失随重复词元数的变化。我们数据受限缩放定律预测的损失曲线经过平移，使其在 100\% 唯一数据处与实测损失完全吻合。FLOPs 的回报随数据重复呈规律性衰减。\textit{（右）：}由所提数据受限缩放定律外推可知，epoch 数较小时其影响是良性的，而 epoch 数很大时损失不再改善。" />

<Para>
  <En>Next, consider the question of \textit{Return} on scaling. To quantify this value, we run experiments with three FLOP budgets across eight respective data budgets to compare return on FLOPs.</En>
  <Zh>接下来考虑扩展的\textit{回报}问题。为量化这一价值，我们在三个 FLOP 预算下分别搭配八个数据预算开展实验，以比较 FLOPs 的回报。</Zh>
</Para>

<Para>
  <En>\autoref{fig:validation} shows the configurations and validation curves for models trained on the same number of total tokens. Conforming to intuition and prior work on deduplication~\cite{deduplicatinglee2021}, repeated data is worth less, thus models trained on less unique data (and, correspondingly, more epochs) have consistently higher loss. However, the loss difference for a few epochs is negligible. For example, the $N=8.7$ billion parameter model trained for four epochs ($D_C=44$ billion unique tokens) finishes training with only 0.5\% higher validation loss than the single-epoch model ($D_C=178$ billion unique tokens).</En>
  <Zh>\autoref{fig:validation} 展示了在相同总词元数上训练的各模型的配置与验证曲线。与直观认识和关于去重的已有工作~\cite{deduplicatinglee2021}一致，重复数据的价值较低，因此在较少唯一数据（相应地更多 epoch）上训练的模型损失始终更高。不过，少数几个 epoch 造成的损失差异可以忽略。例如，训练四个 epoch 的 $N=87$ 亿参数模型（$D_C=440$ 亿唯一词元）训练结束时的验证损失仅比单 epoch 模型（$D_C=1780$ 亿唯一词元）高 0.5\%。</Zh>
</Para>

<Para>
  <En>In \autoref{fig:epochs} (left), we compare the final test loss of each model to predictions from our parametric fit. The data-constrained scaling laws can accurately measure the decay in the value of repeated data as seen by the proximity of empirical results (dots) and parametric fit (lines). We note however that it significantly underestimates the final test loss of failing models where loss increases midway through training, such as models trained for 44 epochs (not depicted).</En>
  <Zh>在 \autoref{fig:epochs}（左）中，我们把每个模型的最终测试损失与参数化拟合的预测进行比较。数据受限缩放定律能够准确刻画重复数据价值的衰减，这体现在实证结果（点）与参数化拟合（线）的贴近程度上。但需注意，对于训练中途损失上升的失败模型（例如训练 44 个 epoch 的模型，未在图中画出），拟合显著低估了其最终测试损失。</Zh>
</Para>

<Para>
  <En>In \autoref{fig:epochs} (right), we extrapolate the three budgets by further scaling compute while keeping the data constraints ($D_C$) at 55B, 84B, and 178B tokens, respectively. The parameter $R_D^*$ introduced in \autoref{sec:method} represents roughly the  ``half-life'' of epochs: specifically the point where repeated tokens have lost  $\tfrac{1}{e}$ of their value. Through our fitting in \autoref{sec:scalinglaws}, we found $R_D^* \approx 15$, corresponding to 15 repetitions (or 16 epochs). Graphically, this can be seen by the stark diminishing returns in the proximity of the 16-epoch marker and the flattening out soon after.</En>
  <Zh>在 \autoref{fig:epochs}（右）中，我们在保持数据约束（$D_C$）分别为 550 亿、840 亿和 1780 亿词元的前提下继续扩大计算，对三个预算进行外推。\autoref{sec:method} 中引入的参数 $R_D^*$ 大致代表 epoch 的“半衰期”：具体指重复词元已损失其价值 $1/e$ 的位置。通过 \autoref{sec:scalinglaws} 中的拟合，我们得到 $R_D^* \approx 15$，即 15 次重复（或 16 个 epoch）。从图上看，这体现为在 16-epoch 标记附近回报急剧递减，随后曲线很快趋平。</Zh>
</Para>

<Para>
  <En>Overall, the \emph{Return} when repeating data is relatively good. Meaningful gains from repeating data can be made up to around 16 epochs ($R_D^*$) beyond which returns diminish extremely fast.</En>
  <Zh>总体而言，重复数据时的\emph{回报}相当可观。重复数据带来的有意义的增益可持续到约 16 个 epoch（$R_D^*$），超过此后回报会急剧递减。</Zh>
</Para>
</template>
