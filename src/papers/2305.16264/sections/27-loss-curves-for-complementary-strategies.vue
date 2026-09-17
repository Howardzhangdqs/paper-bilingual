<!-- Loss Curves for Complementary Strategies -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:losscomp" appendix en="Loss Curves for Complementary Strategies" zh="互补策略的损失曲线" />

<Figure src="figures/2305.16264/validation_c4py.svg" :width="100" label="fig:valc4py" caption-en="\textbf{Validation loss of models trained on a mix of natural language (C4) and Python data.}" caption-zh="\textbf{在自然语言（C4）与 Python 数据混合上训练的模型的验证损失。}" />

<Figure src="figures/2305.16264/training_validation_filter.svg" :width="100" label="fig:beyondloss" caption-en="\textbf{Validation and training loss of models trained with different data strategies.} Training loss is smoothed with exponential moving average smoothing and a weight of 0.999. Downstream performance of the models is in \autoref{fig:beyond}." caption-zh="\textbf{不同数据策略训练的模型的验证损失与训练损失。}训练损失经权重 0.999 的指数移动平均平滑。模型的下游性能见 \autoref{fig:beyond}。" />

<Para>
  <En>To compare complementary data strategies in \autoref{sec:beyond}, we have used downstream performance on natural language tasks detailed in \autoref{sec:eval} instead of loss. This is because validation loss gives an unfair advantage to models trained on a larger fraction of data from the same distribution. For example, when making up for missing natural language data with code, models that are trained on more code will have better validation loss on code data while having worse loss on the natural language data as seen in \autoref{fig:valc4py}: The model pre-trained on 90\% of Python code data and 10\% of C4 has the highest C4 validation loss, but the lowest Python validation loss.</En>
  <Zh>为在 \autoref{sec:beyond} 中比较互补的数据策略，我们使用 \autoref{sec:eval} 详述的自然语言任务下游性能而非损失进行比较。这是因为验证损失会让在更大比例同分布数据上训练的模型占优。例如，在用代码弥补自然语言数据不足时，训练中代码更多的模型在代码数据上的验证损失更好，但在自然语言数据上的损失更差，如 \autoref{fig:valc4py} 所示：在 90\% Python 代码数据与 10\% C4 上预训练的模型，C4 验证损失最高，而 Python 验证损失最低。</Zh>
</Para>

<Para>
  <En>Models trained on deduplicated or perplexity-filtered data have higher validation loss as the held-out validation data has not gone through the same filtering steps. Thus, its distribution more closely resembles the training data of models trained on the unfiltered data resulting in worse validation loss for the two filtering strategies in \autoref{fig:beyondloss} (left). Meanwhile, for training loss in \autoref{fig:beyondloss} (right) the model trained on perplexity-filtered data has the lowest loss. Its training data has been filtered to the top 25\% of examples with the lowest perplexity (\autoref{sec:filtering}) thus high loss examples have been explicitly filtered out from the training data resulting in low training loss. The model trained on deduplicated data has the highest validation and training loss. This is because commonly repeated sequences have been filtered out from its training data. Thus, when encountering these common sequences in the unfiltered validation set, its loss is comparatively high as other models have likely simply memorized them. Similarly, fewer repeated sequences during training results in higher training loss as unseen sequences are harder to predict.</En>
  <Zh>在去重或困惑度过滤后的数据上训练的模型验证损失更高，因为留出验证数据并未经过同样的过滤步骤。因此其分布更接近未过滤数据训练的模型的训练数据分布，导致 \autoref{fig:beyondloss}（左）中两种过滤策略的验证损失更差。另一方面，对 \autoref{fig:beyondloss}（右）中的训练损失而言，困惑度过滤数据上训练的模型损失最低。其训练数据已过滤为困惑度最低的前 25\% 样本（\autoref{sec:filtering}），高损失样本被显式地从训练数据中剔除，因而训练损失很低。去重数据上训练的模型的验证损失与训练损失都最高。这是因为常见的重复序列已从其训练数据中滤除，当在未过滤验证集中遇到这些常见序列时，其损失相对较高——其他模型很可能只是记住了它们。类似地，训练中重复序列较少也会导致训练损失更高，因为未见过的序列更难预测。</Zh>
</Para>
</template>
