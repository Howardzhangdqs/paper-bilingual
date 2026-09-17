<!-- Hyperparameters and Setup -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Table, Td } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix en="Hyperparameters and Setup" zh="超参数与设置" />

<Para>
  <En>For all training runs we use 1\% of tokens for linear warm-up of the learning rate to a maximum learning rate of 2e-4 that is decayed to 2e-5 following a cosine schedule. We use a batch size of 256 for models with fewer than 2 billion parameters, 512 for models with 2 - 5 billion parameters and 1024 for models with more than 5 billion parameters. All models are trained in bfloat16 precision using the Adam optimizer~\cite{kingma2014adam} with $eps=1e-8$, $beta1=0.9$. For $beta2$, we found a value of $0.95$ to result in slightly lower final loss and fewer loss spikes than the default value of $0.999$ in implementations such as PyTorch. However, except for models with FLOP budgets of $C=9.3 \times 10^{20}$ and $2.1 \times 10^{21}$, we always use $beta2=0.999$. We use a dropout rate of $0.1$, a weight decay rate of $0.1$ and clip gradients at $1.0$. These hyperparameter choices are largely based on prior work~\cite{hoffmann2022training,touvron2023llama} and performance on test runs. As none of our hyperparameter choices is particularly exotic, we expect our setup to generalize to many other setups. In \autoref{tab:all_models} we list the model architectures we use. They are an extended version of the architectures from \cite{hoffmann2022training}. We calculate model parameters following~\cite{narayanan2021efficient}, which includes embedding parameters:</En>
  <Zh>在所有训练运行中，我们用 1\% 的词元对学习率做线性预热，最大学习率为 2e-4，随后按余弦调度衰减至 2e-5。对参数量少于 20 亿的模型，batch size 取 256；20 亿至 50 亿参数的模型取 512；超过 50 亿参数的模型取 1024。所有模型以 bfloat16 精度、使用 Adam 优化器~\cite{kingma2014adam}（$eps=1e-8$、$beta1=0.9$）训练。对 $beta2$，我们发现取 $0.95$ 比 PyTorch 等实现中的默认值 $0.999$ 能得到略低的最终损失与更少的损失尖峰。不过，除 FLOP 预算为 $C=9.3 \times 10^{20}$ 与 $2.1 \times 10^{21}$ 的模型外，我们一律使用 $beta2=0.999$。丢弃率取 $0.1$，权重衰减率取 $0.1$，梯度裁剪阈值取 $1.0$。这些超参数选择主要基于以往工作~\cite{hoffmann2022training,touvron2023llama} 及测试运行的表现。由于我们的超参数选择并不特别罕见，我们预计该设置可以推广到许多其他场景。\autoref{tab:all_models} 列出了我们使用的模型架构，它们是 \cite{hoffmann2022training} 架构的扩展版本。我们按~\cite{narayanan2021efficient} 计算模型参数量，其中包含嵌入参数：</Zh>
</Para>

<Equation  label="eq:num-params" latex="P = 12lh^2\left(1 + \dfrac{13}{12h}+\dfrac{V+s}{12lh}\right)"
  :tips="{ P: '模型总参数量（含嵌入）', '12lh^2': '主项：正比于层数 × 隐藏维度²（l 为层数，h 为隐藏维度）', h: '隐藏维度', V: '词表大小（本文取 50257）', s: '序列长度（本文取 2048）' }" />

<Para>
  <En>where $P$ is the final parameter count, $l$ are layers, $h$ is the hidden dimension, $V=50257$ the vocabulary size and $s=2048$ the sequence length. We find the parameter counts reported in Chinchilla~\cite{hoffmann2022training} to be significantly different than our calculations, especially at larger scales. Part of this difference comes from their smaller vocabulary size of $V=32000$.  We report both our and the parameter counts of Chinchilla in \autoref{tab:all_models}, but we use our  parameter estimates everywhere in this work. Further, we have corrected the number of heads of the 3,530 and 4,084 million parameter models from~\cite{hoffmann2022training} to obey the relationship $d\_model=kv\_size \cdot n\_heads$.</En>
  <Zh>其中 $P$ 为最终参数量，$l$ 为层数，$h$ 为隐藏维度，$V=50257$ 为词表大小，$s=2048$ 为序列长度。我们发现 Chinchilla~\cite{hoffmann2022training} 报告的参数量与我们的计算结果差异显著，在更大规模下尤其如此。部分差异源于其更小的词表规模 $V=32000$。我们在 \autoref{tab:all_models} 中同时报告我们与 Chinchilla 的参数量，但在本工作中全部采用我们自己的参数估计。此外，我们修正了~\cite{hoffmann2022training} 中 35.3 亿与 40.84 亿参数模型的注意力头数，使其满足关系 $d\_model=kv\_size \cdot n\_heads$。</Zh>
</Para>

<Para>
  <En>To train our models, we have forked the Megatron-DeepSpeed~\cite{rasley2020deepspeed,smith2022using} framework and adapted it for ROCm to enable training on AMD GPUs. We have made our training code publicly available at \url{https://github.com/TurkuNLP/Megatron-DeepSpeed}. Models are trained using data, tensor and pipeline parallelism on up to 256 AMD Instinct MI250X GPUs distributed across up to 64 nodes on the LUMI supercomputer located in Finland. As of June 2023, LUMI is the largest supercomputer in Europe and ranks third worldwide with a performance of around 310 PFLOPs.\footnote{https://www.top500.org/lists/top500/2023/06/} We trained models in parallel using up to 2,200 nodes at a single point in time (equivalent to around 8,800 GPUs or 17,600 GCDs or 86\% of all GPUs on LUMI). We have used a total of around 3 million GPU hours. The cluster is powered 100\% by renewable energy (hydroelectricity) and its waste heat is used for heating the nearby city reducing the city's carbon emissions by up to 20\%. Thanks to the low temperatures in Finland, relatively little cooling for the cluster is required further reducing its impact on the environment. As of June 2023, it ranks as the seventh greenest supercomputer.\footnote{https://www.top500.org/lists/green500/2023/06/}</En>
  <Zh>为训练模型，我们 fork 了 Megatron-DeepSpeed~\cite{rasley2020deepspeed,smith2022using} 框架并适配 ROCm，从而能够在 AMD GPU 上训练。我们的训练代码已在 \url{https://github.com/TurkuNLP/Megatron-DeepSpeed} 公开。模型采用数据并行、张量并行与流水线并行，在位于芬兰的 LUMI 超级计算机上至多 64 个节点的 256 张 AMD Instinct MI250X GPU 上训练。截至 2023 年 6 月，LUMI 是欧洲最大的超级计算机，算力约 310 PFLOPs，全球排名第三。\footnote{https://www.top500.org/lists/top500/2023/06/}我们在同一时刻最多使用 2200 个节点并行训练模型（相当于约 8800 张 GPU，即 17600 个 GCD，占 LUMI 全部 GPU 的 86\%）。总计使用了约 300 万 GPU 小时。集群 100\% 由可再生能源（水电）供电，其废热用于为附近城市供暖，最多减少该市 20\% 的碳排放。得益于芬兰的低温，集群所需的冷却较少，进一步降低了对环境的影响。截至 2023 年 6 月，它在全球最绿色超算中排名第七。\footnote{https://www.top500.org/lists/green500/2023/06/}</Zh>
</Para>

<Table label="tab:all_models" caption-en="\textbf{Model architectures.}
We list the architectures of all models trained as part of this work. Many shown models have been trained multiple times on different amounts of unique data and for varying epochs." caption-zh="\textbf{模型架构。}我们列出本文训练的所有模型的架构。其中许多模型在不同唯一数据量与不同 epoch 数下被多次训练。">
  <tr>
    <Td align="center">\label{tab:all_models}</Td>
  </tr>
</Table>
</template>
