<!-- C4 Scaling Coefficients -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:c4scaling" appendix en="C4 Scaling Coefficients" zh="C4 缩放系数" />

<Para>
  <En>While \citet{hoffmann2022training} have shown that the equal scaling of model parameters and training tokens holds across different training datasets, the precise ratios vary considerably across datasets and approaches. For example given the Gopher~\cite{rae2021scaling} compute budget of $5.76 \times 10^{23}$ FLOPs, their parametric loss function fitted on MassiveWeb predicts an optimal allocation of 40 billion parameters. Meanwhile, if the training dataset is C4~\cite{raffel2020exploring} their IsoFLOP approach predicts 73 billion parameters to be optimal, almost twice as much. However, for C4, which is our training dataset, they do not provide the coefficients necessary to compute loss with their parametric loss function. Based on their IsoFLOP training runs on C4, they only provide the information that for C4, compute ($C$) allocated to data ($D$) and parameters ($N$) should be scaled \emph{exactly} equally for optimality, i.e. $a=b=0.5$ in the relationship $N_{opt} \propto C^a$ and $D_{opt} \propto C^b$. This corresponds to $\alpha=\beta$ in the parametric loss function (\autoref{eq:ccbase}). Thus, we use this information together with the methodology and C4 data points from \cite{hoffmann2022training} to fit the parametric loss function. We tie the parameters $\alpha$ and $\beta$ to be equal and optimize</En>
  <Zh>虽然 \citet{hoffmann2022training} 已表明“模型参数与训练词元等比例扩展”在不同训练数据集上都成立，但精确的比例随数据集与方法的不同而变化很大。例如，给定 Gopher~\cite{rae2021scaling} 的 $5.76 \times 10^{23}$ FLOPs 计算预算，他们在 MassiveWeb 上拟合的参数化损失函数预测最优分配为 400 亿参数；而若训练数据集为 C4~\cite{raffel2020exploring}，其 IsoFLOP 方法预测最优为 730 亿参数，几乎是前者两倍。然而，对我们用作训练数据集的 C4，他们并未提供用其参数化损失函数计算损失所需的系数。基于他们在 C4 上的 IsoFLOP 训练运行，他们只提供了如下信息：对 C4 而言，为达到最优，计算量（$C$）分配给数据（$D$）与参数（$N$）的部分应\emph{恰好}等比例扩展，即在 $N_{opt} \propto C^a$ 与 $D_{opt} \propto C^b$ 的关系中 $a=b=0.5$。这对应于参数化损失函数中的 $\alpha=\beta$（\autoref{eq:ccbase}）。于是，我们利用这一信息以及 \cite{hoffmann2022training} 的方法与 C4 数据点来拟合参数化损失函数。我们把参数 $\alpha$ 与 $\beta$ 绑定为相等，并优化</Zh>
</Para>

<Equation  label="eq:lse" latex="\min_{a, b, e, \alpha, \beta}  \sum_{\text{Run }i} \text{Huber}_\delta \Big(\text{LSE}\big(a - \alpha \log N_i, b- \beta \log D_i, e \big) - \log L_i\Big)"
  :tips="{ a: '参数项截距（对数尺度，待拟合）', b: '数据项截距（对数尺度，待拟合）', e: '损失下限（对数尺度，待拟合）', '\\alpha': '参数项幂律指数（与 β 绑定相等）', '\\beta': '数据项幂律指数（与 α 绑定相等）', '\\delta': 'Huber 损失的阈值参数（取 10⁻³）', N_i: '第 i 次运行的模型参数量', D_i: '第 i 次运行的词元数', L_i: '第 i 次运行的损失' }" />

<Para>
  <En>where $\text{LSE}$ is the log-sum-exp operator and $N_i$, $D_i$ and $L_i$ the model size, dataset size and loss of the $i$th run, and $\delta = 10^{-3}$. We fit on 54 samples on a grid of initialization given by: $\alpha \in \{0., 0.5,\dots, 2. \}$, $\beta \in \{ 0., 0.5,\dots, 2.\}$, $e \in \{-1., -.5, \dots, 1. \}$, $a \in \{0, 5, \dots, 25 \}$, and $b \in \{0, 5, \dots, 25 \}$. Our fit results in $a=6.255414$, $b=7.3049974$, $e=0.6254804$, $\alpha=\beta=0.3526596$. Exponentiating $a$, $b$ and $e$ to get $A$, $B$ and $E$ and inserting all learned coefficients into \autoref{eq:ccbase} then allows us to compute loss ($L$) as a function of parameters and data:</En>
  <Zh>其中 $\text{LSE}$ 为 log-sum-exp 算子，$N_i$、$D_i$ 与 $L_i$ 分别为第 $i$ 次运行的模型规模、数据集规模与损失，$\delta = 10^{-3}$。我们在 54 个样本上拟合，初始值取自网格：$\alpha \in \{0., 0.5,\dots, 2. \}$、$\beta \in \{ 0., 0.5,\dots, 2.\}$、$e \in \{-1., -.5, \dots, 1. \}$、$a \in \{0, 5, \dots, 25 \}$、$b \in \{0, 5, \dots, 25 \}$。 拟合结果为 $a=6.255414$、$b=7.3049974$、$e=0.6254804$、$\alpha=\beta=0.3526596$。对 $a$、$b$、$e$ 取指数得到 $A$、$B$、$E$，并把所有学得的系数代入 \autoref{eq:ccbase}，即可把损失（$L$）表示为参数量与数据的函数：</Zh>
</Para>

<Equation :numbered="false" latex="L(N, D) = 1.87 + \frac{521}{N^{0.353}} + \frac{1488}{D^{0.353}}"
  :tips="{ L: '交叉熵损失（C4 上的拟合）', N: '模型参数量', D: '训练词元数', '1.87': '不可约损失下限 E', '521': '参数项系数 A', '1488': '数据项系数 B', '0.353': '幂律指数 α=β' }" />

<Para>
  <En>To verify the accuracy of our fit, we benchmark the predictions with those of the IsoFLOP C4 curves in \cite{hoffmann2022training}. Following \cite{hoffmann2022training}, we can compute the optimal number of parameters $N_{opt}$ and tokens $D_{opt}$ for our fit using:</En>
  <Zh>为验证拟合的准确性，我们将预测与 \cite{hoffmann2022training} 中 C4 的 IsoFLOP 曲线进行比较。按照 \cite{hoffmann2022training}，可用下式计算我们的拟合对应的最优参数量 $N_{opt}$ 与词元数 $D_{opt}$：</Zh>
</Para>

<Equation  label="eq:ccoptapp" latex="\begin{aligned}
N_{opt}(C) = G {\left(\frac{C}{6}\right)}^{a}, \quad
D_{opt}(C) = G^{-1} {\left(\frac{C}{6}\right)}^{b}\\
\quad \text{ where } \quad G = {\left(\frac{\alpha A}{\beta B} \right)}^{\frac{1}{\alpha + \beta}},\quad
a = \frac{\beta}{\alpha+\beta}, \text{ and } b = \frac{\alpha}{\alpha + \beta}
\end{aligned}"
  :tips="{ 'N_{opt}': '给定计算预算下的最优参数量', 'D_{opt}': '给定计算预算下的最优训练词元数', C: '计算预算（FLOPs）', G: '参数/数据平衡常数', a: '计算量分配给参数的指数份额', b: '计算量分配给数据的指数份额', '\\alpha': '参数项幂律指数', '\\beta': '数据项幂律指数', A: '参数项系数', B: '数据项系数' }" />

<Para>
  <En>Given the Gopher compute budget of $C=5.76 \times 10^{23}$ our fitted parameters predict an optimal allocation of $N_{opt}=70.0$ billion parameters and $D_{opt}=1.37$ trillion tokens. This is very close to the 73 billion parameters and 1.3 trillion tokens predicted by the IsoFLOP curves on C4 from \cite{hoffmann2022training} and thus we consider it a good fit. We use these fitted parameters rather than the MassiveWeb parameters for all computations involving Chinchilla scaling laws.</En>
  <Zh>给定 Gopher 的计算预算 $C=5.76 \times 10^{23}$，我们拟合的参数预测最优分配为 $N_{opt}=700.0$ 亿参数与 $D_{opt}=1.37$ 万亿词元。这与 \cite{hoffmann2022training} 在 C4 上的 IsoFLOP 曲线预测的 730 亿参数与 1.3 万亿词元非常接近，因此我们认为拟合良好。在所有涉及 Chinchilla 缩放定律的计算中，我们都使用这些拟合参数而非 MassiveWeb 参数。</Zh>
</Para>
</template>
