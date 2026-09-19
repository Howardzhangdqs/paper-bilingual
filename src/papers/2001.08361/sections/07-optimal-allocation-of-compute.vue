<!-- Optimal Allocation of the Compute Budget -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:OptimalCompute" en="Optimal Allocation of the Compute Budget" zh="算力预算的最优分配" />

<Para>
  <En>We displayed the \emph{empirical} trend of performance as a function of the computation used during training in the top-right of Figure \ref{fig:BasicPowerLaws}.  However, this result involved training at a fixed batch size $B$, whereas we know that in fact we could train more efficiently\footnote{One might ask why we did not simply train at $B_{\rm crit}$ in the first place.  The reason is that it depends not only on the model but also on the target value of the loss we wish to achieve, and so is a moving target.} by training at the batch size $B_{\rm crit}$ discussed in Section \ref{sec:OptimalBatchSize}. Large and small values of the loss could have been achieved with fewer samples or fewer steps, respectively, and correcting for this inefficiency by standardizing to the critical batch size results in cleaner and more predictable trends.</En>
  <Zh>我们在图 \ref{fig:BasicPowerLaws} 右上角展示了性能随训练所用计算的\emph{经验}趋势。然而该结果是在固定批量 $B$ 下训练得到的，而我们知道，若按第 \ref{sec:OptimalBatchSize} 节讨论的批量 $B_{\rm crit}$ 训练，实际上可以更高效\footnote{有人可能会问，为什么不一开始就按 $B_{\rm crit}$ 训练。原因是 $B_{\rm crit}$ 不仅取决于模型，还取决于我们希望达到的目标损失值，因此是一个移动的目标。}。较大或较小的损失本可以分别用更少的样本或更少的步数达到；以临界批量为基准标准化来修正这一低效，可以得到更干净、更可预测的趋势。</Zh>
</Para>

<Figure src="figures/2001.08361/ComputeEfficientFrontierWithAdjustment.svg" :width="50" label="fig:ComputeEfficientAdjusted"
  caption-en="When adjusting performance to simulate training far below the critical batch size, we find a somewhat altered power law for $L(C_{\rm min})$ when compared with the fully empirical results.  The conspicuous lump at $10^{-5}$ PF-days marks the transition from 1-layer to 2-layer networks; we exclude 1-layer networks in the power-law fits.  It is the $L(C_{\rm min})$ trend that we expect to provide a reliable extrapolation for larger compute."
  caption-zh="将性能调整为模拟远低于临界批量的训练时，我们发现 $L(C_{\rm min})$ 的幂律与完全经验的结果相比略有变化。$10^{-5}$ PF-days 处显著的凸起标志着从 1 层到 2 层网络的过渡；幂律拟合中我们排除了 1 层网络。我们预期正是 $L(C_{\rm min})$ 趋势能为更大算力提供可靠外推。" />

<Para>
  <En>In this section we will adjust for this oversight. More importantly, we will use the results of Section \ref{sec:ScalingSizeandSteps} to determine the optimal \emph{allocation} of compute between model size $N$ and the quantity of data processed during training, namely $2 B_{\rm crit}  S_{\rm min}$.  We will determine this allocation both empirically and theoretically, by using the equation for $L(N, S_{\rm min})$, and we will demonstrate that these methods agree.</En>
  <Zh>本节将弥补这一疏漏。更重要的是，我们将利用第 \ref{sec:ScalingSizeandSteps} 节的结果确定算力在模型规模 $N$ 与训练期间处理的数据量（即 $2 B_{\rm crit}  S_{\rm min}$）之间的最优\emph{分配}。我们将分别从经验和理论（利用 $L(N, S_{\rm min})$ 方程）两方面确定这一分配，并证明两种方法一致。</Zh>
</Para>

<Heading :level="2" en="Optimal Performance and Allocations" zh="最优性能与分配" />

<Para>
  <En>Let us first study the loss as a function of the optimally allocated compute from Equation \eqref{eq:AdjustedCompute}.  The result is plotted in Figure \ref{fig:ComputeEfficientAdjusted}, along with a power-law fit.  We see that as compared to the compute plot of Figure \ref{fig:BasicPowerLaws}, the new fit with $C_{\rm min}$ is somewhat improved.  </En>
  <Zh>我们先研究损失作为公式 \eqref{eq:AdjustedCompute} 中最优分配算力的函数。结果连同幂律拟合一起绘于图 \ref{fig:ComputeEfficientAdjusted}。与图 \ref{fig:BasicPowerLaws} 的算力图相比，使用 $C_{\rm min}$ 的新拟合有所改善。</Zh>
</Para>

<Para>
  <En>Given $L(C_{\rm min})$, it is natural to ask for the optimal model size $N(C_{\rm min})$ that provides the minimal loss with a given quantity of training compute.  The optimal model size is shown in Figure \ref{fig:ComputevsPerformance}.  We observe that $N(C_{\rm min})$ can be fit very well with a power-law</En>
  <Zh>有了 $L(C_{\rm min})$，自然会问：给定训练算力量时，使损失最小的最优模型规模 $N(C_{\rm min})$ 是多少。最优模型规模见图 \ref{fig:ComputevsPerformance}。我们观察到 $N(C_{\rm min})$ 可以用幂律拟合得很好：</Zh>
</Para>

<Equation latex="N(C_{\rm min}) \propto (C_{\rm min})^{0.73}"
  :tips="{ 'N(C_{\\rm min})': '给定算力下损失最小的最优模型规模', 'C_{\\rm min}': '换算到临界批量下的等效最少算力' }" />

<Para>
  <En>In Figure \ref{fig:SubOptimalModels}, we show the effect of training models of sub-optimal sizes (see Appendix \ref{sec:suboptimal-models}).</En>
  <Zh>图 \ref{fig:SubOptimalModels} 展示了以次优规模训练模型的影响（见附录 \ref{sec:suboptimal-models}）。</Zh>
</Para>

<Para>
  <En>By definition $C_{\rm min} \equiv 6 N B_{\rm crit} S$, and so we can use $N(C_{\rm min})$ to extract further results.  In particular, since prior fits show $B \propto L^{-4.8}$ and $L \propto C_{\rm min}^{-0.05}$, we can conclude that $B_{\rm crit} \propto C_{\rm min}^{0.24}$.  This leads us to conclude that the optimal number of steps will only grow very slowly with compute, as</En>
  <Zh>由定义 $C_{\rm min} \equiv 6 N B_{\rm crit} S$，我们可以利用 $N(C_{\rm min})$ 提取更多结果。特别地，由于此前的拟合给出 $B \propto L^{-4.8}$ 和 $L \propto C_{\rm min}^{-0.05}$，可以得出 $B_{\rm crit} \propto C_{\rm min}^{0.24}$。由此我们得出结论：最优步数只会随算力增长得非常缓慢：</Zh>
</Para>

<Equation latex="S_{\rm min} \propto (C_{\rm min})^{0.03},"
  :tips="{ 'S_{\\rm min}': '换算到临界批量下的等效训练步数', 'C_{\\rm min}': '换算到临界批量下的等效最少算力' }" />

<Para>
  <En>matching the empirical results in Figure \ref{fig:ComputevsPerformance}.  In fact the measured exponent is sufficiently small that our results may even be consistent with an exponent of zero.  </En>
  <Zh>与图 \ref{fig:ComputevsPerformance} 中的经验结果相符。事实上，测得的指数足够小，以至于我们的结果甚至可能与零指数相容。</Zh>
</Para>

<Para>
  <En>Thus we conclude that as we scale up language modeling with an optimal allocation of computation, we should predominantly increase the model size $N$, while simultaneously scaling up the batch size  via $B \propto B_{\rm crit}$ with negligible increase in the number of serial steps.  Since compute-efficient training uses relatively few optimization steps, additional work on speeding up early training dynamics may be warranted.</En>
  <Zh>因此我们得出结论：在以最优算力分配扩展语言建模时，我们应主要增大模型规模 $N$，同时按 $B \propto B_{\rm crit}$ 增大批量，而串行步数的增加可以忽略不计。既然算力高效训练使用的优化步数相对较少，加快早期训练动力学方面的进一步工作或许是值得的。</Zh>
</Para>

<Figure src="figures/2001.08361/ComputevsOptimalModelSize.svg" :width="48" label="fig:ComputevsPerformance"
  caption-en="\textbf{Left:} Each value of the compute budget $C_{\rm min}$ has an associated optimal model size $N$.  Optimal model size grows very rapidly with $C_{\rm min}$, increasing by 5x for each 10x increase in compute.  The number of data examples processed makes up the remainder of the increase, growing relatively modestly by only 2x. \textbf{Right:} The batch-adjusted number of optimization steps also grows very slowly, if at all, meaning that most of the growth in data examples processed can be used for increased batch sizes."
  caption-zh="\textbf{左：}每个算力预算 $C_{\rm min}$ 值都对应一个最优模型规模 $N$。最优模型规模随 $C_{\rm min}$ 增长非常快：算力每增加 10 倍它增加 5 倍。处理的数据样本数构成其余增长，相对温和地只增加 2 倍。\textbf{右：}经批量调整的优化步数即使有增长也十分缓慢，这意味着处理数据样本数的增长大部分可用于增大批量。" />
<Figure src="figures/2001.08361/ComputeEfficientSteps.svg" :width="48" />

<Heading :level="2" en="Predictions from L(N, S_min)" zh="由 L(N, S_min) 出发的预测" />

<Para>
  <En>The results for $L(C_{\rm min})$ and the allocations can be predicted  from the $L(N, S_{\rm min})$ equation obtained in Section \ref{sec:ScalingSizeandSteps}.  Given our  equation for $L(N, S_{\rm min})$, we can substitute $S_{\rm min} = \frac{C_{\rm min}}{6 N B}$ and then find the minimum of the loss as a function of $N$, while fixing the training compute.  We carry out this procedure in detail  in Appendix \ref{app:ComputeEfficientTraining}, where we also provide some additional predictions.  </En>
  <Zh>$L(C_{\rm min})$ 的结果以及算力分配都可以从第 \ref{sec:ScalingSizeandSteps} 节得到的 $L(N, S_{\rm min})$ 方程预测出来。给定 $L(N, S_{\rm min})$ 方程，代入 $S_{\rm min} = \frac{C_{\rm min}}{6 N B}$，再在固定训练算力下求损失关于 $N$ 的最小值即可。我们在附录 \ref{app:ComputeEfficientTraining} 中详细执行了这一流程，并在那里给出了另外一些预测。</Zh>
</Para>

<Para>
  <En>For the loss as a function of training compute, we predict that</En>
  <Zh>对于损失随训练算力的变化，我们预测：</Zh>
</Para>

<Equation latex="L(C_{\rm min}) = \left( \frac{C_c^{\rm min}}{C_{\rm min}} \right)^{\alpha_C^{\rm min}}"
  :tips="{ 'L(C_{\\rm min})': '最优分配算力下的损失', 'C_{\\rm min}': '换算到临界批量下的等效最少算力', 'C_c^{\\rm min}': '算力项的尺度常数', '\\alpha_C^{\\rm min}': '算力项的幂律指数' }" />

<Para>
  <En>where</En>
  <Zh>其中</Zh>
</Para>

<Equation latex="\alpha_C^{\rm min} \equiv \frac{1}{1/\alpha_S + 1/\alpha_B + 1/\alpha_N} \approx 0.054"
  :tips="{ '\\alpha_C^{\\rm min}': '算力项的幂律指数（由各指数调和平均得到）', '\\alpha_S': '步数项的幂律指数', '\\alpha_B': '临界批量幂律的指数', '\\alpha_N': '参数项的幂律指数' }" />

<Para>
  <En>in excellent agreement with the exponent of Figure \ref{fig:ComputeEfficientAdjusted}.  We also predict that</En>
  <Zh>与图 \ref{fig:ComputeEfficientAdjusted} 的指数极为吻合。我们还预测：</Zh>
</Para>

<Equation latex="N(C_{\rm min}) \propto (C_{\rm min})^{\alpha_C^{\rm min} / \alpha_N} \approx  (C_{\rm min})^{0.71}"
  :tips="{ 'N(C_{\\rm min})': '给定算力下损失最小的最优模型规模', '\\alpha_C^{\\rm min}': '算力项的幂律指数', '\\alpha_N': '参数项的幂律指数' }" />

<Para>
  <En>which also matches the scaling of Figure \ref{fig:ComputevsPerformance} to within a few percent.  Our scaling laws provide a predictive framework for the performance of language modeling.</En>
  <Zh>它也与图 \ref{fig:ComputevsPerformance} 的标度在几个百分点内相符。我们的缩放律为语言建模性能提供了一个预测性框架。</Zh>
</Para>

<Heading :level="2" en="Contradictions and a Conjecture" zh="矛盾与一个猜想" />

<Figure src="figures/2001.08361/Contradiction.svg" :width="80" label="fig:Contradiction"
  caption-en="Far beyond the model sizes we study empirically, we find a contradiction between our equations for $L(C_{\rm min})$ and $L(D)$ due to the slow growth of data needed for compute-efficient training.  The intersection marks the point before which we expect our predictions to break down.  The location of this point is highly sensitive to the precise exponents from our power-law fits."
  caption-zh="在远超我们实证研究的模型规模之外，由于算力高效训练所需数据增长缓慢，我们发现 $L(C_{\rm min})$ 与 $L(D)$ 两个方程之间存在矛盾。交点标记了我们预计预测会失效之处。该点位置对幂律拟合的精确指数高度敏感。" />

<Para>
  <En>We observe no signs of deviation from straight power-law trends at large values of compute, data, or model size. Our trends must eventually level off, though, since natural language has non-zero entropy. </En>
  <Zh>在算力、数据或模型规模较大处，我们没有观察到任何偏离标准幂律趋势的迹象。不过，由于自然语言的熵非零，这些趋势最终必然会趋于平缓。</Zh>
</Para>

<Para>
  <En>Indeed, the trends for compute-efficient training described in this section already contain an apparent contradiction. At scales several orders of magnitude above those documented here, the performance predicted by the $L(C_{\rm min})$ scaling law decreases below what should be possible given the slow growth in training data with compute.  This implies that our scaling laws must break down before this point, but we conjecture that the intersection point has a deeper meaning: it provides an estimate of the point at which Transformer language models reach maximal performance.</En>
  <Zh>事实上，本节所述的算力高效训练趋势已包含一个明显的矛盾。在高于本文所记录尺度数个数量级处，$L(C_{\rm min})$ 缩放律预测的性能会降到“鉴于训练数据随算力缓慢增长所能达到的水平”之下。这意味着我们的缩放律必然在此之前失效，但我们猜想该交点有更深的含义：它给出了 Transformer 语言模型达到最大性能位置的估计。</Zh>
</Para>

<Para>
  <En>Since the amount of data used by compute-efficient training grows  slowly with the compute budget, the performance predicted by $L(C_{\rm min})$ eventually hits a lower bound set by the $L(D)$ power law (see Figure \ref{fig:Contradiction}).  Let us work this out in more detail.</En>
  <Zh>由于算力高效训练所用的数据量随算力预算增长缓慢，$L(C_{\rm min})$ 预测的性能最终会触及 $L(D)$ 幂律设定的下界（见图 \ref{fig:Contradiction}）。让我们更详细地推演这一点。</Zh>
</Para>

<Para>
  <En>To keep overfitting under control, the results of Section \ref{sec:ChartingOverfitting} imply that we should scale the dataset size as</En>
  <Zh>为控制过拟合，第 \ref{sec:ChartingOverfitting} 节的结果意味着数据集规模应按如下方式扩展：</Zh>
</Para>

<Equation label="eq:DataGrowthOverfitting" latex="D \propto N^{0.74} \propto C_{\rm min}^{0.54}"
  :tips="{ D: '数据集规模（训练词元数）', N: '模型参数量', 'C_{\\rm min}': '换算到临界批量下的等效最少算力' }" />

<Para>
  <En>where we have used the compute-efficient $N(C_{\rm min})$ from Figure \ref{fig:ComputevsPerformance}.</En>
  <Zh>其中使用了图 \ref{fig:ComputevsPerformance} 中算力高效的 $N(C_{\rm min})$。</Zh>
</Para>

<Para>
  <En>Let us compare this to the data requirements of compute-efficient training.  If we train at the critical batch size (i.e. $C=2C_{\rm min}$) and never re-use data during training, we find that data usage grows with compute as</En>
  <Zh>让我们将其与算力高效训练的数据需求比较。若在临界批量下训练（即 $C=2C_{\rm min}$）且训练期间从不重复使用数据，我们发现数据用量随算力增长为：</Zh>
</Para>

<Equation latex="D (C_{\rm min}) = \frac{2C_{\rm min}}{6 N(C_{\rm min})} \approx \left( 4 \times 10^{10}  \ {\rm tokens} \right) (C_{\rm min} / \mathrm{PF}{\text -}\mathrm{Day}  )^{0.26}"
  :tips="{ 'D(C_{\\rm min})': '临界批量下单轮训练所需的数据量', 'C_{\\rm min}': '换算到临界批量下的等效最少算力', 'N(C_{\\rm min})': '给定算力下的最优模型规模' }" />

<Para>
  <En>This is the maximum rate at which the dataset size can productively grow with compute, since it means that we are only training for a single epoch.  But it grows the dataset much more slowly than in Equation \eqref{eq:DataGrowthOverfitting}.  It appears to imply that compute-efficient training will eventually run into a problem with overfitting, even if the training process never re-uses any data!</En>
  <Zh>这是数据集规模能随算力有效增长的最大速率，因为它意味着我们只训练单个 epoch。但相比公式 \eqref{eq:DataGrowthOverfitting}，它使数据集增长慢得多。这看似意味着：即使训练过程从不重复使用任何数据，算力高效的训练最终仍会遭遇过拟合问题！</Zh>
</Para>

<Para>
  <En>According to Figure \ref{fig:BasicPowerLaws}, we expect that when we are bottlenecked by the dataset size (ie by overfitting), the loss should scale as $L(D) \propto D^{-0.095}$.  This implies that the loss would scale with compute as $L(D(C_{\rm min})) \propto C_{\rm min}^{-0.03}$ once we are data-limited.  Once again, we have a contradiction, as this will eventually intersect with our prediction for $L(C_{\rm min})$ from Figure \ref{fig:ComputeEfficientAdjusted}, where we found a scaling $L(C_{\rm min}) \propto C_{\rm min}^{-0.050}$.  </En>
  <Zh>根据图 \ref{fig:BasicPowerLaws}，我们预期当受数据集规模（即过拟合）瓶颈制约时，损失应按 $L(D) \propto D^{-0.095}$ 缩放。这意味着一旦数据受限，损失随算力的缩放将为 $L(D(C_{\rm min})) \propto C_{\rm min}^{-0.03}$。矛盾再次出现：这条线最终会与图 \ref{fig:ComputeEfficientAdjusted} 中我们对 $L(C_{\rm min})$ 的预测相交，在那里我们得到的缩放是 $L(C_{\rm min}) \propto C_{\rm min}^{-0.050}$。</Zh>
</Para>

<Para>
  <En>The intersection point of $L(D(C_{\rm min}))$ and $L(C_{\rm min})$ occurs at</En>
  <Zh>$L(D(C_{\rm min}))$ 与 $L(C_{\rm min})$ 的交点位于</Zh>
</Para>

<Equation label="eq:SpecialPoint" latex="C^* \sim 10^4~\mathrm{PF}{\text -}\mathrm{Days}
\quad
N^* \sim 10^{12}~\text{parameters},
\quad
D^* \sim 10^{12}~\text{tokens},
\quad
L^* \sim 1.7~\text{nats/token}"
  :tips="{ 'C^*': '交点处的算力（PF-Days）', 'N^*': '交点处的模型参数量', 'D^*': '交点处的数据量（词元数）', 'L^*': '交点处的损失（nats/token）' }" />

<Para>
  <En>though the numerical values are highly uncertain, varying by an order or magnitude in either direction depending on the precise values of the exponents from the power-law fits.  The most obvious interpretation is that our scaling laws break down at or before we reach this point, which is still many orders of magnitude away in both compute and model size.  </En>
  <Zh>尽管这些数值高度不确定——随幂律拟合指数的精确取值，可向任一方向变动一个数量级。最直白的解读是：我们的缩放律会在到达该点时或之前失效，而该点在算力与模型规模上都仍距我们许多个数量级之遥。</Zh>
</Para>

<Para>
  <En>One might also conjecture that this intersection point has a deeper meaning.  If we cannot increase the model size beyond $N^*$ without qualitatively different data requirements, perhaps this means that once we reach $C_{\rm min}^*$ and $N^*$, we have extracted all of the reliable information available in natural language data.  In this interpretation, $L^*$ would provide a rough estimate for the entropy-per-token\footnote{Defining words using the \texttt{wc} utility, the WebText2 dataset has $1.4$ tokens per word and $4.3$ characters per token. } of natural language.  In this scenario, we would expect the loss trend to level off at or before $L^*$.</En>
  <Zh>人们也可以猜想这一交点具有更深的含义。如果我们无法在不带来性质上不同的数据需求的情况下把模型规模提高到 $N^*$ 以上，或许这意味着一旦达到 $C_{\rm min}^*$ 和 $N^*$，我们就已提取出自然语言数据中全部可靠的信息。在此解读下，$L^*$ 将给出自然语言每词元熵\footnote{按 \texttt{wc} 工具的词定义，WebText2 数据集每词 $1.4$ 个词元、每词元 $4.3$ 个字符。}的粗略估计。在这种情形下，我们预期损失趋势会在 $L^*$ 处或之前趋于平缓。</Zh>
</Para>

<Para>
  <En>We can guess at the functional form of $L(C_{\rm min})$ as it levels off by considering a version of our training dataset with added noise.  For example, we could append a random string of tokens to each context shown to the model to artificially boost the loss by a constant additive factor. Then, the distance from the noise floor $L-L_{\rm noise}$ would be a more meaningful performance metric, with even a small decrease in this distance potentially representing a significant boost in qualitative performance. Since the artificial noise would affect all of our trends equally, the critical point of \ref{eq:SpecialPoint} would not change (aside from the absolute value of $L^*$), and may be meaningful even if it occurs after the leveling off.</En>
  <Zh>通过考虑给训练数据集添加噪声的版本，我们可以猜测 $L(C_{\rm min})$ 趋平时的函数形式。例如，我们可以在展示给模型的每个上下文后附加一串随机词元，人为地使损失提高一个恒定的加性量。此时，距噪声地板的距离 $L-L_{\rm noise}$ 将是更有意义的性能指标，这一距离即使小幅下降也可能代表性能质量的显著提升。由于人工噪声对我们所有趋势的影响相同，\ref{eq:SpecialPoint} 的临界点不会改变（$L^*$ 的绝对值除外），即使它出现在趋势趋平之后也可能是有意义的。</Zh>
</Para>
</template>
