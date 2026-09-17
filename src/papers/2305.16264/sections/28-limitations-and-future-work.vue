<!-- Limitations and Future Work -->
<script setup lang="ts">
import { Heading, Para, En, Zh } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix en="Limitations and Future Work" zh="局限与未来工作" />

<Para>
  <En>Repeating fractions of the data} In this work we focus on repeating the entire unique dataset for several epochs. Alternatively, one can repeat only a fraction of the dataset. For example, repeating 10\% of the dataset for 10 epochs while repeating the rest only for a single epoch as done by \citet{hernandez2022scaling}. To predict loss in that scenario, one may need to adapt our scaling laws with an additional parameter to account for the fraction that is repeated and possibly a parameter that captures at what point in training the data is repeated. Repeating earlier in training when most model weights are still randomly initialized is likely to cause less damage than later in training. Adapting our parametric fit to make concrete scaling predictions for such scenarios is an exciting future research direction.</En>
  <Zh>重复部分数据}本文关注把整个唯一数据集重复若干个 epoch。也可以只重复数据集的一部分，例如像 \citet{hernandez2022scaling} 那样把 10\% 的数据重复 10 个 epoch，其余只重复 1 个 epoch。要在这种情形下预测损失，可能需要为缩放定律增加一个参数来刻画被重复的比例，甚至再增加一个参数刻画重复发生在训练的哪个阶段。在训练早期（多数模型权重仍是随机初始化时）进行重复，可能比训练后期造成的损害更小。调整我们的参数化拟合以对这类场景做出具体的缩放预测，是一个值得期待的未来研究方向。</Zh>
</Para>

<Para>
  <En>Sensitivity to hyperparameters} The returns from additional epochs may heavily depend on hyperparameters such as learning rate, dropout, or the optimizer choice. It is likely that increasing the learning rate, for example, would lead to diminishing returns from additional epochs kicking in earlier. In this work, we have fixed most hyperparameters to commonly used values for the training of LLMs and leave such explorations to future work.</En>
  <Zh>对超参数的敏感性}额外 epoch 带来的回报可能在很大程度上取决于学习率、丢弃率或优化器选择等超参数。例如，提高学习率很可能使额外 epoch 的回报递减更早出现。本文把多数超参数固定为训练 LLM 的常用值，此类探索留待未来工作。</Zh>
</Para>

<Para>
  <En>Other datasets} The optimal data strategy is dependent on the dataset at hand and we cannot give universally applicable filtering recommendations. By looking into C4 and OSCAR, we have covered two of the most commonly used English text datasets. Our findings on both datasets were overall in agreement with each other. We have highlighted some of the differences, such as deduplication being more effective on OSCAR due to it being more noisy than C4. Further, we have focused on large-scale pre-training datasets. There is a lot of research on the optimal fine-tuning dataset and methodology for LLMs~\cite{sanh2022multitask,longpre2023flan,yong2022bloom+,ouyang2022training,wei2021finetuned,min2021metaicl,wang2022self,zhou2023lima,wang2023far,gupta2023instruction,xu2023wizardlm,muennighoff2023octopack,longpre2023data}. More investigations of resolving data-constraints when fine-tuning LLMs may be of interest for future work.</En>
  <Zh>其他数据集}最优数据策略取决于手头的数据集，我们无法给出普遍适用的过滤建议。通过研究 C4 与 OSCAR，我们覆盖了两个最常用的英文文本数据集，且在两者上的发现总体一致。我们也指出了若干差异，例如去重在 OSCAR 上更有效，因为它比 C4 更含噪。此外，我们关注的是大规模预训练数据集；关于 LLM 最优微调数据集与方法已有大量研究~\cite{sanh2022multitask,longpre2023flan,yong2022bloom+,ouyang2022training,wei2021finetuned,min2021metaicl,wang2022self,zhou2023lima,wang2023far,gupta2023instruction,xu2023wizardlm,muennighoff2023octopack,longpre2023data}。未来工作可进一步研究微调 LLM 时如何解决数据受限问题。</Zh>
</Para>

<Para>
  <En>Other modalities or architectures} Our work focuses on text datasets and uses the GPT transformer architecture~\cite{radford2019language}. Prior work has experimented with many variations to the GPT or transformer architecture~\cite{dehghani2018universal,tay2022scaling,scao2022language}, as well as scaling laws for non-text datasets~\cite{aghajanyan2023scaling}. Overall, variations of the GPT or transformer architecture have proven very robust and generalizable to other domains~\cite{huang2018music,chen2020generative,muennighoff2020vilio,madani2020progen,muennighoff2022sgpt,tay2022scaling,dehghani2023scaling}. Nonetheless, it may be of interest for future work to test the applicability of our findings in this work to different data modalities or model architectures.</En>
  <Zh>其他模态或架构}本文聚焦文本数据集，采用 GPT transformer 架构~\cite{radford2019language}。已有工作尝试过 GPT/transformer 架构的许多变体~\cite{dehghani2018universal,tay2022scaling,scao2022language}，也研究过非文本数据集的缩放定律~\cite{aghajanyan2023scaling}。总体而言，GPT/transformer 架构的各变体已被证明非常稳健，并能泛化到其他领域~\cite{huang2018music,chen2020generative,muennighoff2020vilio,madani2020progen,muennighoff2022sgpt,tay2022scaling,dehghani2023scaling}。尽管如此，检验本文结论对不同数据模态或模型架构的适用性仍是未来工作中有意思的方向。</Zh>
</Para>

<Para>
  <En>Other strategies} There are numerous strategies to solve data constraints not covered in this work that are worth exploring. Like we have shown for Python, future research may consider to what extent augmenting with a natural language (e.g. Chinese) improves performance in another language (e.g. English) and what is the best language to choose~\cite{lin2019choosing,xia2021metaxl}. Similarly, while we have looked at deduplication and perplexity filtering, other filtering strategies, such as popularity-based filters~\cite{allal2023santacoder,zhao2023survey} and toxicity filters~\cite{gehman2020realtoxicityprompts,henderson2022pile,longpre2023pretrainers,prabhumoye2023adding,penedo2023refinedweb} are worth exploring.</En>
  <Zh>其他策略}还有许多本文未涉及的解决数据约束的策略值得探索。正如我们对 Python 所展示的，未来研究可以考察用一种自然语言（如中文）增广能在多大程度上提升另一种语言（如英文）的性能，以及如何选择最佳语言~\cite{lin2019choosing,xia2021metaxl}。类似地，除了我们考察过的去重与困惑度过滤，其他过滤策略如基于流行度的过滤器~\cite{allal2023santacoder,zhao2023survey} 与毒性过滤器~\cite{gehman2020realtoxicityprompts,henderson2022pile,longpre2023pretrainers,prabhumoye2023adding,penedo2023refinedweb} 也值得探索。</Zh>
</Para>
</template>
