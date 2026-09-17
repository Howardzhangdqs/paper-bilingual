<!-- Training Loss -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:trainlossc4" appendix en="Training Loss" zh="训练损失" />

<Para>
  <En>\citet{hoffmann2022training} use training loss as their core metric. However, when repeating data for multiple epochs, training loss is a bad metric as models will overfit to the limited data available as shown in \autoref{fig:trainingc4}. Thus, we use loss on a held-out test set as our key performance metric.</En>
  <Zh>\citet{hoffmann2022training} 以训练损失作为核心指标。然而，当对数据进行多个 epoch 的重复训练时，训练损失是一个糟糕的指标，因为模型会过拟合到有限的数据上，如 \autoref{fig:trainingc4} 所示。因此，我们使用留出测试集上的损失作为关键性能指标。</Zh>
</Para>

<Figure src="figures/2305.16264/training_c4.svg" :width="100" label="fig:trainingc4" caption-en="\textbf{Training loss smoothed with exponential moving average smoothing and a weight of 0.999.} Models trained on fewer unique tokens (more epochs) have better training loss as they overfit." />
</template>
