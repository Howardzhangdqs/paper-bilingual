<!-- Filtering Procedure -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure, Table, Td, Bullets, Item } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:broad" appendix en="Filtering Procedure" zh="过滤流程" />

<Para>
  <En>Perplexity filtering} We follow the approach of~\cite{laurencconbigscience} to perform perplexity filtering and reuse their artifacts - a SentencePiece tokenizer~\cite{kudo-richardson-2018-sentencepiece} and a KenLM 5-gram language model~\cite{heafield-2011-kenlm} trained on Wikipedia introductions and available to download from their repository.\footnote{\url{https://github.com/bigscience-workshop/data-preparation/tree/main/preprocessing/training/01b_oscar_cleaning_and_filtering&#125;&#125; We compute the model's perplexity on all OSCAR and C4 samples and only select samples that fall within a certain percentile threshold. For example, to select the top 25\%, we only select samples with perplexity lower than the 25th percentile. \autoref{fig:perplexity_hist} provides a visual representation of perplexity distribution for respective datasets, highlighting the relevant percentile thresholds.</En>
  <Zh>困惑度过滤}我们遵循~\cite{laurencconbigscience} 的方法进行困惑度过滤，并复用其产物——一个 SentencePiece 分词器~\cite{kudo-richardson-2018-sentencepiece} 和一个在维基百科引言部分上训练的 KenLM 5-gram 语言模型~\cite{heafield-2011-kenlm}，二者可从其代码库下载。\footnote{\url{https://github.com/bigscience-workshop/data-preparation/tree/main/preprocessing/training/01b_oscar_cleaning_and_filtering&#125;&#125;我们计算模型在所有 OSCAR 与 C4 样本上的困惑度，只选择处于特定分位阈值内的样本。例如，要选择前 25\%，我们只选择困惑度低于第 25 百分位的样本。\autoref{fig:perplexity_hist} 直观展示了各数据集的困惑度分布，并标出了相关分位阈值。</Zh>
</Para>

<Para>
  <En>} Deduplication} We perform deduplication leveraging the suffix array-based approach proposed by \citet{deduplicatinglee2021}. We remove any document with at least a 100-character span overlapping with any other document in the corpus. We deduplicate the full C4 dataset. In the case of OSCAR, the memory requirements of the deduplication procedure make performing the full dataset deduplication infeasible. Instead, we select a 25\% subset of the full OSCAR and build a suffix array for this subset. We experiment with leveraging the 25\% OSCAR suffix array in two ways. First, we deduplicate the selected subset. This is very strict and preserves less than 5\% of the full OSCAR. Subsequently, we use the 25\% suffix array to deduplicate the full OSCAR, i.e. we remove any document which has at least a 100-character span overlapping with the 25\% subset we selected. This is more permissive and allows us to preserve 31\% of the original dataset. We refer to the latter as \emph{expanded} in \autoref{tab:filt} and it is used for the training of the 4.2 billion parameter model in \autoref{tab:dedup}, while the smaller deduplicated version of OSCAR is used for the 2.8 billion parameter model.</En>
  <Zh>去重}我们利用 \citet{deduplicatinglee2021} 提出的基于后缀数组的方法进行去重：移除任何与语料库中其他文档存在至少 100 字符重叠片段的文档。我们对完整的 C4 数据集做了去重。而对 OSCAR，去重流程的内存需求使得对全量数据去重不可行。因此，我们从完整 OSCAR 中选取 25\% 子集并为该子集构建后缀数组，然后以两种方式实验利用它。其一，对该选中子集做去重——这非常严格，只保留了完整 OSCAR 的不到 5\%。其二，用这 25\% 的后缀数组对完整 OSCAR 做去重，即移除任何与所选 25\% 子集存在至少 100 字符重叠片段的文档——这更为宽松，保留了原数据集的 31\%。后者在 \autoref{tab:filt} 中记为 \emph{expanded}，用于训练 \autoref{tab:dedup} 中的 42 亿参数模型；较小的去重版 OSCAR 则用于 28 亿参数模型。</Zh>
</Para>

<Para>
  <En>ROOTS filter} In addition, we benchmark with the filtering procedure from the ROOTS corpus~\cite{laurencconbigscience}. It applies the following set of filters:</En>
  <Zh>ROOTS 过滤器}此外，我们以 ROOTS 语料库~\cite{laurencconbigscience} 的过滤流程作为基准，它应用以下一组过滤器：</Zh>
</Para>

<Bullets>
  <Item>
    <En>Discarding documents with too few words</En>
    <Zh>丢弃词数过少的文档。</Zh>
  </Item>
  <Item>
    <En>Discarding documents with overly repeated character- and word-n-grams</En>
    <Zh>丢弃字符级与词级 n-gram 过度重复的文档。</Zh>
  </Item>
  <Item>
    <En>Discarding documents with too many special characters</En>
    <Zh>丢弃特殊字符过多的文档。</Zh>
  </Item>
  <Item>
    <En>Discarding documents with too few grammatical function words (e.g. ``of'', ``and'')</En>
    <Zh>丢弃语法功能词（如“of”“and”）过少的文档。</Zh>
  </Item>
  <Item>
    <En>Discarding documents with too many flagged words</En>
    <Zh>丢弃被标记词过多的文档。</Zh>
  </Item>
  <Item>
    <En>Discarding documents with a low \texttt{fasttext} language identification score</En>
    <Zh>丢弃 \texttt{fasttext} 语言识别得分低的文档。</Zh>
  </Item>
  <Item>
    <En>Perplexity filtering</En>
    <Zh>困惑度过滤。</Zh>
  </Item>
</Bullets>

<Figure src="figures/2305.16264/perplexity_histogram.svg" :width="100" label="fig:perplexity_hist" caption-en="Perplexity histograms for respective datasets. For demonstration purposes, we use 100,000 random samples of each dataset." caption-zh="各数据集的困惑度直方图。为便于演示，每个数据集使用 10 万个随机样本。" />

<Table label="tab:filt" caption-en="\textbf{Sizes of filtered datasets.}" caption-zh="\textbf{过滤后数据集的规模。}">
  <tr>
    <Td align="left">Base Dataset</Td>
    <Td align="right">Filter</Td>
    <Td align="center">Tokens after filtering</Td>
  </tr>
  <tr>
    <Td align="left">C4</Td>
    <Td align="right">Deduplication</Td>
    <Td align="center">21 billion</Td>
  </tr>
  <tr>
    <Td align="left">C4</Td>
    <Td align="right">Perplexity Top 25\%</Td>
    <Td align="center">44 billion</Td>
  </tr>
  <tr>
    <Td align="left">C4</Td>
    <Td align="right">Perplexity Top 50\%</Td>
    <Td align="center">89 billion</Td>
  </tr>
  <tr>
    <Td align="left">C4</Td>
    <Td align="right">Perplexity 25-75\%</Td>
    <Td align="center">89 billion</Td>
  </tr>
  <tr>
    <Td align="left">OSCAR</Td>
    <Td align="right">Deduplication</Td>
    <Td align="center">9 billion</Td>
  </tr>
  <tr>
    <Td align="left">OSCAR</Td>
    <Td align="right">Deduplication-expanded</Td>
    <Td align="center">94 billion</Td>
  </tr>
  <tr>
    <Td align="left">OSCAR</Td>
    <Td align="right">Perplexity Top 25\%</Td>
    <Td align="center">80 billion</Td>
  </tr>
  <tr>
    <Td align="left">OSCAR</Td>
    <Td align="right">ROOTS</Td>
    <Td align="center">99 billion</Td>
  </tr>
</Table>
</template>
