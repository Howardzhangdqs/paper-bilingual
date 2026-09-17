<!-- Validation Loss by Epoch -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:addvalloss" appendix en="Validation Loss by Epoch" zh="按 epoch 展示的验证损失" />

<Figure src="figures/2305.16264/validation_epochs_c4oscar.svg" :width="100" label="fig:vallossepochs" caption-en="\textbf{Validation loss during training visualized by epochs.} Loss progresses smoothly throughout training. There are temporary spikes for 8.7 billion parameter models, commonly at the start of a new epoch." caption-zh="\textbf{按 epoch 展示的训练过程中的验证损失。}损失在整个训练过程中平滑推进。87 亿参数的模型会出现临时尖峰，通常出现在新 epoch 的开始处。" />

<Para>
  <En>\citet{taylor2022galactica} decided to early-stop pre-training of the Galactica models due to a small increase in validation loss at the start of the fifth epoch. In \autoref{fig:vallossepochs} we plot the validation loss curves of our isoFLOP models as a function of epochs. We do find small increases in validation loss when models enter a new epoch. For example, upon entering the third and fourth epoch, the 7-epoch 8.7 billion parameter OSCAR model shows loss spikes. However, these are temporary and loss continues to go down smoothly thereafter. Thus, we hypothesize that the Galactica models could have attained better performance by continuing pre-training beyond the loss spike experienced at the beginning of the fifth epoch.</En>
  <Zh>\citet{taylor2022galactica} 由于第五个 epoch 开始时验证损失小幅上升，决定对 Galactica 模型的预训练进行早停。在 \autoref{fig:vallossepochs} 中，我们绘制了 isoFLOP 模型的验证损失曲线随 epoch 的变化。我们确实发现模型进入新 epoch 时验证损失会小幅上升。例如，7-epoch 的 87 亿参数 OSCAR 模型在进入第三与第四个 epoch 时出现损失尖峰。但这些都是临时的，此后损失继续平稳下降。因此我们推测，如果 Galactica 模型在经历第五个 epoch 开始时的损失尖峰后继续预训练，本可以取得更好的性能。</Zh>
</Para>
</template>
