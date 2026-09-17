<!-- Double Descent -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:filtering" appendix en="Double Descent" zh="双下降" />

<Para>
  <En>Prior work has reported double descent phenomena when repeating data, where the loss initially increases and then decreases again as the model is trained for more epochs~\cite{nakkiran2021deep,hernandez2022scaling}. In \autoref{fig:dd}, we plot the loss curves of several models trained for varying epochs on 100 million tokens. We find double descent phenomena with the loss of all models increasing at 200 epochs before decreasing again. This contributes to additional noise in the fitting of our functions in \autoref{sec:scalinglaws}, as our functional form assumes loss to be monotonically decreasing as epochs increase. Thus, we remove most such examples from the fitting.</En>
  <Zh>已有工作报告过重复数据时的双下降现象：随着模型训练更多 epoch，损失先升后降~\cite{nakkiran2021deep,hernandez2022scaling}。在 \autoref{fig:dd} 中，我们绘制了多个模型在 1 亿词元上以不同 epoch 数训练的损失曲线。我们观察到双下降现象：所有模型的损失在 200 epoch 处上升，随后再次下降。由于我们的函数形式假设损失随 epoch 增加而单调下降，这给 \autoref{sec:scalinglaws} 中的函数拟合带来了额外噪声。因此，我们从拟合中移除了大多数此类样本。</Zh>
</Para>

<Figure src="figures/2305.16264/dd.svg" :width="100" label="fig:dd" caption-en="\textbf{Double descent.} Each dot is a model trained on 100 million unique tokens. Loss initially increases at 200 epochs and then decreases again; this is known as epoch-wise double descent~\cite{nakkiran2021deep}." caption-zh="\textbf{双下降。}每个点是一个在 1 亿唯一词元上训练的模型。损失在 200 epoch 处先上升后再次下降；这就是所谓的按 epoch 双下降~\cite{nakkiran2021deep}。" />
</template>
