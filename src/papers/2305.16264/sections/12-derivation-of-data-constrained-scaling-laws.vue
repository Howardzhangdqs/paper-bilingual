<!-- Derivation of Data-Constrained Scaling Laws -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure, Equation, Table, Td } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:scalinglaws" appendix en="Derivation of Data-Constrained Scaling Laws" zh="数据受限缩放定律的推导" />

<Para>
  <En>Let $N$ be the number of model parameters, $D$ be the training tokens and $U$ be the "unique" training tokens i.e. the size of the dataset that is to be trained on for one or more epochs. Chinchilla~\cite{hoffmann2022training} only deals with non-repeated tokens, thus $D=U$ and we can write their formula  (``Approach 3'') as:</En>
  <Zh>设 $N$ 为模型参数量，$D$ 为训练词元数，$U$ 为“唯一”训练词元数，即将要训练一个或多个 epoch 的数据集规模。Chinchilla~\cite{hoffmann2022training} 只处理非重复词元，因此 $D=U$，其公式（“方法 3”）可写为：</Zh>
</Para>

<Equation  label="eq:cc" latex="L(N,U) = \tfrac{A}{N^\alpha} + \tfrac{B}{U^\beta} + E"
  :tips="{ L: '交叉熵损失', N: '模型参数量', U: '唯一训练词元数（无重复时即总词元数 D）', A: '参数项系数（学得）', '\\alpha': '参数项幂律指数', B: '数据项系数（学得）', '\\beta': '数据项幂律指数', E: '不可约损失：数据无限时的损失下限' }" />

<Para>
  <En>where $E$ represents the irreducible loss. $A$, $B$, $\alpha$ and $\beta$ are learned parameters.</En>
  <Zh>其中 $E$ 表示不可约损失，$A$、$B$、$\alpha$ 与 $\beta$ 是学得的参数。</Zh>
</Para>

<Para>
  <En>We now want to generalize this expression to multiple epochs where tokens are repeated. We repeat the data $R_D$ times, where $R_D=0$ corresponds to the base case of a single epoch. We let $D'$ be the ``effective data size'': the number of unique data needed to get the same value as repeating $U$ unique tokens for $R_D$ repeats. Hence, if $R_D=0$, the effective data is the same as the total data processed. Intuitively, each time a sample is repeated, it is worth less as the model has already learned some of its information. Assume that each time a model trains on a token, it learns a $1-\delta$ fraction of the information in it for some constant $0 \leq \delta \leq 1$. (Thus, if $\delta=0$ repeated tokens are as good as new ones, and if $\delta=1$, repeated tokens are worth nothing.) In other words, we expect the decrease in value of each repetition to be proportional to the value of the prior repetition, which is equivalent to exponential decay. As we would like to sum up the value of all repetitions, we temporarily assume an integral number of repeats and express it as a geometric series:</En>
  <Zh>现在我们希望把该表达式推广到词元被重复的多个 epoch 的情形。我们把数据重复 $R_D$ 次，$R_D=0$ 对应单个 epoch 的基准情形。令 $D'$ 为“有效数据规模”：即与把 $U$ 个唯一词元重复 $R_D$ 次获得相同价值所需的唯一数据量。因此当 $R_D=0$ 时，有效数据就等于处理的总数据量。直观地说，样本每被重复一次，其价值就降低一些，因为模型已经学到了它的部分信息。假设模型每在一个词元上训练一次，就会学到其中 $1-\delta$ 比例的信息，其中 $0 \leq \delta \leq 1$ 为常数。（于是， 若 $\delta=0$，重复词元与全新词元一样好；若 $\delta=1$，重复词元毫无价值。）换言之，我们预期每次重复的价值下降量与上一次重复后的剩余价值成正比，这等价于指数衰减。由于我们希望把所有重复的价值求和，暂时假设重复次数为整数，并将其表示为几何级数：</Zh>
</Para>

<Equation  label="eq:ccu" latex="D' = U + (1-\delta)U + (1-\delta)^{2}U + \cdots + (1-\delta)^{R_D}U"
  :tips="{ 'D\'': '有效数据规模：与重复训练等价的全新数据量', U: '唯一词元数', '\\delta': '每次重复损失的信息比例（重复衰减率）', 'R_D': '数据重复次数（epoch 数减 1）' }" />

<Para>
  <En>We know that the sum $S$ of a geometric series with a common ratio $r$ is:</En>
  <Zh>我们知道公比为 $r$ 的几何级数之和 $S$ 为：</Zh>
</Para>

<Equation  label="eq:geos" latex="S = \frac{a(1-r^n)}{1-r}"
  :tips="{ S: '几何级数的和', a: '级数首项', r: '公比', n: '级数的项数' }" />

<Para>
  <En>where $a$ is the first term and $n$ the number of terms in the series. As $r=(1-\delta)$ and $a=(1-\delta)U$:</En>
  <Zh>其中 $a$ 为首项，$n$ 为级数的项数。由 $r=(1-\delta)$、$a=(1-\delta)U$ 可得：</Zh>
</Para>

<Equation  label="eq:ar" latex="D' = U + U\sum_{k=1}^{R_D} (1-\delta)^k = U + (1-\delta)U\tfrac{(1-(1-\delta)^{R_D})}{\delta}"
  :tips="{ 'D\'': '有效数据规模', U: '唯一词元数', '\\delta': '每次重复损失的信息比例', 'R_D': '数据重复次数', k: '求和下标：第 k 次重复' }" />

<Para>
  <En>Note that \autoref{eq:ar} can also be used with a non-integer number of repetitions. We can directly use \autoref{eq:ar} as our effective data and learn $\delta$ but for convenience and interpretability, we redefine it in terms of the number of epochs beyond which repeating does not help. Note that as more data is repeated, the right-hand side tends to $\tfrac{(1-\delta)U}{\delta}$, as $\lim_{R_D\to\infty}(1 - (1-\delta)^{R_D}) = 1$. Let $R^*_D = \tfrac{1-\delta}{\delta}$, hence $D'$ ``plateaus'' at $U + R^*_D U$ as $R_D$ goes to infinity.</En>
  <Zh>注意，\autoref{eq:ar} 也适用于非整数的重复次数。我们可以直接把 \autoref{eq:ar} 作为有效数据并学习 $\delta$，但为了方便与可解释性，我们用“重复不再有益的 epoch 数”来重新表述它。注意到随着更多数据被重复，右端趋于 $\tfrac{(1-\delta)U}{\delta}$，因为 $\lim_{R_D\to\infty}(1 - (1-\delta)^{R_D}) = 1$。令 $R^*_D = \tfrac{1-\delta}{\delta}$，则当 $R_D$ 趋于无穷时，$D'$ 在 $U + R^*_D U$ 处“趋平”。</Zh>
</Para>

<Para>
  <En>If we assume $\delta$ to be small, ${1-\delta}$ tends to one and we can approximate $1/R^*_D = \tfrac{\delta}{1-\delta} \approx \delta$.</En>
  <Zh>若假设 $\delta$ 很小，则 ${1-\delta}$ 趋于 1，可以近似 $1/R^*_D = \tfrac{\delta}{1-\delta} \approx \delta$。</Zh>
</Para>

<Para>
  <En>Next, define $e^x$ in terms of its Taylor series expansion:</En>
  <Zh>接下来用泰勒级数展开定义 $e^x$：</Zh>
</Para>

<Equation  label="eq:approx2" latex="e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots \approx 1 + x"
  :tips="{ x: '小量：较小时高次项可忽略' }" />

<Para>
  <En>If $x$ is small later terms become increasingly small, thus $e^x \approx 1 + x$. As we have assumed $\delta$ to be small, let $x = -\delta$, which yields</En>
  <Zh>当 $x$ 较小时，后面的项越来越小，因此 $e^x \approx 1 + x$。由于已假设 $\delta$ 很小，令 $x = -\delta$，得到</Zh>
</Para>

<Equation  label="eq:approx3" latex="(1 + x) = (1 - \delta) \approx e^{-\delta} \approx e^{-1/R^*_D}"
  :tips="{ x: '小量（此处取 -δ）', '\\delta': '每次重复损失的信息比例', 'R^*_D': '重复的临界值 =(1-δ)/δ：超过后回报急剧递减' }" />

<Para>
  <En>Now inserting $(1-\delta)/\delta=R_D^*$ and $(1-\delta)^{R_D}= e^{(-1/R^*_D)^{R_D}}$ into \autoref{eq:ar} we get our final equation representing the \emph{effective data}:</En>
  <Zh>现在把 $(1-\delta)/\delta=R_D^*$ 与 $(1-\delta)^{R_D}= e^{(-1/R^*_D)^{R_D}}$ 代入 \autoref{eq:ar}，便得到表示\emph{有效数据}的最终方程：</Zh>
</Para>

<Equation  label="eq:dterm" latex="D' = U + U\cdot R_D^* \cdot(1- e^{-R_D/R_D^*})"
  :tips="{ 'D\'': '有效数据：重复折算后相当于的全新词元数', U: '唯一词元数', 'R_D^*': '重复的临界值（学得常数）', 'R_D': '数据重复次数' }" />

<Para>
  <En>where $U$ and $R_D$ are given while $R_D^*$ is a learned constant. If no repeats are done, the second part of the sum is zero and the term simplifies to the single-epoch scaling laws from \autoref{eq:cc}. While $R_D \ll R_D^*$, the second term is approximated as $U\cdot R_D$ and for $R_D \gg R_D^*$, it plateaus at $U\cdot R_D^*$. Hence $R^*_D$ corresponds to the number of times we can repeat tokens before seeing sharply diminishing returns.</En>
  <Zh>其中 $U$ 与 $R_D$ 是给定的，$R_D^*$ 是学得的常数。若不做任何重复，和式的第二部分为零，该项便退化为 \autoref{eq:cc} 的单 epoch 缩放定律。当 $R_D \ll R_D^*$ 时，第二项近似为 $U\cdot R_D$；当 $R_D \gg R_D^*$ 时，它在 $U\cdot R_D^*$ 处趋平。因此，$R^*_D$ 对应于我们在看到回报急剧递减之前可以重复词元的次数。</Zh>
</Para>

<Para>
  <En>Let us consider a concrete example to show that \autoref{eq:dterm} is a very good approximation of \autoref{eq:ar} and make the equations more intuitive. Suppose repeated data retains 75\% of its value ($\delta=0.25$) and we train on a single token or data unit ($U=1$) for five epochs, i.e. we repeat it four times ($R_D=4$). In that case \autoref{eq:ar} yields $D'=U + (1-\delta)U\tfrac{(1-(1-\delta)^{R_D})}{\delta}=1+(0.75)*4*(1-0.75^4)=3.05$. Thus despite training for 5 total units (4 of which are repetitions), we only get the value equivalent to $3.05$ units. As we have defined $R_D^*=(1 - \delta)/\delta$, the corresponding $R_D^*$ value is $3$. Setting $R_D^*=3$ in \autoref{eq:dterm} yields $D'=U + U\cdot R_D^* \cdot(1- e^{-R_D/R_D^*})=1 + 3 * (1 - e^{-4/3})=3.21$. Due to our approximations, the results are not the same, i.e. $3.21$ is slightly higher than $3.05$. However, note that the data term is additionally raised to a power of $\beta=0.353$ (see \autoref{eq:cc}; \autoref{sec:c4scaling}), thus the actual difference calculated as $((3.21^{0.353}) / (3.05^{0.353})) - 1$ is a mere 1.8\% despite this relatively large $\delta$ of $0.25$. \autoref{eq:dterm} has the benefit that we can interpret $R_D^*$ as the number of repetitions beyond which repeating yields sharply diminishing returns and flattens out soon after. Consider $R_D=100$ then $D'=1 + 3 * (1 - e^{-100/3})=3.99$. No matter how many repeats are done the effective data will never exceed $4$ i.e. it plateaus at $U + R_D^*U$ as $R_D$ tends to infinity.</En>
  <Zh>我们通过一个具体例子来说明 \autoref{eq:dterm} 是 \autoref{eq:ar} 的极好近似，并使这些公式更直观。假设重复数据保留其 75\% 的价值（$\delta=0.25$），我们在单个词元（或数据单位，$U=1$）上训练五个 epoch，即重复四次（$R_D=4$）。此时 \autoref{eq:ar} 给出 $D'=U + (1-\delta)U\tfrac{(1-(1-\delta)^{R_D})}{\delta}=1+(0.75)*4*(1-0.75^4)=3.05$。也就是说，尽管总共训练了 5 个单位（其中 4 个是重复），我们只获得相当于 $3.05$ 个单位的价值。由于我们定义了 $R_D^*=(1 - \delta)/\delta$，对应的 $R_D^*$ 值为 $3$。把 $R_D^*=3$ 代入 \autoref{eq:dterm} 得到 $D'=U + U\cdot R_D^* \cdot(1- e^{-R_D/R_D^*})=1 + 3 * (1 - e^{-4/3})=3.21$。由于近似，两个结果并不相同，即 $3.21$ 略高于 $3.05$。但请注意，数据项还会被再取 $\beta=0.353$ 次幂（见 \autoref{eq:cc}；\autoref{sec:c4scaling}），因此在 $\delta$ 相当大的 0.25 之下，按 $((3.21^{0.353}) / (3.05^{0.353})) - 1$ 计算的实际差异仅为 1.8\%。\autoref{eq:dterm} 的好处是，我们可以把 $R_D^*$ 解读为重复开始急剧递减并很快趋平之前的重复次数。取 $R_D=100$，则 $D'=1 + 3 * (1 - e^{-100/3})=3.99$。无论重复多少次，有效数据都不会超过 $4$，即当 $R_D$ 趋于无穷时，它在 $U + R_D^*U$ 处趋平。</Zh>
</Para>

<Para>
  <En>Similarly, we consider repeating parameters. Symmetric to seeing the same data, excess parameters learn the same features and do not add any value in the extreme. For the Chinchilla equation (\autoref{eq:cc}) increasing parameters from 1 billion to 10 billion yields the same absolute decrease in loss regardless of whether the dataset is a single token or 1 billion tokens. However, intuition and our data (\autoref{sec:toomany}) suggest that in the first case, adding parameters should not decrease loss at all, as the additional 9 billion parameters cannot possibly learn anything from the single token that the first 1 billion parameters have not already learned. Thus, to allow excess parameters to decay to adding nothing, we also replace $N$ with a symmetric version of \autoref{eq:dterm} yielding our final equation:</En>
  <Zh>类似地，我们考虑重复参数。与重复见到相同数据对称，过剩参数学到的是相同的特征，在极端情况下不带来任何价值。对 Chinchilla 方程（\autoref{eq:cc}）而言，无论数据集是单个词元还是 10 亿词元，把参数从 10 亿增加到 100 亿都会带来相同的损失绝对下降量。然而，直觉与我们的数据（\autoref{sec:toomany}）都表明，在前一种情形下，增加参数根本不应降低损失，因为额外的 90 亿参数不可能从前 10 亿参数已经学过的内容之外，再从这单个词元上学到任何东西。因此，为了让过剩参数的价值也能衰减至零，我们同样用一个与 \autoref{eq:dterm} 对称的版本替换 $N$，得到最终方程：</Zh>
</Para>

<Equation  label="eq:fin" latex="\begin{aligned}
L(U_N,U_D,R_N,R_D)=\frac{A}{(U_N + U_N R_N^* (1 - e^{\frac{-R_N}{R_N^*}}))^\alpha} + \frac{B}{(U_D + U_D R_D^* (1 - e^{\frac{-R_D}{R_D^*}}))^\beta} + E
\end{aligned}"
  :tips="{ L: '数据受限缩放定律预测的损失', U_N: '基础参数量（最优拟合唯一词元所需）', U_D: '唯一词元数', 'R_N': '参数“重复”次数', 'R_D': '数据重复次数', 'R_N^*': '参数重复临界值（学得）', 'R_D^*': '数据重复临界值（学得）', A: '参数项系数', '\\alpha': '参数项幂律指数', B: '数据项系数', '\\beta': '数据项幂律指数', E: '不可约损失下限' }" />

<Para>
  <En>We define $U_N$, as the number of "unique" parameters that provide an optimal fit for $U_D$. Additional parameters decay with a symmetric version of the expression for repeated data. $R_N$ is the number that the "unique" parameters are repeated i.e. $R_N = \max\{(N / U_N) - 1, 0\}$. If $R_N^*=\infty$, additional parameters do not decay at all and $(U_N + U_N R_N^* (1 - e^{\frac{-R_N}{R_N^*}}))$ reduces to $N$. We compute $U_N$ from $U_D$ by setting $D_{opt}=U_D$ and rearranging \autoref{eq:ccopt} to map from $D_{opt}$ to $N_{opt}$. $U_N$ is then $\min\{N_{opt}, N\}$. This is equivalent to the following:</En>
  <Zh>我们把 $U_N$ 定义为对 $U_D$ 提供最优拟合的“唯一”参数量。过剩参数按重复数据表达式的对称版本衰减。$R_N$ 是“唯一”参数被重复的次数，即 $R_N = \max\{(N / U_N) - 1, 0\}$。若 $R_N^*=\infty$，过剩参数完全不衰减，$(U_N + U_N R_N^* (1 - e^{\frac{-R_N}{R_N^*}}))$ 退化为 $N$。计算 $U_N$ 时，令 $D_{opt}=U_D$ 并对 \autoref{eq:ccopt} 适当变形以从 $D_{opt}$ 映射到 $N_{opt}$，从而由 $U_D$ 得到 $U_N$；$U_N$ 即为 $\min\{N_{opt}, N\}$。这等价于下式：</Zh>
</Para>

<Equation  label="eq:optunud" latex="\begin{aligned}
U_N = \min\{ ((U_D \cdot G)^{\beta/\alpha}) \cdot G, N \}
\quad \text{ where } \quad G = {\left(\frac{\alpha A}{\beta B} \right)}^{\frac{1}{\alpha + \beta}}
\end{aligned}"
  :tips="{ U_N: '基础参数量：由唯一词元数推出的计算最优参数量', U_D: '唯一词元数', G: '参数/数据平衡常数（由拟合系数决定）', N: '实际参数量（作为上限）', '\\alpha': '参数项幂律指数', '\\beta': '数据项幂律指数', A: '参数项系数', B: '数据项系数' }" />

<Para>
  <En>\autoref{eq:fin} is a generalization of \autoref{eq:cc}: It provides the same estimates for optimal model and data size in the single epoch case, but allows for decay in the value of parameters and tokens, thus generalizing to training for multiple epochs and with excess parameters. It can thus be used as a direct replacement of \autoref{eq:cc}. If $R_N^*$ and $R_D^*$ are unknown, one can simply set them to infinity by default, which will make \autoref{eq:fin} completely equivalent to \autoref{eq:cc}.</En>
  <Zh>\autoref{eq:fin} 是 \autoref{eq:cc} 的推广：在单 epoch 情形下它给出与原式相同的最优模型与数据规模估计，同时允许参数与词元的价值衰减，从而推广到多 epoch 训练与存在过剩参数的情形。因此它可以直接替换 \autoref{eq:cc}。若 $R_N^*$ 与 $R_D^*$ 未知，默认将它们设为无穷大即可，此时 \autoref{eq:fin} 与 \autoref{eq:cc} 完全等价。</Zh>
</Para>

<Para>
  <En>To learn the parameters $R_N^*$ and $R_D^*$, we largely follow the approach from \cite{hoffmann2022training}. We fix $a$, $b$, $e$, $\alpha$, $\beta$ to the values learned on C4 in \autoref{sec:c4scaling} and minimize:</En>
  <Zh>为学习参数 $R_N^*$ 与 $R_D^*$，我们大体遵循 \cite{hoffmann2022training} 的做法：将 $a$、$b$、$e$、$\alpha$、$\beta$ 固定为在 C4 上学得的值（\autoref{sec:c4scaling}），并最小化：</Zh>
</Para>

<Equation  label="eq:lsedata" latex="\begin{aligned}
 \min_{R_N^*,R_D^*}  \sum_{\text{Run }i} \text{Huber}_\delta \Big( & \text{LSE}\big(a - \alpha \log (U_N^i + U_N^i R_N^* (1 - e^{\frac{-R_N^i}{R_N^*}})), \\
 & b- \beta \log (U_D^i + U_D^i R_D^* (1 - e^{\frac{-R_D^i}{R_D^*}})), e \big) - \log L^i
\Big)
\end{aligned}"
  :tips="{ 'R_N^*': '待拟合的参数重复临界值', 'R_D^*': '待拟合的数据重复临界值', '\\delta': 'Huber 损失的阈值参数', a: '参数项截距（对数尺度，C4 学得）', b: '数据项截距（对数尺度，C4 学得）', '\\alpha': '参数项幂律指数（固定）', '\\beta': '数据项幂律指数（固定）', 'U_N^i': '第 i 次训练的基础参数量', 'U_D^i': '第 i 次训练的唯一词元数', 'L^i': '第 i 次训练的实际损失' }" />

<Para>
  <En>We use the LBFGS algorithm to find local minima of the objective above, started on a grid of initialization given by: $R_N^* \in \{0., 4.,\dots, 20. \}$ and $R_D^* \in \{0., 4.,\dots, 20. \}$. We fit on 182 samples with parameters varying from 7 million up to 9 billion and epochs ranging from 1 to 500. We removed outliers referenced in \autoref{sec:toomany} from our fitting, as our formulas do not allow for excess parameters or excess epochs to negatively impact performance. We assume excess parameters or epochs only cause performance to plateau but never to worsen. However, it is difficult to identify all samples where excess parameters or epochs hurt, as for some data budgets we only train a single model, thus we do not know if the loss of that model is already in the range where it starts to increase again. Further, there are samples where loss initially increases and then decreases as a function of epochs (double descent, see~\autoref{sec:dd}), which further contributes to noise in the fitting. Nevertheless, we are able to get a fairly stable fit resulting in $R_N^*=5.309743$ and $R_D^*=15.387756$. Since $R_D^* > R_N^*$, excess parameters decay faster. Hence, the data-constrained efficient frontiers in Figures~\ref{fig:returnalloc},\ref{fig:100misoloss} suggest scaling compute allocated to epochs faster than to parameters. This value of $R_D^*$ yields $\delta \approx 6 * 10^{-2}$ ($0.19$ for $R_N^*$), which respects the assumption that $\delta$ is small. Inserting these learned parameters and the parameters from \autoref{sec:c4scaling}, and simplifying \autoref{eq:optunud} yields the precise formulation we use to predict loss ($L$) given unique tokens ($U_N$), parameter repetitions ($R_N$) and data repetitions ($R_D$):</En>
  <Zh>我们使用 LBFGS 算法寻找上述目标的局部极小，初始值取自网格：$R_N^* \in \{0., 4.,\dots, 20. \}$ 与 $R_D^* \in \{0., 4.,\dots, 20. \}$。我们在 182 个样本上进行拟合，这些样本的参数量从 700 万到 90 亿不等，epoch 数从 1 到 500。我们从拟合中剔除了 \autoref{sec:toomany} 所指的离群点，因为我们的公式不允许过剩参数或过剩 epoch 对性能产生负面影响。我们假设过剩参数或 epoch 只会使性能趋平，而不会使其变差。然而，很难识别出所有过剩参数或 epoch 造成损害的样本，因为对某些数据预算我们只训练了单个模型，从而无法判断该模型的损失是否已进入开始回升的区间。此外，还有一些样本的损失作为 epoch 的函数先升后降（双下降，见~\autoref{sec:dd}），这进一步增加了拟合噪声。尽管如此，我们仍得到了相当稳定的拟合结果：$R_N^*=5.309743$、$R_D^*=15.387756$。由于 $R_D^* > R_N^*$，过剩参数衰减得更快。因此，图~\ref{fig:returnalloc}、\ref{fig:100misoloss} 中数据受限的有效前沿表明，分配给 epoch 的计算应比分配给参数的扩展得更快。该 $R_D^*$ 的值给出 $\delta \approx 6 * 10^{-2}$（$R_N^*$ 对应 $0.19$），符合 $\delta$ 很小的假设。把这些学得的参数与 \autoref{sec:c4scaling} 的参数代入并化简 \autoref{eq:optunud}，便得到我们用以在给定唯一词元（$U_N$）、参数重复（$R_N$）与数据重复（$R_D$）时预测损失（$L$）的精确形式：</Zh>
</Para>

<Equation  label="eq:finvals" latex="\begin{aligned}
L(U_D,R_N,R_D)=&\frac{521}{(U_N + 5.3 \cdot U_N (1 - e^{\frac{-R_N}{5.3}}))^{0.35}} + \frac{1488}{(U_D + 15.4 \cdot U_D (1 - e^{\frac{-R_D}{15.4}}))^{0.35}} + 1.87\\ \\
& \text{ where } U_N = U_D \cdot 0.051
\end{aligned}"
  :tips="{ L: '预测的交叉熵损失', U_N: '基础参数量（= 0.051 × 唯一词元数）', U_D: '唯一词元数', 'R_N': '参数“重复”次数', 'R_D': '数据重复次数', '521': '参数项系数 A（C4 拟合值）', '1488': '数据项系数 B（C4 拟合值）', '0.35': '幂律指数 α=β（C4 拟合值）', '1.87': '不可约损失 E（C4 拟合值）', '5.3': '学得的参数重复临界值 R_N^*', '15.4': '学得的数据重复临界值 R_D^*', '0.051': '基础参数量与唯一词元数的换算比例' }" />

<Table label="tab:fits" caption-en="\textbf{Comparison of different versions of our parametric fit.} All versions are fitted on the same 182 samples. We report the fitting loss and the $R^2$ (coefficient of determination) of the predicted loss compared to the actual loss. No decay corresponds to assuming Chinchilla holds for repeated data without modification necessary. For \autoref{eq:ar}, we use the same equation for $D$ and $N$ renaming the $\delta$ to $R_D^*$ and $R_N^*$." caption-zh="\textbf{参数化拟合不同版本的比较。}所有版本均在相同的 182 个样本上拟合。我们报告拟合损失，以及预测损失相对实际损失的 $R^2$（决定系数）。No decay 表示假定 Chinchilla 定律无需修改即可直接适用于重复数据。对 \autoref{eq:ar}，我们对 $D$ 与 $N$ 使用同一方程，只是把 $\delta$ 分别改记为 $R_D^*$ 与 $R_N^*$。">
  <tr>
    <Td align="center">Parametric Fit</Td>
    <Td align="center">$R_D^*$</Td>
    <Td align="center">$R_N^*$</Td>
    <Td align="center">Loss ($\downarrow$)</Td>
    <Td align="center">$R^2$ ($\uparrow$)</Td>
  </tr>
  <tr>
    <Td align="center">No decay</Td>
    <Td align="center">-</Td>
    <Td align="center">-</Td>
    <Td align="center">-</Td>
    <Td align="center">0.4452</Td>
  </tr>
  <tr>
    <Td align="center">\autoref{eq:fin} but only decay $N$</Td>
    <Td align="center">-</Td>
    <Td align="center">713.0015</Td>
    <Td align="center">0.0241</Td>
    <Td align="center">0.4488</Td>
  </tr>
  <tr>
    <Td align="center">\autoref{eq:fin} but only decay $D$</Td>
    <Td align="center">2.9157</Td>
    <Td align="center">-</Td>
    <Td align="center">0.0169</Td>
    <Td align="center">0.7354</Td>
  </tr>
  <tr>
    <Td align="center">\autoref{eq:fin}</Td>
    <Td align="center">15.3878</Td>
    <Td align="center">5.3097</Td>
    <Td align="center">0.0158</Td>
    <Td align="center">0.7722</Td>
  </tr>
  <tr>
    <Td align="center">\autoref{eq:ar} for both $N$ and $D$</Td>
    <Td align="center">0.0104</Td>
    <Td align="center">0.3676</Td>
    <Td align="center">0.0155</Td>
    <Td align="center">0.7988</Td>
  </tr>
  <tr>
    <Td align="center">\autoref{eq:expdecay} for both $N$ and $D$</Td>
    <Td align="center">0.0105</Td>
    <Td align="center">0.3676</Td>
    <Td align="center">0.0155</Td>
    <Td align="center">0.7987</Td>
  </tr>
  <tr>
    <Td align="center">\autoref{eq:alphabeta}</Td>
    <Td align="center">26530.611</Td>
    <Td align="center">2040.8163</Td>
    <Td align="center">0.0596</Td>
    <Td align="center">0.5110</Td>
  </tr>
</Table>

<Para>
  <En>We experiment with different versions of our formula and display the learned values in \autoref{tab:fits}. No decay or decaying only $D$ or $N$ of \autoref{eq:fin} leads to worse loss and $R^2$ than \autoref{eq:fin}. Thus, it is important to decay both the value of excess parameters and data repetitions. We also consider an explicit exponential where $D'=\sum_{k=0}^{R_D} U*e^{-R_D^*k}$, hence from \autoref{eq:geos} it follows:</En>
  <Zh>我们实验了公式的不同版本，并在 \autoref{tab:fits} 中列出学得的取值。No decay 或只衰减 \autoref{eq:fin} 中的 $D$ 或 $N$，其损失与 $R^2$ 都差于 \autoref{eq:fin}。可见，同时衰减过剩参数与数据重复的价值十分重要。我们还考虑了显式指数形式 $D'=\sum_{k=0}^{R_D} U*e^{-R_D^*k}$，由 \autoref{eq:geos} 可得：</Zh>
</Para>

<Equation  label="eq:expdecay" latex="\begin{aligned}
D'=U\tfrac{1-(e^{-R_D^*})^{R_D + 1}}{1-e^{-R_D^*}}
\end{aligned}"
  :tips="{ 'D\'': '有效数据量（显式指数衰减版）', U: '唯一词元数', 'R_D^*': '学得的衰减率参数', 'R_D': '数据重复次数' }" />

<Para>
  <En>This explicit decay, \autoref{eq:ar}, and \autoref{eq:fin} all yield similar results with $R^{2}$ around 80. \autoref{eq:fin} fits the data slightly worse than \autoref{eq:ar}, likely due to our approximations. Nevertheless, we use \autoref{eq:fin} throughout as it has fewer terms, and we find it easier to interpret.</En>
  <Zh>这一显式衰减形式、\autoref{eq:ar} 与 \autoref{eq:fin} 三者的结果相近，$R^{2}$ 都在 80 左右。\autoref{eq:fin} 对数据的拟合略差于 \autoref{eq:ar}，这可能是近似所致。不过我们全文采用 \autoref{eq:fin}，因为它项数更少，也更易解读。</Zh>
</Para>

<Heading :level="2" en="Analytical properties of compute-optimal point" zh="计算最优点的解析性质" />

<Figure src="figures/2305.16264/cartoon.svg" :width="100" label="fig:cartoonmultiepoch" caption-en="A cartoon of how the compute-optimal tradeoff deviates from Chinchilla as we increase the number of epochs. Initially the model size and tokens processed grow proportionally ($R_N=R_D$) but since $R^*_N < R^*_D$, at some point adding parameters offers worse returns compared to increasing the number of tokens processed, and hence we deviate from the Chinchilla curve." caption-zh="示意图：随着 epoch 数增加，计算最优的权衡如何偏离 Chinchilla。起初模型规模与处理词元数成比例增长（$R_N=R_D$），但由于 $R^*_N < R^*_D$，从某一点起增加参数的回报劣于增加处理词元数，于是我们偏离了 Chinchilla 曲线。" />

<Para>
  <En>In our case, consider the setting of a fixed compute budget $C$ and a fixed budget of unique tokens $U_D$ implying a set of unique parameters $U_N$. Let $R_D$ denote the number of times we repeat data (we assume that we are in the multi-epoch regime and hence $R_D>0$). Write $U_D = cU_N$ (for Chinchilla $c\approx 20$). When $R_D \ll R^*_D$ and $R_N \ll R^*_N$, our scaling agrees with Chinchilla, and so the point $(U_N,U_D)$, corresponding to $R_D=R_N=0$ is on the optimal compute curve. Increasing $R_D$ by $\epsilon$ corresponds to increasing the number of tokens by $\epsilon U_D = \epsilon c U_N$, while increasing $R_N$ by $\epsilon$ corresponds to increasing the number of parameters by $\epsilon U_N$. For small positive $R_D,R_N$, our curve agrees with Chinchilla and so we need to increase $R_N,R_D$ by the same amount to maintain the proportionality. Hence up to some value $r>0$, the optimal compute curve corresponds to $R_N=R_D=r$. Our curve differs from Chinchilla when $r$ gets closer to either $R^*_N$ or $R^*_D$. At this point, we start to see sharply diminishing returns.</En>
  <Zh>在我们的情形中，考虑固定计算预算 $C$ 与固定唯一词元预算 $U_D$（意味着一组唯一参数 $U_N$）的设定。设 $R_D$ 为数据重复次数（我们假设处于多 epoch 区间，故 $R_D>0$）。记 $U_D = cU_N$（对 Chinchilla 而言 $c\approx 20$）。当 $R_D \ll R^*_D$ 且 $R_N \ll R^*_N$ 时，我们的缩放与 Chinchilla 一致，因此对应于 $R_D=R_N=0$ 的点 $(U_N,U_D)$ 位于最优计算曲线上。把 $R_D$ 增加 $\epsilon$ 相当于把词元数增加 $\epsilon U_D = \epsilon c U_N$；而把 $R_N$ 增加 $\epsilon$ 相当于把参数量增加 $\epsilon U_N$。对较小的正数 $R_D,R_N$，我们的曲线与 Chinchilla 一致，因此需要等量增加 $R_N,R_D$ 以保持比例。于是在达到某个 $r>0$ 之前，最优计算曲线对应于 $R_N=R_D=r$。当 $r$ 接近 $R^*_N$ 或 $R^*_D$ 时，我们的曲线开始不同于 Chinchilla。此时回报开始急剧递减。</Zh>
</Para>

<Para>
  <En>In our setting, $R^*_D > R^*_N$ which means that we reach the point $r \approx R^*_N$ first. At this point, each added parameter is worth less (specifically worth $e^{-r/R^*_N}$), than an added data point, despite them having equal computational cost. Hence processing more tokens will be more effective than increasing the number of parameters, and we expect the optimal compute curve to break away from proportionality. This is indeed what we see.</En>
  <Zh>在我们的设定中，$R^*_D > R^*_N$，这意味着我们会先到达 $r \approx R^*_N$。 在该点，尽管计算成本相同，每个新增参数的价值（具体为 $e^{-r/R^*_N}$）低于新增数据点。 因此处理更多词元会比增加参数量更有效，我们预计最优计算曲线将脱离比例关系。 实际情况正是如此。</Zh>
</Para>
</template>
