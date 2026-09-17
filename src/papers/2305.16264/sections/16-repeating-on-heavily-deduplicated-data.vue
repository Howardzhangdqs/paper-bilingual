<!-- Repeating on Heavily Deduplicated Data -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix en="Repeating on Heavily Deduplicated Data" zh="在深度去重数据上的重复训练" />

<Para>
  <En>To investigate whether \autoref{fig:100misoloss} is dependent on the inherent amount of duplicates in the selected 100 million tokens, we train several models on a deduplicated version of C4 (see \autoref{sec:filtering}). We plot the performance of the models trained on the deduplicated C4 versus the regular C4 in \autoref{fig:dedup}. All models are evaluated on the same validation dataset from the regular C4. Regardless of deduplication we find 59 epochs to be optimal and the overall trend to be very similar. Together with our results on OSCAR~(\autoref{sec:fixoscar}), this suggests that our work generalizes to different datasets with different inherent amounts of duplicates.</En>
  <Zh>为考察 \autoref{fig:100misoloss} 是否依赖于所选 1 亿词元中固有的重复比例，我们在 C4 的去重版本上训练了多个模型（见 \autoref{sec:filtering}）。我们在 \autoref{fig:dedup} 中绘制了在去重 C4 与常规 C4 上训练的模型的性能。所有模型都在来自常规 C4 的同一验证集上评估。无论是否去重，我们均发现 59 个 epoch 最优，整体趋势也非常相似。结合我们在 OSCAR 上的结果（\autoref{sec:fixoscar}），这表明我们的工作可以推广到固有重复比例不同的数据集。</Zh>
</Para>

<Figure src="figures/2305.16264/dedup.svg" :width="100" label="fig:dedup" caption-en="\textbf{Optimal loss on deduplicated data.} 146 million parameter models trained on 100 million unique tokens that are either directly from C4 or undergo additional deduplication. Each dot is a single model. While deduplication results in a higher test loss, the optimal number of epochs remains the same whether or not deduplication is performed (see also \autoref{fig:100misoloss})." caption-zh="\textbf{去重数据上的最优损失。}1.46 亿参数的模型在 1 亿唯一词元上训练，词元或直接来自 C4，或经过额外去重。每个点对应单个模型。虽然去重导致更高的测试损失，但无论是否去重，最优 epoch 数都保持不变（另见 \autoref{fig:100misoloss}）。" />
</template>
