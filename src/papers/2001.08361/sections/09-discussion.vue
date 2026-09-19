<!-- Discussion -->
<script setup lang="ts">
import { Heading, Para, En, Zh } from '../../../components/paper'
</script>

<template>
<Heading :level="1" en="Discussion" zh="讨论" />

<Para>
  <En>We have observed consistent scalings of language model log-likelihood loss with non-embedding parameter count $N$, dataset size $D$, and optimized training computation $C_{\rm min}$, as encapsulated in Equations \eqref{eq:FundamentalLikelihioodvsModelandDataSize} and \eqref{eq:FundamentalLikelihioodvsModelandSteps}. Conversely, we find very weak dependence on many architectural and optimization hyperparameters. Since scalings with $N, D, C_{\rm min}$ are power-laws, there are diminishing returns with increasing scale.</En>
  <Zh>我们观察到语言模型对数似然损失与非嵌入参数量 $N$、数据集规模 $D$ 以及优化后的训练计算量 $C_{\rm min}$ 之间一致的标度关系，概括于公式 \eqref{eq:FundamentalLikelihioodvsModelandDataSize} 与 \eqref{eq:FundamentalLikelihioodvsModelandSteps} 中。相反，我们发现性能对许多架构与优化超参数的依赖非常弱。由于与 $N, D, C_{\rm min}$ 的标度是幂律，规模增大时收益递减。</Zh>
</Para>

<Para>
  <En>We were able to precisely model the dependence of the loss on $N$ and $D$, and alternatively on $N$ and $S$, when these parameters are varied simultaneously. We used these relations to derive the compute scaling, magnitude of overfitting, early stopping step, and data requirements when training large language models. So our scaling relations go beyond mere observation to provide a predictive framework. One might interpret these relations as analogues of the ideal gas law, which relates the macroscopic properties of a gas in a universal way, independent of most of the details of its microscopic consituents.</En>
  <Zh>当这些参数同时变化时，我们能够精确建模损失对 $N$ 与 $D$（或者对 $N$ 与 $S$）的依赖。我们利用这些关系推导了训练大型语言模型时的算力标度、过拟合幅度、早停步数与数据需求。因此，我们的标度关系超越了单纯的观察，提供了一个预测性框架。人们可以把这些关系类比为理想气体定律——后者以普适的方式关联气体的宏观性质，而不依赖于其微观组分的大多数细节。</Zh>
</Para>

<Para>
  <En>It is natural to conjecture that the scaling relations will apply to other generative modeling tasks with a maximum likelihood loss, and perhaps in other settings as well. To this purpose, it will be interesting to test these relations on other domains, such as images, audio, and video models, and perhaps also for random network distillation. At this point we do not know which of our results depend on the structure of natural language data, and which are universal. It would also be exciting to find a theoretical framework from which the scaling relations can be derived: a `statistical mechanics' underlying the `thermodynamics' we have observed. Such a theory might make it possible to derive other more precise predictions, and provide a systematic understanding of the limitations of the scaling laws.</En>
  <Zh>一个自然的猜想是，这些标度关系将适用于其他以最大似然损失为目标的生成建模任务，或许也适用于其他场景。为此，在其他领域（如图像、音频与视频模型，或许还有随机网络蒸馏）上检验这些关系将很有意思。目前我们还不知道哪些结果依赖于自然语言数据的结构，哪些是普适的。找到一个能从中推导出这些标度关系的理论框架也将令人振奋：即我们所观察到的“热力学”背后的“统计力学”。这样的理论或许使我们能够推导出其他更精确的预测，并系统地理解缩放律的局限。</Zh>
</Para>

<Para>
  <En>In the domain of natural language, it will be important to investigate whether continued improvement on the loss translates into improvement on relevant language tasks. Smooth quantitative change can mask major qualitative improvements: ``more is different''. For example, the smooth aggregate growth of the economy provides no indication of the specific technological developments that underwrite it. Similarly, the smooth improvements in language model loss may hide seemingly qualitative changes in capability.</En>
  <Zh>在自然语言领域，考察损失的持续改善能否转化为相关语言任务上的改进将十分重要。平滑的量变可能掩盖重大的质变：“more is different（多者异也）”。例如，经济总量的平稳增长并不能揭示支撑它的具体技术进步。类似地，语言模型损失的平滑改善可能隐藏着能力上看似质变的变化。</Zh>
</Para>

<Para>
  <En>Our results strongly suggest that larger models will continue to perform better, and will also be much more sample efficient than has been previously appreciated. Big models may be more important than big data. In this context, further investigation into model parallelism is warranted. Deep models can be trained using pipelining \cite{DBLP:journals/corr/abs-1811-06965}, which splits parameters depth-wise between devices, but eventually requires increased batch sizes as more devices are used. Wide networks on the other hand are more amenable to parallelization \cite{shazeer2018meshtensorflow}, since large layers can be split between multiple workers with less serial dependency. Sparsity \cite{DBLP:journals/corr/abs-1904-10509,gray2017gpu} or branching (e.g. \cite{Krizhevsky:2012:ICD:2999134.2999257}) may allow for even faster training of large networks through increased model parallelism. And using methods like \cite{Wang_2017,wen2019autogrow}, which grow networks as they train, it might be possible to remain on the compute-efficient frontier for an entire training run.</En>
  <Zh>我们的结果强烈表明，更大的模型将持续表现更好，且样本效率也远超以往的认识。大模型可能比大数据更重要。在此背景下，对模型并行的进一步研究是值得的。深模型可以用流水线（pipelining）\cite{DBLP:journals/corr/abs-1811-06965} 训练，即把参数按深度拆分到各设备上，但随着设备增多最终需要增大批量。宽网络则更易于并行化 \cite{shazeer2018meshtensorflow}，因为大的层可以在多个 worker 之间拆分、串行依赖较少。稀疏化 \cite{DBLP:journals/corr/abs-1904-10509,gray2017gpu} 或分支（如 \cite{Krizhevsky:2012:ICD:2999134.2999257}）或可通过增强模型并行让大型网络训练得更快。而利用 \cite{Wang_2017,wen2019autogrow} 这类在训练过程中生长网络的方法，或许可以在整个训练过程中始终保持在算力高效前沿上。</Zh>
</Para>
</template>
