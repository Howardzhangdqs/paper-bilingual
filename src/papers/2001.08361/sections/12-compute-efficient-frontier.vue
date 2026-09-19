<!-- Empirical Model of Compute-Efficient Frontier -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Foot } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="app:ComputeEfficientTraining" appendix en="Empirical Model of Compute-Efficient Frontier" zh="算力高效前沿的经验模型" />

<Para>
  <En>Throughout this appendix all values of $C, S,$ and $\alpha_C$ are adjusted for training at the critical batch size $B_{\rm crit}$. We have left off the `adj' label to avoid cluttering the notation.</En>
  <Zh>在本附录中，$C, S,$ 和 $\alpha_C$ 的所有取值均已按临界批量 $B_{\rm crit}$ 训练作了调整。为避免记号繁杂，我们省去了 “adj” 标记。</Zh>
</Para>

<Heading :level="2" en="Defining Equations" zh="定义方程" />

<Para>
  <En>The power-law fit to the learning curves implies a simple prescription for compute-efficient training. In this appendix, we will derive the optimal performance, model size, and number of training steps as a function of the compute budget. We start with the Equation \eqref{eq:FundamentalLikelihioodvsModelandSteps}, repeated here for convenience:</En>
  <Zh>对学习曲线的幂律拟合蕴含了算力高效训练的一个简单处方。在本附录中，我们将推导最优性能、模型规模与训练步数作为算力预算的函数。我们从公式 \eqref{eq:FundamentalLikelihioodvsModelandSteps} 出发（为方便起见重述于此）：</Zh>
</Para>

<Equation :numbered="false"
  latex="L\left(N,S\right)=\left(\frac{N_{c}}{N}\right)^{\alpha_{N}}+\left(\frac{S_{c}}{S}\right)^{\alpha_{S}}."
  :tips="{ L: '交叉熵损失', N: '模型参数量', S: '临界批量下训练的参数更新次数', 'N_{c}': '参数量特征尺度', 'S_{c}': '步数特征尺度', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数' }" />

<Para>
  <En>Here, $S$ represents the number of parameter updates when training \textbf{at the critical batch size} \cite{1812.06162}, which was defined in Equation \eqref{eq:DefinitionBcrit}<Foot>There is a slight ambiguity here: we can imagine training either at a constant batch size $B\left(L_{\rm target}}\right)$, or we could instead train at a variable batch size $\tilde{B}\left(L\right)$, where $\tilde{B}$ is the instantaneous critical batch size (as opposed to $B$, which is the averaged version). These two prescriptions result in the same number of steps, so we can ignore this subtlety (see \cite{1812.06162}).</Foot>:</En>
  <Zh>此处 $S$ 表示\textbf{以临界批量大小}\cite{1812.06162}训练时的参数更新次数，其定义见公式 \eqref{eq:DefinitionBcrit}<Foot>这里有一点轻微的含糊：我们可以想象以恒定批量 $B\left(L_{\rm target}}\right)$ 训练，也可以以可变批量 $\tilde{B}\left(L\right)$ 训练，其中 $\tilde{B}$ 是瞬时临界批量（与之相对，$B$ 是其平均版本）。这两种方案给出相同的步数，因此可以忽略这一细节（见 \cite{1812.06162}）。</Foot>：</Zh>
</Para>

<Equation :numbered="false"
  latex="B\left(L\right)=\frac{B_{\ast}}{L^{1/\alpha_{B}}}."
  :tips="{ B: '临界批量大小', L: '交叉熵损失', 'B_{\\ast}': '临界批量的特征尺度', '\\alpha_B': '批量项幂律指数' }" />

<Para>
  <En>We would like to determine optimal training parameters for a fixed compute budget, so we replace $S=C/\left(6NB\left(L\right)\right)$, where $C$ is the number of FLOPs used in the training run:</En>
  <Zh>我们想确定固定算力预算下的最优训练参数，因此代入 $S=C/\left(6NB\left(L\right)\right)$，其中 $C$ 是训练运行所用的浮点运算次数：</Zh>
</Para>

<Equation label="eq:loss-params-compute"
  latex="L\left(N,C\right)=\left(\frac{N_{c}}{N}\right)^{\alpha_{N}}+\left(6B_{\ast}S_{c}\frac{N}{L^{1/\alpha_{B}}C}\right)^{\alpha_{S}}."
  :tips="{ L: '交叉熵损失', N: '模型参数量', C: '训练运行所用的浮点运算次数（FLOPs）', 'N_{c}': '参数量特征尺度', 'B_{\\ast}': '临界批量的特征尺度', 'S_{c}': '步数特征尺度', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数', '\\alpha_B': '批量项幂律指数' }" />

<Para>
  <En>Now, we set $\partial_{N}L\big|_{C}=0$ to find the condition for optimality:</En>
  <Zh>现在令 $\partial_{N}L\big|_{C}=0$ 以求最优性条件：</Zh>
</Para>

<Equation label="eq:compute-optimality"
  latex="\begin{aligned}
0 & =\frac{\partial L}{\partial N}\big|_{C}\nonumber \\
 & =-\frac{\alpha_{N}}{N}\left(\frac{N_{c}}{N}\right)^{\alpha_{N}}+\frac{\alpha_{S}}{N}\left(6B_{\ast}S_{c}\frac{N}{L^{1/\alpha_{B}}C}\right)^{\alpha_{S}}\left(1-5\frac{N}{L}\cancel{\frac{\partial L}{\partial N}\big|_{C}}\right)\nonumber \\
\implies\frac{\alpha_{N}}{\alpha_{S}}\left(\frac{N_{c}}{N}\right)^{\alpha_{N}} & =\left(6B_{\ast}S_{c}\frac{N}{L^{1/\alpha_{B}}C}\right)^{\alpha_{S}}
\end{aligned}"
  :tips="{ L: '交叉熵损失', N: '模型参数量', C: '训练运行所用的浮点运算次数（FLOPs）', 'N_{c}': '参数量特征尺度', 'B_{\\ast}': '临界批量的特征尺度', 'S_{c}': '步数特征尺度', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数', '\\alpha_B': '批量项幂律指数' }" />

<Para>
  <En>Equation \eqref{eq:loss-params-compute} and \eqref{eq:compute-optimality} together determine the compute-efficient frontier.</En>
  <Zh>公式 \eqref{eq:loss-params-compute} 与 \eqref{eq:compute-optimality} 共同确定了算力高效前沿。</Zh>
</Para>

<Heading :level="2" en="Efficient Training" zh="高效训练" />

<Para>
  <En>Now we assemble the implications of \eqref{eq:loss-params-compute} and \eqref{eq:compute-optimality}. First, note that inserting \eqref{eq:compute-optimality} into \eqref{eq:loss-params-compute} yields</En>
  <Zh>现在我们整理 \eqref{eq:loss-params-compute} 与 \eqref{eq:compute-optimality} 的推论。首先注意，将 \eqref{eq:compute-optimality} 代入 \eqref{eq:loss-params-compute} 得到</Zh>
</Para>

<Equation :numbered="false"
  latex="L\left(N_{\rm eff}\left(C\right),C\right)=\left(1+\frac{\alpha_{N}}{\alpha_{S}}\right)L\left(N_{\rm eff},\infty\right),"
  :tips="{ 'N_{\\rm eff}': '算力高效前沿上的最优模型规模', C: '计算预算（FLOPs）', L: '交叉熵损失', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数' }" />

<Para>
  <En>which implies that for compute-efficient training, we should train to a \textbf{fixed percentage} $\frac{\alpha_{N}}{\alpha_{S}}\approx10\%$ above the converged loss.</En>
  <Zh>这意味着算力高效的训练应在收敛损失之上\textbf{固定百分比} $\frac{\alpha_{N}}{\alpha_{S}}\approx10\%$ 处停止。</Zh>
</Para>

<Para>
  <En>Next, let's determine how the optimal loss depends on the compute budget. Eliminating $N$ yields a power-law dependence of performance on compute:</En>
  <Zh>接下来确定最优损失如何依赖于算力预算。消去 $N$ 得到性能对算力的幂律依赖：</Zh>
</Para>

<Equation :numbered="false"
  latex="L\left(C\right)=\left(\frac{C_{c}}{C}\right)^{\alpha_{C}}"
  :tips="{ L: '交叉熵损失', C: '计算预算（FLOPs）', 'C_{c}': '计算量特征尺度', '\\alpha_C': '计算项幂律指数' }" />

<Para>
  <En>where we defined</En>
  <Zh>其中定义了</Zh>
</Para>

<Equation :numbered="false"
  latex="\begin{aligned}
\alpha_{C} & =1/\left(1/\alpha_{S}+1/\alpha_{B}+1/\alpha_{N}\right)\approx0.052\\
C_{c} & =6N_{c}B_{\ast}S_{c}\left(1+\frac{\alpha_{N}}{\alpha_{S}}\right)^{1/\alpha_{S}+1/\alpha_{N}}\left(\frac{\alpha_{S}}{\alpha_{N}}\right)^{1/\alpha_{S}}.
\end{aligned}"
  :tips="{ '\\alpha_C': '计算项幂律指数', 'C_{c}': '计算量特征尺度', '\\alpha_S': '步数项幂律指数', '\\alpha_B': '批量项幂律指数', '\\alpha_N': '参数项幂律指数', 'N_{c}': '参数量特征尺度', 'B_{\\ast}': '临界批量的特征尺度', 'S_{c}': '步数特征尺度' }" />

<Para>
  <En>Similarly, we can eliminate $L$ to find $N\left(C\right)$:</En>
  <Zh>类似地，消去 $L$ 可得 $N\left(C\right)$：</Zh>
</Para>

<Equation :numbered="false"
  latex="\begin{aligned}
\frac{N\left(C\right)}{N_{c}}=\left(\frac{C}{C_{c}}\right)^{\alpha_{C}/\alpha_{N}}\left(1+\frac{\alpha_{N}}{\alpha_{S}}\right)^{1/\alpha_{N}}
\end{aligned}"
  :tips="{ 'N\\left(C\\right)': '给定计算预算下的最优参数量', C: '计算预算（FLOPs）', 'N_{c}': '参数量特征尺度', 'C_{c}': '计算量特征尺度', '\\alpha_C': '计算项幂律指数', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数' }" />

<Para>
  <En>and</En>
  <Zh>以及</Zh>
</Para>

<Equation :numbered="false"
  latex="\begin{aligned}
S\left(C\right) & =\frac{C_{c}}{6N_{c}B_{\ast}}\left(1+\frac{\alpha_{N}}{\alpha_{S}}\right)^{-1/\alpha_{N}}\left(\frac{C}{C_{c}}\right)^{\alpha_{C}/\alpha_{S}}
\end{aligned}"
  :tips="{ 'S\\left(C\\right)': '给定计算预算下的最优训练步数', C: '计算预算（FLOPs）', 'C_{c}': '计算量特征尺度', 'N_{c}': '参数量特征尺度', 'B_{\\ast}': '临界批量的特征尺度', '\\alpha_C': '计算项幂律指数', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数' }" />

<Heading :level="2" en="Comparison to Inefficient" zh="与低效训练的比较" />

<Para>
  <En>Typically, researchers train models until they appear to be close to convergence. In this section, we compare the efficient training procedure described above to this more typical setup. We define a the convergence factor $f$ as the percent deviation from the converged loss:</En>
  <Zh>通常，研究者会训练模型直到看起来接近收敛。本节将上述高效训练流程与这种更典型的设置进行比较。我们定义收敛因子 $f$ 为相对收敛损失的百分比偏差：</Zh>
</Para>

<Equation :numbered="false"
  latex="L\left(N,C\right)=\left(1+f\right)L\left(N,\infty\right)."
  :tips="{ L: '交叉熵损失', N: '模型参数量', C: '计算预算（FLOPs）', f: '收敛因子（相对收敛损失的百分比偏差）' }" />

<Para>
  <En>For compute-efficient training we have $f=\alpha_{N}/\alpha_{S}\approx10\%$ from the previous section, but researchers typically use a much smaller value. Here, we choose $f^{\prime}=2\%$ as an estimate. For a fixed value of the loss, we predict:</En>
  <Zh>由上一节，算力高效训练取 $f=\alpha_{N}/\alpha_{S}\approx10\%$，但研究者通常使用小得多的值。这里我们取 $f^{\prime}=2\%$ 作为估计。在固定损失值下，我们预测：</Zh>
</Para>

<Equation :numbered="false"
  latex="\begin{aligned}
\frac{N_{f}}{N_{f^{\prime}}} & =\left(\frac{1+f}{1+f^{\prime}}\right)^{1/\alpha_{N}}\approx2.7\\
\frac{S_{f}}{S_{f^{\prime}}} & =\left(\frac{1+\frac{1}{f}}{1+\frac{1}{f^{\prime}}}\right)^{1/\alpha_{S}}\approx0.13\\
\frac{C_{f}}{C_{f^{\prime}}} & =\frac{N_{f}}{N_{f^{\prime}}}\frac{S_{f}}{S_{f^{\prime}}}\approx0.35
\end{aligned}"
  :tips="{ 'N_{f}': '收敛因子取 f 时的模型参数量', 'S_{f}': '收敛因子取 f 时的训练步数', 'C_{f}': '收敛因子取 f 时的计算量', 'N_{f^{\\prime}}': '收敛因子取 f′ 时的模型参数量', 'S_{f^{\\prime}}': '收敛因子取 f′ 时的训练步数', 'C_{f^{\\prime}}': '收敛因子取 f′ 时的计算量', f: '收敛因子（高效训练取 10%）', 'f^{\\prime}': '收敛因子（典型设置取 2%）', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数' }" />

<Para>
  <En>So that compute-efficient training uses 7.7x fewer parameter updates, 2.7x more parameters, and 65\% less compute to reach the same loss.</En>
  <Zh>也就是说，算力高效训练只需 1/7.7 的参数更新次数、2.7 倍的参数量和少 65\% 的算力即可达到同样的损失。</Zh>
</Para>

<Heading :level="2" label="sec:suboptimal-models" en="Suboptimal Model Sizes" zh="次优模型规模" />

<Para>
  <En>We can solve A.1 to find an expression for the amount of compute needed to reach a given value of the loss $L$ with a model of size $N$:</En>
  <Zh>求解 A.1 可以得到规模为 $N$ 的模型达到给定损失 $L$ 所需算力的表达式：</Zh>
</Para>

<Equation :numbered="false"
  latex="C\left(N,L\right)=\left(6B_{\ast}S_{c}\frac{N}{L^{1/\alpha_{B}}}\right)\left(L-\left(\frac{N_{c}}{N}\right)^{\alpha_{N}}\right)^{-1/\alpha_{S}}."
  :tips="{ 'C\\left(N,L\\right)': '规模为 N 的模型达到损失 L 所需的计算量', N: '模型参数量', L: '交叉熵损失', 'B_{\\ast}': '临界批量的特征尺度', 'S_{c}': '步数特征尺度', 'N_{c}': '参数量特征尺度', '\\alpha_B': '批量项幂律指数', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数' }" />

<Para>
  <En>Using A.6 and A.9, we can eliminate $L$ in favor of $N_{\rm eff}}\left(L\right)$, the model size which reaches $L$ most efficiently. From there, we find an expression for the excess compute needed as a consequence of using a suboptimal model size:</En>
  <Zh>利用 A.6 与 A.9，我们可以消去 $L$ 而改用 $N_{\rm eff}}\left(L\right)$——以最高效率达到 $L$ 的模型规模。由此我们得到因使用次优模型规模而需要的额外算力的表达式：</Zh>
</Para>

<Equation :numbered="false"
  latex="\frac{C\left(N,N_{\rm eff}\right)}{C\left(N_{\rm eff},N_{\rm eff}\right)}=\frac{N}{N_{\rm eff}}\left[1+\frac{\alpha_{S}}{\alpha_{N}}\left(1-\left(\frac{N_{\rm eff}}{N}\right)^{\alpha_{N}}\right)\right]^{-1/\alpha_{S}}."
  :tips="{ 'C\\left(N,N_{\\rm eff}\\right)': '用规模为 N 的模型达到 N_eff 对应损失所需的计算量', 'C\\left(N_{\\rm eff},N_{\\rm eff}\\right)': '用最优规模模型达到同一损失所需的计算量', N: '实际使用的模型参数量', 'N_{\\rm eff}': '算力高效前沿上的最优模型规模', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数' }" />

<Para>
  <En>The result is shown in Figure X. Models between 0.6x and 2.2x the optimal size can be used with only a 20\% increase in compute budget. Using a smaller model is useful when accounting for the cost inference. A larger model can be trained the the same level of performance in fewer steps, allowing for more parallelism and faster training if sufficient harware is available (see Figure Y):</En>
  <Zh>结果示于图 X。介于最优规模 0.6 倍到 2.2 倍之间的模型，只需增加 20\% 的算力预算即可使用。在计入推理成本时，使用较小的模型是有用的。较大的模型能以更少步数训练到同样的性能水平，若硬件充足则允许更高并行度与更快训练（见图 Y）：</Zh>
</Para>

<Equation :numbered="false"
  latex="\frac{S\left(N,N_{\rm eff}\right)}{S\left(N_{\rm eff},N_{\rm eff}\right)}=\left[1+\frac{\alpha_{S}}{\alpha_{N}}\left(1-\left(\frac{N_{\rm eff}}{N}\right)^{\alpha_{N}}\right)\right]^{-1/\alpha_{S}}."
  :tips="{ 'S\\left(N,N_{\\rm eff}\\right)': '用规模为 N 的模型达到 N_eff 对应损失所需的步数', 'S\\left(N_{\\rm eff},N_{\\rm eff}\\right)': '用最优规模模型达到同一损失所需的步数', N: '实际使用的模型参数量', 'N_{\\rm eff}': '算力高效前沿上的最优模型规模', '\\alpha_N': '参数项幂律指数', '\\alpha_S': '步数项幂律指数' }" />

<Para>
  <En>A 2.2x larger model requires 45\% fewer steps at a cost of 20\% more training compute. Note that this equation should not be trusted for very large models, as it is only valid in the power-law region of the learning curve after initial transient effects.</En>
  <Zh>大 2.2 倍的模型所需步数少 45\%，代价是多 20\% 的训练算力。注意对于非常大的模型不应轻信该方程，因为它只在越过初始瞬变效应后的学习曲线幂律区间内有效。</Zh>
</Para>
</template>
