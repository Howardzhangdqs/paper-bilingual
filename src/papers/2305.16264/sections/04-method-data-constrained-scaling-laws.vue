<!-- Method: Data-Constrained Scaling Laws -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Bullets, Item } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:exp" en="Method: Data-Constrained Scaling Laws" zh="方法：数据受限的缩放定律" />

<Para>
  <En>We are interested in scaling behavior in the data-constrained regime. Specifically, given a limited amount of unique data, what is the best \textit{Allocation} of and \textit{Return} for computational resources. Prior work~\cite{kaplan2020scaling,hoffmann2022training} assumes that the necessary data to support scaling is unlimited. Our aim is therefore to introduce a modified version of \autoref{eq:ccbase} that accounts for data constraints and fit the terms in the modified scaling law to data from a large body of experiments.</En>
  <Zh>我们关注数据受限情形下的扩展行为。具体而言，在唯一数据量有限的情况下，计算资源的最佳\textit{分配}方式及其\textit{回报}是什么。已有工作~\cite{kaplan2020scaling,hoffmann2022training}均假设支持扩展所需的数据是无限的。因此，我们的目标是给出 \autoref{eq:ccbase} 的一个考虑数据约束的修正版本，并用大量实验数据来拟合修正后缩放定律中的各项。</Zh>
</Para>

<Para>
  <En>The primary method we consider is \textit{repeating} data, i.e.\ allocating FLOPs to multiple epochs on the same data. Given a budget of unique data $D_C$, we split the Chinchilla total data term $D$ into two parts: the number of unique tokens used, $U_D$, and the number of repetitions, $R_D$ (i.e. epochs - 1). Given total training tokens $D$ and data budget $D_C$ these terms are simply computed as $U_D = \min \{D_C,D\}$ and $R_D = (D/U_D)-1$. When training for a single epoch like done in prior scaling studies, $R_D=0$. We are thus interested in minimizing \autoref{eq:model} with the additional constraint of a data budget $D_C$:</En>
  <Zh>我们考虑的主要方法是\textit{重复}数据，即把 FLOPs 分配给在同一数据上的多个 epoch。给定唯一数据预算 $D_C$，我们把 Chinchilla 的总数据项 $D$ 拆分为两部分：所使用的唯一词元数 $U_D$，以及重复次数 $R_D$（即 epoch 数减 1）。给定总训练词元数 $D$ 与数据预算 $D_C$，这两项可直接计算为 $U_D = \min \{D_C,D\}$ 和 $R_D = (D/U_D)-1$。 当像以往缩放研究那样只训练单个 epoch 时，$R_D=0$。因此，我们关注的是在附加数据预算 $D_C$ 约束下最小化 \autoref{eq:model}：</Zh>
</Para>

<Equation  label="eq:modeldc" latex="\argmin_{N, D} L(N, D) \text{ s.t. } \text{FLOPs}(N, D) = C, U_D \le D_C"
  :tips="{ N: '模型的非词嵌入参数量', D: '训练处理的词元总数', L: '留出数据上的交叉熵损失', C: '计算预算（FLOPs）', U_D: '实际使用的唯一词元数', D_C: '唯一数据预算（可用唯一数据的上限）' }" />

<Para>
  <En>Symmetrically, for mathematical convenience, we split the parameter term $N$ into two parts: the base number of parameters needed to optimally fit the unique tokens $U_N$, and the number of times to ``repeat'' this initial allocation, $R_N$. We compute $U_N$ by first rearranging \autoref{eq:ccopt} to find the optimal compute budget for the unique tokens used ($U_D$). We input this value into the $N_{opt}$ formula of \autoref{eq:ccopt} to get $U_N= \min \{ N_{opt}, N\}$. $U_N$ thus corresponds to the compute-optimal number of parameters for $U_D$ or less if $N &lt; N_{opt}$. Once we have $U_N$, we compute the repeat value as $R_N = (N/U_N)-1$.</En>
  <Zh>对称地，为便于数学处理，我们把参数项 $N$ 也拆分为两部分：最优拟合唯一词元所需的基础参数量 $U_N$，以及对这一初始分配进行“重复”的次数 $R_N$。计算 $U_N$ 时，先对 \autoref{eq:ccopt} 适当变形，求出所用唯一词元（$U_D$）对应的最优计算预算，再把该值代入 \autoref{eq:ccopt} 的 $N_{opt}$ 公式，得到 $U_N= \min \{ N_{opt}, N\}$。因此，$U_N$ 对应于 $U_D$ 的计算最优参数量；当 $N &lt; N_{opt}$ 时取更小值。得到 $U_N$ 后，重复值按 $R_N = (N/U_N)-1$ 计算。</Zh>
</Para>

<Para>
  <En>To empirically explore the scaling behavior in a data-limited setting we train LLMs under these constraints. We consider three different experimental protocols in this work:</En>
  <Zh>为在数据受限设定下从实证上探索扩展行为，我们在上述约束下训练 LLM。本文考虑三种不同的实验方案：</Zh>
</Para>

<Bullets>
  <Item>
    <En>(\textit{Fixed Unique Data}) In \autoref{sec:fixu} we fix the data constraint $D_C$ and train models varying epochs and parameters. These experiments target \textit{Allocation}, specifically tradeoff of $D$ and $N$.</En>
    <Zh>（\textit{Fixed Unique Data}，固定唯一数据）在 \autoref{sec:fixu} 中，我们固定数据约束 $D_C$，训练不同 epoch 数与参数量的模型。这些实验针对\textit{分配}问题，具体是 $D$ 与 $N$ 之间的权衡。</Zh>
  </Item>
  <Item>
    <En>(\textit{Fixed FLOPs}) In \autoref{sec:fixc} we fix the computation available and vary $D_C$ (and thus also $U_D$ and $U_N$). These experiments target \textit{Return}, i.e. how well does repeating scale compared to having more unique data.</En>
    <Zh>（\textit{Fixed FLOPs}，固定计算量）在 \autoref{sec:fixc} 中，我们固定可用计算量并变化 $D_C$（因而 $U_D$ 与 $U_N$ 也随之变化）。这些实验针对\textit{回报}问题，即与拥有更多唯一数据相比，重复数据的扩展效果如何。</Zh>
  </Item>
  <Item>
    <En>(\textit{Parametric Fit}) We fit a formula introduced in \autoref{sec:parametricfit} on all our training runs and evaluate its predictive capability throughout \autoref{sec:fixu} and \autoref{sec:fixc}.</En>
    <Zh>（\textit{Parametric Fit}，参数化拟合）我们在全部训练运行上拟合 \autoref{sec:parametricfit} 中引入的公式，并在 \autoref{sec:fixu} 与 \autoref{sec:fixc} 中持续评估其预测能力。</Zh>
  </Item>
</Bullets>

<Para>
  <En>Before discussing experimental results we describe the parametric assumptions.</En>
  <Zh>在讨论实验结果之前，先介绍参数化的假设。</Zh>
</Para>

<Heading :level="2" en="Parametric Fit" zh="参数化拟合" />

<Para>
  <En>To extrapolate scaling curves, it is necessary to incorporate repetition into the Chinchilla formula (\autoref{eq:ccbase}). We generalize \autoref{eq:ccbase} by replacing $D$ and $N$ with terms corresponding to the \emph{effective data} ($D'$) and \emph{effective model parameters} ($N'$).</En>
  <Zh>为外推缩放曲线，必须把重复引入 Chinchilla 公式（\autoref{eq:ccbase}）。我们用对应于\emph{有效数据}（$D'$）与\emph{有效模型参数}（$N'$）的项替换 $D$ 与 $N$，从而推广 \autoref{eq:ccbase}。</Zh>
</Para>

<Equation :numbered="false" latex="L(N,D)=\frac{A}{N'^\alpha} + \frac{B}{D'^\beta} + E"
  :tips="{ L: '交叉熵损失', N: '实际参数量', D: '实际训练词元数', 'N\'': '有效模型参数（考虑参数重复的折减）', 'D\'': '有效数据量（考虑数据重复的折减）', A: '参数项系数', '\\alpha': '参数项幂律指数', B: '数据项系数', '\\beta': '数据项幂律指数', E: '不可约损失下限' }" />

<Equation  label="eq:repd" latex="D' = U_D + U_D R_D^* (1 - e^{\frac{-R_D}{R_D^*}}) \;"
  :tips="{ 'D\'': '有效数据量：重复折算后相当于的全新词元数', U_D: '使用的唯一词元数', 'R_D': '数据重复次数（epoch 数减 1）', 'R_D^*': '重复的临界值：学得常数，约为重复价值的“半衰期”' }" />

<Equation :numbered="false" latex="D' \approx U_D + U_DR^*_D(1-1+ R_D/R^*_D) = U_D(1+R_D)=D"
  :tips="{ 'D\'': '有效数据量', U_D: '使用的唯一词元数', 'R_D': '数据重复次数', 'R^*_D': '重复的临界值（学得常数）', D: '总训练词元数' }" />

<Equation :numbered="false" latex="D' \approx U_D + U_DR^*_D(1-1+ R_D/R^*_D) = U_D(1+R_D)=D"
  :tips="{ 'D\'': '有效数据量', U_D: '使用的唯一词元数', 'R_D': '数据重复次数', 'R^*_D': '重复的临界值（学得常数）', D: '总训练词元数' }" />

<Para>
  <En>Intuitively, $D'$ should be smaller or equal to $D$ where $D$ is the total number of processed tokens since repeated tokens provide less useful information to the model than new ones. We use an \emph{exponential decay} formulation, where the value of a data token processed loses roughly $(1-1/R^*_D)$ fraction of its value per repetition, where $R^*_D$ is a learned constant.  After some derivations and approximations (see \autoref{sec:scalinglaws}), this boils down to Note that for $R_D=0$ (no repetitions), $D'=U_D=D$. For $R_D  \ll R^*_D$, $e^{-R_D/R^*_D}\approx 1- \tfrac{R_D}{R^*_D}$ and so and hence in this case, repeated data is worth almost the same as fresh data. (This is also consistent with the predictions of the ``deep bootstrap'' framework~\cite{NakkiranNS21}.) As $R_D$ grows, the value of repeated tokens tends to zero, and the effective data $D'$ becomes much smaller than $D$. The formula implies that no matter how many times we repeat the data, we will not get a better loss than could be obtained with a single epoch on  $U_D + U_DR^*_D$ fresh tokens.</En>
  <Zh>直观上，$D'$ 应小于或等于 $D$（即处理过的总词元数），因为重复词元提供给模型的有用信息比新词元少。 我们采用\emph{指数衰减}的形式：每重复一次，已处理数据词元的价值大约损失 $(1-1/R^*_D)$ 的比例，其中 $R^*_D$ 是一个学得的常数。 经过若干推导与近似（见 \autoref{sec:scalinglaws}），这最终归结为 注意，当 $R_D=0$（无重复）时，$D'=U_D=D$。 当 $R_D  \ll R^*_D$ 时，$e^{-R_D/R^*_D}\approx 1- \tfrac{R_D}{R^*_D}$，于是 因此在这种情况下，重复数据的价值几乎与全新数据相同。 （这也与“深层自举”（deep bootstrap）框架~\cite{NakkiranNS21}的预测一致。） 随着 $R_D$ 增大，重复词元的价值趋于零，有效数据 $D'$ 也变得远小于 $D$。 该公式意味着，无论把数据重复多少次，我们都无法获得优于对 $U_D + U_DR^*_D$ 个全新词元做单个 epoch 训练所能得到的损失。</Zh>
</Para>

<Para>
  <En>Just as processing repeated tokens yields a diminishing return, both intuitively and empirically, models with sizes that vastly outstrip the available data also offer diminishing returns per parameter. Hence we use a symmetric formula for the number of effective parameters, where again $R^*_N$ is learned,</En>
  <Zh>正如处理重复词元会带来递减的回报，无论从直观还是实证上看，规模远超可用数据的模型同样表现出单位参数回报递减。 因此，我们对有效参数量采用对称的公式，其中 $R^*_N$ 同样是学得的，</Zh>
</Para>

<Equation  label="eq:repn" latex="N' = U_N + U_N R_N^* (1 - e^{\frac{-R_N}{R_N^*}}) \;"
  :tips="{ 'N\'': '有效模型参数：重复折算后相当于的基础参数量', U_N: '最优拟合唯一词元所需的基础参数量', 'R_N': '参数“重复”次数（实际参数量相对基础参数的倍数减 1）', 'R_N^*': '参数重复的临界值（学得常数）' }" />

<Para>
  <En>The learned constants $R^*_D$, $R^*_N$ roughly correspond to the ``half-life'' of repeated data and excess parameters. For example, at $R_D=R^*_D$, the number of effective tokens $D'$ is $U_D+ U_DR_D(1-e^{-1})$ which means that the $U_DR_D$ repeated tokens are worth on average $1-1/e$ fraction of fresh ones.</En>
  <Zh>学得的常数 $R^*_D$、$R^*_N$ 大致对应于重复数据与过剩参数的“半衰期”。例如，当 $R_D=R^*_D$ 时，有效词元数 $D'$ 为 $U_D+ U_DR_D(1-e^{-1})$，这意味着 $U_DR_D$ 个重复词元平均只具有全新词元 $1-1/e$ 的价值。</Zh>
</Para>

<Para>
  <En>Using a methodology similar to \cite{hoffmann2022training}, $R_N^*$ and $R_D^*$ can be fit on empirical measurements, which yields data-driven estimates. See \autoref{sec:scalinglaws} for more details on the derivations and the fitting procedure.</En>
  <Zh>采用与 \cite{hoffmann2022training} 类似的方法，可以在实证测量数据上拟合 $R_N^*$ 与 $R_D^*$，从而得到数据驱动的估计。有关推导与拟合过程的更多细节见 \autoref{sec:scalinglaws}。</Zh>
</Para>
</template>
