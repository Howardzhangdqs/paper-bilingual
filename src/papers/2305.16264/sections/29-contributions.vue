<!-- Contributions -->
<script setup lang="ts">
import { Heading, Para, En, Zh } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix en="Contributions" zh="贡献" />

<Para>
  <En>\textbf{Niklas Muennighoff} led experiments, analysis, writing, and the overall project. He implemented, trained and evaluated all models. \textbf{Alexander M. Rush} contributed to framing, results analysis, and paper writing. \textbf{Boaz Barak} contributed to formal and experimental analysis as well as paper writing. \textbf{Teven Le Scao} provided guidance, led data choices and preprocessing, and contributed to framing and writing. \textbf{Aleksandra Piktus} created perplexity and deduplication datasets and contributed to writing. \textbf{Nouamane Tazi} contributed to enabling high-performance training on AMD hardware. \textbf{Sampo Pyysalo} contributed to enabling high-performance training and early repetition experiments. \textbf{Thomas Wolf} provided guidance on experimental design and contributed to paper writing. \textbf{Colin Raffel} provided guidance on experimental design and contributed to paper writing.</En>
  <Zh>\textbf{Niklas Muennighoff} 主持了实验、分析、写作以及整个项目，实现、训练并评估了所有模型。\textbf{Alexander M. Rush} 参与了选题定位、结果分析与论文写作。\textbf{Boaz Barak} 参与了理论与实验分析以及论文写作。\textbf{Teven Le Scao} 提供指导，负责数据选择与预处理，并参与选题定位与写作。\textbf{Aleksandra Piktus} 制作了困惑度与去重数据集并参与写作。\textbf{Nouamane Tazi} 为在 AMD 硬件上实现高性能训练做出了贡献。\textbf{Sampo Pyysalo} 为高性能训练与早期重复实验做出了贡献。\textbf{Thomas Wolf} 对实验设计提供指导并参与论文写作。\textbf{Colin Raffel} 对实验设计提供指导并参与论文写作。</Zh>
</Para>
</template>
