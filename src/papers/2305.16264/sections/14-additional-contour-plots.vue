<!-- Additional Contour Plots -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:addcon" appendix en="Additional Contour Plots" zh="更多等值线图" />

<Para>
  <En>\autoref{fig:400m1b5isoloss} contains additional empirical isoLoss contours for 400 million and 1.5 billion unique tokens. Results show that like in \autoref{fig:100misoloss} significantly lower loss can be achieved by increasing parameters and epochs beyond what is compute-optimal at a single epoch. The lowest loss is also achieved by allocating more extra compute to repeating data rather than to adding parameters.</En>
  <Zh>\autoref{fig:400m1b5isoloss} 展示了 4 亿与 15 亿唯一词元的更多实测等损失等值线。结果表明，与 \autoref{fig:100misoloss} 一样，把参数量与 epoch 数提高到超出单 epoch 计算最优值，可以显著降低损失。同样，把更多额外计算分配给重复数据而非增加参数，可以获得最低损失。</Zh>
</Para>

<Figure src="figures/2305.16264/isoloss_400m1b5.svg" :width="100" label="fig:400m1b5isoloss" caption-en="\textbf{Empirical isoLoss curves for 400 million and 1.5 billion unique tokens.} 34 models trained on 400 million unique tokens and 37 models trained on 1.5 billion unique tokens with varying parameters and epochs." caption-zh="\textbf{4 亿与 15 亿唯一词元的实测等损失曲线。}34 个模型在 4 亿唯一词元上训练，37 个模型在 15 亿唯一词元上训练，参数量与 epoch 数各不相同。" />
</template>
