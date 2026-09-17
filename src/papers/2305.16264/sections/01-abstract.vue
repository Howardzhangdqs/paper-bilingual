<!-- Abstract -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" en="Abstract" zh="摘要" :toc="false" />

<Para>
  <En>The current trend of scaling language models involves increasing both parameter count and training dataset size. Extrapolating this trend suggests that training dataset size may soon be limited by the amount of text data available on the internet. Motivated by this limit, we investigate scaling language models in data-constrained regimes. Specifically, we run a large set of experiments varying the extent of data repetition and compute budget, ranging up to 900 billion training tokens and 9 billion parameter models. We find that with constrained data for a fixed compute budget, training with up to 4 epochs of repeated data yields negligible changes to loss compared to having unique data. However, with more repetition, the value of adding compute eventually decays to zero. We propose and empirically validate a scaling law for compute optimality that accounts for the decreasing value of repeated tokens and excess parameters. Finally, we experiment with approaches mitigating data scarcity, including augmenting the training dataset with code data or removing commonly used filters. Models and datasets from our 400 training runs are freely available at \url{https://github.com/huggingface/datablations}.</En>
  <Zh>  当前扩展语言模型的趋势是同时增加参数量和训练数据集规模。将这一趋势外推可知，训练数据集的规模可能很快就会受到互联网上可用文本数据总量的限制。受这一限制的启发，我们研究了数据受限情形下语言模型的扩展。具体而言，我们开展了大量实验，系统变化数据重复程度与计算预算，最高涉及 9000 亿训练词元和 90 亿参数的模型。我们发现：在计算预算固定而数据受限的条件下，与使用全新数据相比，重复数据进行至多 4 个 epoch 的训练对损失的影响可以忽略；然而，当重复次数更多时，增加计算的价值最终会衰减为零。我们提出并通过实验验证了一条计算最优的缩放定律，该定律刻画了重复词元与过剩参数价值的递减。最后，我们实验了若干缓解数据稀缺的方法，包括用代码数据增广训练数据集，以及放宽常用的数据过滤。我们 400 次训练运行所得的模型与数据集已在 \url{https://github.com/huggingface/datablations} 免费公开。</Zh>
</Para>

<Figure src="figures/2305.16264/return_alloc.svg" :width="100" label="fig:returnalloc" caption-en="\textbf{\emph{Return} and \emph{Allocation} when repeating data.} \emph{(Left):} Loss of LLMs (4.2B parameters) scaled on repeated data decays predictably (\autoref{sec:fixc}). \emph{(Right):} To maximize performance when repeating, our data-constrained scaling laws and empirical data suggest training smaller models for more epochs in contrast to what assuming Chinchilla scaling laws~\cite{hoffmann2022training} hold for repeated data would predict (\autoref{sec:fixu})." caption-zh="\textbf{重复数据时的\emph{回报}（Return）与\emph{分配}（Allocation）。}\emph{（左）：}在重复数据上扩展的大语言模型（42 亿参数）的损失呈可预测的衰减（\autoref{sec:fixc}）。\emph{（右）：}为在重复数据时最大化性能，我们的数据受限缩放定律与实验数据都表明，应训练更小的模型并运行更多 epoch，这与假定 Chinchilla 缩放定律~\cite{hoffmann2022training} 在重复数据下依然成立所作的预测相反（\autoref{sec:fixu}）。" />
</template>
