<!-- Scaling Curves on the OSCAR Corpus -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:arch" appendix en="Scaling Curves on the OSCAR Corpus" zh="OSCAR 语料库上的缩放曲线" />

<Para>
  <En>To ensure our findings are not dataset-dependent, we train models with the same configurations from \autoref{fig:validation} on the OSCAR corpus~\cite{ortiz-suarez-etal-2020-monolingual}. OSCAR is considered noisier than C4~\cite{raffel2020exploring} due to its less stringent duplication. Figures~\ref{fig:validationoscar},\ref{fig:trainingoscar} depict the validation and training loss of these models. We find the trend to be the same as for models trained on C4: While models with fewer repeats have better loss, differences for a few repeats are insignificant.</En>
  <Zh>为确保我们的发现不依赖于特定数据集，我们在 OSCAR 语料库~\cite{ortiz-suarez-etal-2020-monolingual} 上以 \autoref{fig:validation} 中相同的配置训练模型。由于去重不如 C4~\cite{raffel2020exploring} 严格，OSCAR 被认为比 C4 含噪更多。图~\ref{fig:validationoscar}、\ref{fig:trainingoscar} 展示了这些模型的验证损失与训练损失。我们发现其趋势与在 C4 上训练的模型相同：虽然重复次数更少的模型损失更低，但少数几次重复之间的差异并不显著。</Zh>
</Para>

<Figure src="figures/2305.16264/validation_oscar.svg" :width="100" label="fig:validationoscar" caption-en="\textbf{Validation loss during training for models trained on OSCAR.} Models trained on tokens that are repeated for multiple epochs have consistently worse loss." />

<Figure src="figures/2305.16264/training_oscar.svg" :width="100" label="fig:trainingoscar" caption-en="\textbf{Training loss for models trained on OSCAR smoothed with exponential moving average smoothing and a weight of 0.999.} Models trained on fewer unique tokens (more epochs) have better training loss as they overfit." />
</template>
