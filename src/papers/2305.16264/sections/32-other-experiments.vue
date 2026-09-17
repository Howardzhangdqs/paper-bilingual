<!-- Other Experiments -->
<script setup lang="ts">
import { Heading, Para, En, Zh } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix en="Other Experiments" zh="其他实验" />

<Para>
  <En>UL2} We experimented with the UL2 objective~\cite{tay2022unifying,tay2022transcending} for a causal model but did not find it to outperform regular causal language modeling on our evaluation tasks. This may stem from UL2 being better suited as an Encoder-Decoder model or from mistakes in our UL2 implementation.</En>
  <Zh>UL2}我们针对因果模型实验了 UL2 目标~\cite{tay2022unifying,tay2022transcending}，但在我们的评估任务上并未发现它优于常规的因果语言建模。这可能是因为 UL2 更适合作为编码器-解码器模型，也可能是我们的 UL2 实现有误。</Zh>
</Para>

<Para>
  <En>The Pile} We have also trained several models on The Pile~\cite{gao2020pile} and found similar trends as for OSCAR and C4. We make these models publicly available.</En>
  <Zh>The Pile}我们还在 The Pile~\cite{gao2020pile} 上训练了若干模型，观察到与 OSCAR 和 C4 类似的趋势。这些模型已公开。</Zh>
</Para>
</template>
