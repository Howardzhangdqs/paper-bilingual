<!-- Scaling Laws with Model Size and Training Time -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Figure, Table, Td, Th } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:ScalingSizeandSteps" en="Scaling Laws with Model Size and Training Time" zh="模型规模与训练时间的缩放律" />

<Para>
  <En>In this section we will demonstrate that a simple scaling law provides a good description for the loss as a function of model size $N$ and training time.  First we will explain how to use the results of \cite{1812.06162}  to define a universal training step $S_{\rm min}$, which accounts for the fact that most of our models have not been trained at an optimal batch size.   Then we will demonstrate that we can fit the model size and training time dependence of the loss using Equation \eqref{eq:FundamentalLikelihioodvsModelandSteps}.  Later we will use these results to predict the optimal allocation of training compute between model size and training time, and then confirm that prediction.</En>
  <Zh>本节将证明一个简单的缩放律就能很好地描述损失随模型规模 $N$ 和训练时间的变化。首先我们说明如何利用 \cite{1812.06162} 的结果定义一个通用的训练步数 $S_{\rm min}$，以顾及我们大多数模型并未在最优批量下训练这一事实。随后我们将证明可以用公式 \eqref{eq:FundamentalLikelihioodvsModelandSteps} 拟合损失对模型规模与训练时间的依赖。之后我们会用这些结果预测训练算力在模型规模与训练时间之间的最优分配，并验证该预测。</Zh>
</Para>

<Heading :level="2" label="sec:OptimalBatchSize" en="Adjustment for Training at B_crit(L)" zh="按 B_crit(L) 训练的修正" />

<Figure src="figures/2001.08361/CriticalBatchSizeVsPerf.svg" :width="60" label="fig:OptimalBatchSize"
  caption-en="The critical batch size $B_{\rm crit}$ follows a power law in the loss as performance increase, and does not depend directly on the model size.  We find that the critical batch size approximately doubles for every $13\%$ decrease in loss.  $B_{\rm crit}$  is measured empirically from the data shown in Figure \ref{fig:BatchPareto}, but it is also roughly predicted by the gradient noise scale, as in \cite{1812.06162}."
  caption-zh="临界批量大小 $B_{\rm crit}$ 随性能提升按损失的幂律变化，且不直接依赖于模型规模。我们发现损失每下降 $13\%$，临界批量大约翻一倍。$B_{\rm crit}$ 由图 \ref{fig:BatchPareto} 所示数据经验测得，但也可如 \cite{1812.06162} 那样由梯度噪声尺度大致预测。" />

<Para>
  <En>A simple empirical theory for the batch size dependence of training was developed in \cite{1812.06162} (see also \cite{1811.03600, DBLP:journals/corr/abs-1907-04164}).  It was argued that there is a critical batch size $B_{\rm crit}$ for training; for $B$ up to $B_{\rm crit}$  the batch size can be increased with very minimal degradation in compute-efficiency, whereas for $B > B_{\rm crit}$ increases in $B$ result in diminishing returns.  It was also argued that the gradient noise scale provides a simple prediction for $B_{\rm crit}$, and that neither depends directly on model size except through the value of the loss that has been attained.  These results can be used to predict how training time and compute will vary with the batch size.  To utilize both training time and compute as effectively as possible, it is best to train with a batch size $B \approx B_{\rm crit}$.  Training at $B \gg B_{\rm crit}$  minimizes the number of training steps, while $B \ll B_{\rm crit}$ minimizes the use of compute.</En>
  <Zh>\cite{1812.06162} 发展了一个关于训练对批量大小依赖的简单经验理论（另见 \cite{1811.03600, DBLP:journals/corr/abs-1907-04164}）。该理论认为存在一个临界批量大小 $B_{\rm crit}$：当 $B$ 不超过 $B_{\rm crit}$ 时，增大批量几乎不会降低算力效率；而当 $B > B_{\rm crit}$ 时，继续增大 $B$ 的收益递减。该理论还认为梯度噪声尺度为 $B_{\rm crit}$ 提供了简单的预测，且两者除通过已达到的损失值外都不直接依赖于模型规模。这些结果可用于预测训练时间与算力如何随批量变化。为了尽可能充分利用训练时间与算力，最好以 $B \approx B_{\rm crit}$ 的批量训练。以 $B \gg B_{\rm crit}$ 训练可使训练步数最少，而 $B \ll B_{\rm crit}$ 则使算力消耗最少。</Zh>
</Para>

<Para>
  <En>More specifically, it was demonstrated that for a wide variety of neural network tasks, the number of training steps $S$ and the number of data examples processed $E = B S$ satisfy the simple relation</En>
  <Zh>更具体地说，已有工作证明，对种类繁多的神经网络任务，训练步数 $S$ 与处理的数据样本数 $E = B S$ 满足如下简单关系</Zh>
</Para>

<Equation label="eq:TimeComputeTradeoff" latex="\left( \frac{S}{S_{\rm min}} -1 \right) \left( \frac{E}{E_{\rm min}} - 1 \right) = 1"
  :tips="{ S: '实际使用的训练步数', 'S_{\\rm min}': '达到目标损失所需的最少步数', E: '处理的数据样本总数（E = BS）', 'E_{\\rm min}': '必须处理的最少数据样本数' }" />

<Para>
  <En>when training to any fixed value of the loss $L$.  Here $S_{\rm min}$ is the minimum number of steps necessary to reach $L$, while $E_{\rm min}$ is the minimum number of data examples that must be processed.</En>
  <Zh>在训练到任意固定损失值 $L$ 时成立。其中 $S_{\rm min}$ 是达到 $L$ 所需的最少步数，而 $E_{\rm min}$ 是必须处理的最少数据样本数。</Zh>
</Para>

<Para>
  <En>We demonstrate the relation \eqref{eq:TimeComputeTradeoff} for Transformers in Figure \ref{fig:BatchPareto} in the appendix. This relation defines the critical batch size</En>
  <Zh>我们在附录图 \ref{fig:BatchPareto} 中针对 Transformer 验证了关系 \eqref{eq:TimeComputeTradeoff}。该关系定义了临界批量大小：</Zh>
</Para>

<Equation label="eq:DefinitionBcrit" latex="B_{\rm crit}(L) \equiv \frac{E_{\rm min}}{S_{\rm min}}"
  :tips="{ 'B_{\\rm crit}(L)': '目标损失对应的临界批量大小', 'E_{\\rm min}': '必须处理的最少数据样本数', 'S_{\\rm min}': '达到目标损失所需的最少步数' }" />

<Para>
  <En>which is a function of the target value of the loss.  Training at the critical batch size makes a roughly optimal time/compute tradeoff, requiring $2 S_{\rm min}$ training steps and processing $E = 2 E_{\rm min}$ data examples.</En>
  <Zh>它是目标损失值的函数。以临界批量大小训练可以在时间/算力之间取得大致最优的折中：需要 $2 S_{\rm min}$ 步训练、处理 $E = 2 E_{\rm min}$ 个数据样本。</Zh>
</Para>

<Para>
  <En>In Figure \ref{fig:OptimalBatchSize} we have plotted the critical batch size and gradient noise scale\footnote{Although the critical batch size roughly matches the gradient noise scale, we are using a direct measurements of $B_{\rm crit}$ from Figures \ref{fig:BatchPareto} and \ref{fig:OptimalBatchSize} for all our later analyses.  } as a function of training loss for two different models.  We see that $B_{\rm crit}(L)$ is  independent of model size, and only depends on the loss $L$.  So the predictions of \cite{1812.06162} continue to hold for Transformer language models.  The critical batch size can be fit with a power-law in the loss</En>
  <Zh>图 \ref{fig:OptimalBatchSize} 画出了两个不同模型的临界批量大小与梯度噪声尺度\footnote{尽管临界批量大小与梯度噪声尺度大致相符，我们在后续所有分析中都使用从图 \ref{fig:BatchPareto} 和图 \ref{fig:OptimalBatchSize} 直接测得的 $B_{\rm crit}$。}随训练损失的变化。可以看到 $B_{\rm crit}(L)$ 与模型规模无关，只依赖于损失 $L$。因此 \cite{1812.06162} 的预测对 Transformer 语言模型依然成立。临界批量大小可用损失的幂律拟合：</Zh>
</Para>

<Equation latex="B_{\rm crit}(L) \approx \frac{B_*}{L^{1/\alpha_B}}"
  :tips="{ 'B_{\\rm crit}(L)': '目标损失对应的临界批量大小', 'B_*': '幂律拟合的系数（约 2×10^8）', '\\alpha_B': '幂律拟合的指数（约 0.21）' }" />

<Para>
  <En>where $B_* \approx 2 \times 10^8$ and $\alpha_B \approx 0.21$.</En>
  <Zh>其中 $B_* \approx 2 \times 10^8$，$\alpha_B \approx 0.21$。</Zh>
</Para>

<Para>
  <En>We have chosen this parameterization for $B_{\rm crit}(L)$ because as the loss approaches its minimum value $L_{\rm min}$, the gradient noise scale is expected to diverge, and we expect $B_{\rm crit}$ to track this noise scale.  We do not know $L_{\rm min}$, as we see no sign that our models are approaching it, but $L_{\rm min} > 0$ since the entropy of natural language is non-zero.  Since apparently $L_{\rm min}$ is much smaller than the values of $L$ we have achieved, we used a parameterization where $B_{\rm crit}$ diverges as $L \to 0$. </En>
  <Zh>我们为 $B_{\rm crit}(L)$ 选择这一参数化形式，是因为当损失接近其最小值 $L_{\rm min}$ 时，梯度噪声尺度预期会发散，而我们预期 $B_{\rm crit}$ 会跟随这一噪声尺度。我们并不知道 $L_{\rm min}$，因为没有看到模型趋近它的迹象；但由于自然语言的熵非零，$L_{\rm min} > 0$。由于 $L_{\rm min}$ 显然远小于我们已达到的 $L$ 值，我们采用了 $B_{\rm crit}$ 在 $L \to 0$ 时发散的参数化形式。</Zh>
</Para>

<Para>
  <En>We will use $B_{\rm crit}(L)$ to estimate the relation between the number of training steps $S$ while training at batch size $B = 2^{19}$ tokens and the number of training steps while training at $B \gg B_{\rm crit}$.  This is simply</En>
  <Zh>我们将利用 $B_{\rm crit}(L)$ 来估计“在批量 $B = 2^{19}$ 词元下训练所需的步数 $S$”与“在 $B \gg B_{\rm crit}$ 下训练所需步数”之间的关系。它就是</Zh>
</Para>

<Equation label="eq:AdjustedSteps" latex="S_{\rm min}(S) \equiv \frac{S}{1 + B_{\rm crit}(L)/B} \qquad (\text{minimum steps, at } B \gg B_{\rm crit})"
  :tips="{ 'S_{\\rm min}(S)': '换算到临界批量下的等效最少步数', S: '批量 B 下的实际训练步数', 'B_{\\rm crit}(L)': '目标损失对应的临界批量大小', B: '训练批量大小' }" />

<Para>
  <En>for any given target value $L$ for the loss.  This also defines a critical value of the compute needed to train to $L$ with a model of size $N$ if we were to train at $B \ll B_{\rm crit}(L)$. This is</En>
  <Zh>对任意给定的目标损失值 $L$ 成立。它同时定义了：若在 $B \ll B_{\rm crit}(L)$ 下训练，规模为 $N$ 的模型训练到 $L$ 所需算力的临界值，即</Zh>
</Para>

<Equation label="eq:AdjustedCompute" latex="C_{\rm min}(C) \equiv \frac{C  }{1 + B/B_{\rm crit}(L) } \qquad (\text{minimum compute, at } B \ll B_{\rm crit})"
  :tips="{ 'C_{\\rm min}(C)': '换算到临界批量下的等效最少算力', C: '批量 B 下使用的算力', 'B_{\\rm crit}(L)': '目标损失对应的临界批量大小', B: '训练批量大小' }" />

<Para>
  <En>where $C = 6 N BS$ estimates the (non-embedding) compute used at batch size $B$.</En>
  <Zh>其中 $C = 6 N BS$ 估计批量 $B$ 下使用的（非嵌入）算力。</Zh>
</Para>

<Heading :level="2" en="Results for L(N, S_min) and Performance with Model Size and Compute" zh="L(N, S_min) 的结果及模型规模与算力对应的性能" />

<Figure src="figures/2001.08361/PerfVsParams-ComputeBudget.svg" :width="47" label="fig:ComputevsParamsvsPerformance"
  caption-en="When we hold either total compute or number of training steps fixed, performance follows $L(N,S)$ from Equation \eqref{eq:FundamentalLikelihioodvsModelandSteps2}.  Each value of compute budget has an associated optimal model size that maximizes performance.  Mediocre fits at small $S$ are unsurprising, as the power-law equation for the learning curves breaks down very early in training."
  caption-zh="当固定总算力或训练步数之一时，性能遵循公式 \eqref{eq:FundamentalLikelihioodvsModelandSteps2} 的 $L(N,S)$。每个算力预算值都对应一个使性能最大化的最优模型规模。$S$ 较小时拟合欠佳并不意外，因为学习曲线的幂律方程在训练极早期便失效。" />

<Para>
  <En>Now we will use $S_{\rm min}$ defined in Equation \eqref{eq:AdjustedSteps} to obtain a  simple and universal fit for the dependence of the loss on model size and training time in the infinite data limit.  We will fit the stable, Adam-optimized training runs using Equation \eqref{eq:FundamentalLikelihioodvsModelandSteps}, repeated here for convenience:</En>
  <Zh>现在我们利用公式 \eqref{eq:AdjustedSteps} 定义的 $S_{\rm min}$，为无限数据极限下损失对模型规模与训练时间的依赖得到一个简单而普适的拟合。我们用公式 \eqref{eq:FundamentalLikelihioodvsModelandSteps}（为方便起见重述于此）拟合稳定的 Adam 优化训练运行：</Zh>
</Para>

<Equation label="eq:FundamentalLikelihioodvsModelandSteps2" latex="L(N, S_{\rm min}) = \left( \frac{N_c}{N} \right)^{\alpha_N}  + \left( \frac{S_c }{S_{\rm min}} \right)^{\alpha_S}"
  :tips="{ L: '模型在留出数据上的交叉熵损失', N: '模型参数量', 'S_{\\rm min}': '换算到临界批量下的等效训练步数', 'N_c': '参数项的尺度常数', '\\alpha_N': '参数项的幂律指数', 'S_c': '步数项的尺度常数', '\\alpha_S': '步数项的幂律指数' }" />

<Para>
  <En>for the loss.  We include all training steps after the warmup period of the learning rate schedule, and find  a fit to the data with the parameters:</En>
  <Zh>上式拟合损失。我们纳入学习率调度预热期之后的所有训练步，得到如下参数的数据拟合：</Zh>
</Para>

<Table caption-en="Fits to $L(N, S)$" caption-zh="$L(N, S)$ 的拟合">
  <tr>
    <Th align="center">Parameter</Th>
    <Th align="center">$\alpha_N$</Th>
    <Th align="center">$\alpha_S$</Th>
    <Th align="center">$N_c$</Th>
    <Th align="center">$S_c$</Th>
  </tr>
  <tr>
    <Td align="center">Value</Td>
    <Td align="center">$0.077$</Td>
    <Td align="center">$0.76$</Td>
    <Td align="center">$6.5 \times 10^{13}$</Td>
    <Td align="center">$2.1 \times 10^3$</Td>
  </tr>
</Table>

<Para>
  <En>With these parameters, we obtain the learning curve fits in Figure \ref{fig:LearningCurveFitsandResiduals}.  Though the fits are imperfect, we believe they are quite compelling given the simplicity of Equation \eqref{eq:FundamentalLikelihioodvsModelandSteps2}.</En>
  <Zh>采用这些参数，我们得到图 \ref{fig:LearningCurveFitsandResiduals} 中的学习曲线拟合。尽管拟合并不完美，但考虑到公式 \eqref{eq:FundamentalLikelihioodvsModelandSteps2} 的简单性，我们认为它相当有说服力。</Zh>
</Para>

<Para>
  <En>The data and fits can be visualized in a different and more interesting way, as shown in Figure \ref{fig:ComputevsParamsvsPerformance}.  There we study the test loss as a function of model size while fixing either the total non-embedding compute $C$ used in training, or the number of steps $S$.  For the fits we use Equation \eqref{eq:AdjustedCompute} and \eqref{eq:AdjustedSteps} along with the parameters above and Equation \eqref{eq:FundamentalLikelihioodvsModelandSteps2}.</En>
  <Zh>数据和拟合还可以用另一种更有趣的方式可视化，如图 \ref{fig:ComputevsParamsvsPerformance} 所示。在那里，我们分别固定训练使用的非嵌入总算力 $C$ 或步数 $S$，研究测试损失随模型规模的变化。拟合使用公式 \eqref{eq:AdjustedCompute} 与 \eqref{eq:AdjustedSteps}、上述参数以及公式 \eqref{eq:FundamentalLikelihioodvsModelandSteps2}。</Zh>
</Para>

<Para>
  <En>The power-law dependence of the loss on $S_{\rm min}$ reflects the interplay of optimizer dynamics and the loss landscape.    Since the fits are best late in training, when the loss may be approximately quadratic, the power-law should provide information about the spectrum of the Hessian of the loss.  Its universality suggests that the Hessian eigenvalue density is roughly independent of model size.  </En>
  <Zh>损失对 $S_{\rm min}$ 的幂律依赖反映了优化器动力学与损失地形之间的相互作用。由于拟合在训练后期最佳——此时损失可能近似为二次型——该幂律应能提供损失 Hessian 谱的信息。其普适性表明 Hessian 特征值密度与模型规模基本无关。</Zh>
</Para>

<Heading :level="2" label="sec:EarlyStop" en="Lower Bound on Early Stopping Step" zh="早停步数的下界" />

<Para>
  <En>The results for $L(N,S_{\rm min})$ can be used to derive a lower-bound (and rough estimate) of the step at which early stopping should occur when training is data limited.  It is motivated by the idea that finite and infinite $D$ learning curves for a given model will be very similar until we reach $S_{\rm min} \approx S_{\rm stop}$. Thus overfitting should be proportional to the correction from simply ending  training at $S_{\rm stop}$.  This will underestimate $S_{\rm stop}$, because in reality the test loss will decrease more slowly when we have a finite $D$, and therefore we will require more training steps to reach the optimal test loss at finite $D$.  This line of reasoning leads to the inequality</En>
  <Zh>$L(N,S_{\rm min})$ 的结果可用于推导“数据受限训练时早停应发生的步数”的下界（及粗略估计）。其动机是这样一种想法：对给定模型，有限 $D$ 与无限 $D$ 的学习曲线在到达 $S_{\rm min} \approx S_{\rm stop}$ 之前非常相似。因此过拟合应与“直接在 $S_{\rm stop}$ 处结束训练”所对应的修正成正比。这会低估 $S_{\rm stop}$，因为实际上 $D$ 有限时测试损失下降更慢，需要更多训练步数才能达到有限 $D$ 下的最优测试损失。这一推理导致不等式</Zh>
</Para>

<Equation label="eq:EarlyStopInequality" latex="S_{\rm stop}(N,D)  \gtrsim \frac{S_c}{\left[ L(N,D) - L(N, \infty) \right]^{1 / \alpha_S}}"
  :tips="{ 'S_{\\rm stop}(N,D)': '数据受限训练时应早停的步数（下界）', 'S_c': '步数项的尺度常数', 'L(N, \\infty)': '无限数据下的收敛损失', '\\alpha_S': '步数项的幂律指数' }" />

<Para>
  <En>where $L(N, \infty)$ is the converged loss, evaluated with infinite available data.  This inequality and its comparison to the empirical data is displayed in Figure \ref{fig:OverfittingandEarlyStopping} in the appendix.  In that figure, the values of $S_{\rm stop}$ and $L(N,D)$ are empirical (though $S_{\rm stop}$ is adjusted to mimic training at $B \gg B_{\rm crit}$), while $L(N, \infty)$ is computed from the fit to $L(N,D)$ evaluated at $D=\infty$.</En>
  <Zh>其中 $L(N, \infty)$ 是在无限可用数据下取值的收敛损失。该不等式及其与经验数据的比较见附录图 \ref{fig:OverfittingandEarlyStopping}。图中 $S_{\rm stop}$ 与 $L(N,D)$ 的值是经验的（不过 $S_{\rm stop}$ 经过调整以模拟 $B \gg B_{\rm crit}$ 下的训练），而 $L(N, \infty)$ 由 $L(N,D)$ 的拟合在 $D=\infty$ 处取值计算得到。</Zh>
</Para>

<Figure src="figures/2001.08361/SuboptimalModels.svg" :width="98" label="fig:SubOptimalModels"
  caption-en="\textbf{Left:} Given a fixed compute budget, a particular model size is optimal, though somewhat larger or smaller models can be trained with minimal additional compute. \textbf{Right:} Models larger than the compute-efficient size require fewer steps to train, allowing for potentially faster training if sufficient additional parallelism is possible. Note that this equation should not be trusted for very large models, as it is only valid in the power-law region of the learning curve, after initial transient effects."
  caption-zh="\textbf{左：}给定固定算力预算时，存在某个最优模型规模；略大或略小的模型只需极少的额外算力即可训练。\textbf{右：}大于算力最优规模的模型训练所需步数更少，若能投入足够的额外并行度，则有望更快完成训练。注意对于非常大的模型不应轻信该方程，因为它只在越过初始瞬变效应后的学习曲线幂律区间内有效。" />
</template>
