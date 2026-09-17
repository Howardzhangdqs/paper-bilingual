<!-- Background -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Bullets, Item } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:background" en="Background" zh="背景" />

<Para>
  <En>Predicting the scaling behavior of large models is critical when deciding on training resources. Specifically, two questions are of interest: \textit{(Allocation)} What is the optimal balance of resources? \textit{(Return)} What is the expected value of additional resources?  For scaling LLMs, the resource is compute (measured in FLOPs), and it can be allocated to training a larger model or training for more steps.\footnote{In this work we use  \cite{kaplan2020scaling}'s approximation for the compute cost: $\text{FLOPs}(N, D) \approx 6 N D$, where N denotes the number of model parameters and D denotes the number of tokens processed.}  The metric used to quantify progress is the model's loss on held-out data, i.e.\ the ability to predict the underlying data as measured in the model's cross-entropy~\cite{alabdulmohsin2022revisiting,hoffmann2022training}. We aim to minimize the loss ($L$) subject to a compute resource constraint ($C$) via optimal allocation to $N$ and $D$ as:</En>
  <Zh>在决定训练资源时，预测大模型的扩展行为至关重要。具体来说，有两个问题值得关注：\textit{（分配）}资源的最佳平衡是什么？\textit{（回报）}追加资源的期望价值是多少？对于 LLM 的扩展而言，资源是计算量（以 FLOPs 度量），既可以分配给训练更大的模型，也可以分配给训练更多步数。\footnote{本文采用 \cite{kaplan2020scaling} 的计算成本近似：$\text{FLOPs}(N, D) \approx 6 N D$，其中 N 表示模型参数量，D 表示处理的词元数。}衡量进展的指标是模型在留出数据上的损失，即模型以交叉熵度量的对底层数据的预测能力~\cite{alabdulmohsin2022revisiting,hoffmann2022training}。我们的目标是在计算资源约束（$C$）下，通过对 $N$ 和 $D$ 的最优分配来最小化损失（$L$）：</Zh>
</Para>

<Equation  label="eq:model" latex="\argmin_{N, D} L(N, D) \text{ s.t. } \text{FLOPs}(N, D) = C"
  :tips="{ N: '模型的非词嵌入参数量', D: '训练处理的词元（token）总数', L: '模型在留出数据上的交叉熵损失', C: '可用的计算预算（以 FLOPs 计）' }" />

<Para>
  <En>Currently, there are established best practices for scaling LLMs. \textit{Return} follows a power-law: loss scales as a power-law with the amount of compute used for training~\cite{henighan2020scaling,kaplan2020scaling,bahri2021explaining,ghorbani2021scaling,bansal2022data,hernandez2021scaling}. \textit{Allocation} is balanced: resources are divided roughly equally between scaling of parameters and data~\cite{hoffmann2022training}. These scaling laws were established empirically by training LLMs and carefully extrapolating behavior.</En>
  <Zh>目前，LLM 的扩展已有公认的最佳实践。\textit{回报}遵循幂律：损失随训练所用计算量按幂律缩放~\cite{henighan2020scaling,kaplan2020scaling,bahri2021explaining,ghorbani2021scaling,bansal2022data,hernandez2021scaling}。\textit{分配}是均衡的：资源大致平均地分配给参数扩展与数据扩展~\cite{hoffmann2022training}。这些缩放定律是通过训练 LLM 并谨慎外推其行为而从经验上确立的。</Zh>
</Para>

<Para>
  <En>Chinchilla~\cite{hoffmann2022training} uses three methods for making scaling predictions:</En>
  <Zh>Chinchilla~\cite{hoffmann2022training} 使用三种方法进行缩放预测：</Zh>
</Para>

<Bullets>
  <Item>
    <En>(\textit{Fixed Parameters}) Train with a fixed model size but on varying amounts of data.</En>
    <Zh>（\textit{Fixed Parameters}，固定参数）以固定的模型规模在不同数据量上训练。</Zh>
  </Item>
  <Item>
    <En>(\textit{Fixed FLOPs}) Train with fixed computation while parameters and training tokens vary.</En>
    <Zh>（\textit{Fixed FLOPs}，固定计算量）在计算量固定的情况下让参数量与训练词元数变化。</Zh>
  </Item>
  <Item>
    <En>(\textit{Parametric Fit}) Derive and fit a formula for the loss.</En>
    <Zh>（\textit{Parametric Fit}，参数化拟合）推导并拟合损失的公式。</Zh>
  </Item>
</Bullets>

<Para>
  <En>For the parametric fit, the loss ($L$) is a function of parameters ($N$) and training tokens ($D$):</En>
  <Zh>在参数化拟合中，损失（$L$）是参数量（$N$）与训练词元数（$D$）的函数：</Zh>
</Para>

<Equation  label="eq:ccbase" latex="L(N,D) = \frac{A}{N^\alpha} + \frac{B}{D^\beta} + E"
  :tips="{ L: '交叉熵损失', N: '非词嵌入参数量', D: '训练词元数', A: '参数项系数（拟合学得）', '\\alpha': '参数项的幂律指数', B: '数据项系数（拟合学得）', '\\beta': '数据项的幂律指数', E: '不可约损失：数据无限时的损失下限' }" />

<Para>
  <En>Where $\{A, \alpha, B, \beta, E\}$ are learned variables fit using the training runs from the first two approaches~\cite{hoffmann2022training}. Using these learned variables, they propose calculating the optimal allocation of compute ($C$) to $N$ and $D$ as follows:</En>
  <Zh>其中 $\{A, \alpha, B, \beta, E\}$ 是利用前两种方法的训练运行拟合得到的变量~\cite{hoffmann2022training}。基于这些学得的变量，他们提出按下式计算计算量（$C$）在 $N$ 与 $D$ 之间的最优分配：</Zh>
</Para>

<Equation  label="eq:ccopt" latex="\begin{aligned}
&N_{opt}(C) = G {\left({C}/{6}\right)}^{a}  \quad
D_{opt}(C) = G^{-1} {\left({C}/{6}\right)}^{b}\\
\quad \text{ where } &\quad G = {\left(\frac{\alpha A}{\beta B} \right)}^{\frac{1}{\alpha + \beta}} \quad
a = \frac{\beta}{\alpha+\beta}\quad b = \frac{\alpha}{\alpha + \beta}
\end{aligned}"
  :tips="{ 'N_{opt}': '给定计算预算下的最优参数量', 'D_{opt}': '给定计算预算下的最优训练词元数', C: '计算预算（FLOPs）', G: '由拟合系数决定的参数/数据平衡常数', a: '计算量分配给参数的指数份额', b: '计算量分配给数据的指数份额', '\\alpha': '参数项幂律指数', '\\beta': '数据项幂律指数', A: '参数项系数', B: '数据项系数' }" />

<Para>
  <En>These methods lead to the conclusion that $\alpha\approx \beta$ and hence $N$ and $D$ should be scaled proportionally for compute-optimal training. As loss can be an imperfect proxy for performance on natural language tasks~\cite{xia2022training,shin2022effect,tay2021scale}, they also validate their conclusions on various downstream tasks.</En>
  <Zh>这些方法得出的结论是 $\alpha\approx \beta$，因此在计算最优训练中 $N$ 与 $D$ 应按比例扩展。由于损失可能无法完美地代表自然语言任务的性能~\cite{xia2022training,shin2022effect,tay2021scale}，他们还在多个下游任务上验证了上述结论。</Zh>
</Para>
</template>
