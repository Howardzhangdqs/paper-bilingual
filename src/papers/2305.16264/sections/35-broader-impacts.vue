<!-- Broader Impacts -->
<script setup lang="ts">
import { Heading, Para, En, Zh } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:broad" appendix en="Broader Impacts" zh="更广泛的影响" />

<Para>
  <En>Large language models carry potential risks such as outputting offensive language, propagating social biases, and leaking private information \cite{weidinger2021ethical,bender2021dangers}. By publicly releasing all of our models and providing new insights to improve the scaling of LLMs we may contribute to the further proliferation of these harms. However, we note that there are already much larger and more capable models freely available~\cite{black2021gpt,black2022gpt,scao2022bloom,biderman2023pythia} that can be used in such harmful ways. Thus, we consider the open-source release of our models and research to significantly outweigh its downsides.</En>
  <Zh>大语言模型存在潜在风险，例如输出冒犯性言论、传播社会偏见和泄露隐私信息~\cite{weidinger2021ethical,bender2021dangers}。公开发布我们的全部模型并为改进 LLM 扩展提供新见解，可能助长这些危害的进一步扩散。但我们指出，目前已有规模更大、能力更强的模型可自由获取~\cite{black2021gpt,black2022gpt,scao2022bloom,biderman2023pythia}，它们同样可能被用于此类有害用途。因此，我们认为开源发布我们的模型与研究，其益处远大于弊端。</Zh>
</Para>
</template>
