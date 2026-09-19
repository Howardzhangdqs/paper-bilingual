<!-- Charting the Infinite Data Limit and Overfitting -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Figure, Table, Td, Th, Numbered, Item } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:ChartingOverfitting" en="Charting the Infinite Data Limit and Overfitting" zh="绘制无限数据极限与过拟合" />

<Para>
  <En>In Section \ref{sec:Empirical} we found a number of basic scaling laws for language modeling performance. Here we will study the performance of a model of size $N$ trained on a dataset with $D$ tokens while varying $N$ and $D$ simultaneously. We will empirically demonstrate that the optimally trained test loss accords with the scaling law of Equation \eqref{eq:FundamentalLikelihioodvsModelandDataSize}. This provides guidance on how much data we would need to train models of increasing size while keeping overfitting under control.</En>
  <Zh>在第 \ref{sec:Empirical} 节中我们得到了语言建模性能的若干基本缩放律。本节将研究规模为 $N$ 的模型在含 $D$ 个词元的数据集上训练时的性能，并同时改变 $N$ 与 $D$。我们将实证证明，最优训练下的测试损失符合公式 \eqref{eq:FundamentalLikelihioodvsModelandDataSize} 的缩放律。这为“训练越来越大的模型需要多少数据才能控制过拟合”提供了指导。</Zh>
</Para>

<Heading :level="2" en="Proposed L(N,D) Equation" zh="所提出的 L(N, D) 方程" />

<Figure src="figures/2001.08361/DatasetModelSizevsPerformance.svg" :width="60" label="fig:DatasetModelSizevsPerformance" caption-en="The early-stopped test loss $L(N, D)$ depends predictably on the dataset size $D$ and model size $N$ according to Equation \eqref{eq:FundamentalLikelihioodvsModelandDataSize}. \textbf{Left}: For large $D$, performance is a straight power law in $N$. For a smaller fixed $D$, performance stops improving as $N$ increases and the model begins to overfit. (The reverse is also true, see Figure \ref{fig:LossvsModelDatasetSize}.)" caption-zh="早停测试损失 $L(N, D)$ 依公式 \eqref{eq:FundamentalLikelihioodvsModelandDataSize} 可预测地依赖于数据集规模 $D$ 与模型规模 $N$。\textbf{左}：$D$ 很大时，性能是关于 $N$ 的标准幂律。$D$ 固定且较小时，性能随 $N$ 增大不再提升，模型开始过拟合。（反之亦然，见图 \ref{fig:LossvsModelDatasetSize}。）" />
<Figure src="figures/2001.08361/DatasetModelSizevsChangePerformance.svg" :width="60" caption-en="\textbf{Right}: The extent of overfitting depends predominantly on the ratio $N^{\frac{\alpha_N}{\alpha_D}}/D$, as predicted in equation (\ref{eq:OverfittingPrediction}). The line is our fit to that equation." caption-zh="\textbf{右}：过拟合程度主要取决于比值 $N^{\frac{\alpha_N}{\alpha_D}}/D$，与公式 (\ref{eq:OverfittingPrediction}) 的预测一致。图中的线是我们对该公式的拟合。" />

<Para>
  <En>We have chosen the parameterization \eqref{eq:FundamentalLikelihioodvsModelandDataSize} (repeated here for convenience):</En>
  <Zh>我们选择了如下参数化（\eqref{eq:FundamentalLikelihioodvsModelandDataSize}，为方便起见在此重写）：</Zh>
</Para>

<Equation latex="L(N, D) = \left[ \left( \frac{N_c}{N} \right)^{\frac{\alpha_N}{\alpha_D}} + \frac{D_c}{D} \right]^{\alpha_D}"
  :tips="{ L: '早停后的测试损失', N: '非嵌入参数量', D: '数据集规模（词元数）', N_c: '参数尺度常数（拟合学得）', D_c: '数据尺度常数（拟合学得）', '\\alpha_N': '参数项的幂律指数', '\\alpha_D': '数据项的幂律指数' }" />

<Para>
  <En>using three principles:</En>
  <Zh>选择时依据三条原则：</Zh>
</Para>

<Numbered>
  <Item>
    <En>Changes in vocabulary size or tokenization are expected to rescale the loss by an overall factor. The parameterization of $L(N,D)$ (and all models of the loss) must naturally allow for such a rescaling.</En>
    <Zh>词表大小或分词方式的改变预期会使损失整体乘上一个因子。$L(N,D)$ 的参数化（以及一切损失模型）都必须自然地容许这种重标定。</Zh>
  </Item>
  <Item>
    <En>Fixing $D$ and sending $N \to \infty$, the overall loss should approach $L(D)$. Conversely, fixing $N$ and sending $D \to \infty$ the loss must approach $L(N)$.</En>
    <Zh>固定 $D$ 并令 $N \to \infty$ 时，总损失应趋于 $L(D)$；反之，固定 $N$ 并令 $D \to \infty$ 时，损失必趋于 $L(N)$。</Zh>
  </Item>
  <Item>
    <En>$L(N,D)$ should be analytic at $D=\infty$, so that it has a series expansion in $1/D$ with integer powers. Theoretical support for this principle is significantly weaker than for the first two.</En>
    <Zh>$L(N,D)$ 在 $D=\infty$ 处应是解析的，从而具有整数次幂的 $1/D$ 级数展开。这一原则的理论依据明显弱于前两条。</Zh>
  </Item>
</Numbered>

<Para>
  <En>Our choice of $L(N,D)$ satisfies the first requirement because we can rescale $N_c, D_c$ with changes in the vocabulary. This also implies that the values of $N_c, D_c$ have no fundamental meaning.</En>
  <Zh>我们所选的 $L(N,D)$ 满足第一条要求，因为 $N_c, D_c$ 可以随词表的变化重新标定。这也意味着 $N_c, D_c$ 的数值不具有基本常数的意义。</Zh>
</Para>

<Para>
  <En>Since we stop training early when the test loss ceases to improve and optimize all models in the same way, we expect that larger models should always perform better than smaller models. But with fixed finite $D$, we also do not expect any model to be capable of approaching the best possible loss (ie the entropy of text). Similarly, a model with fixed size will be capacity-limited. These considerations motivate our second principle. Note that knowledge of $L(N)$ at infinite $D$ and $L(D)$ at infinite $N$ fully determines all the parameters in $L(N,D)$.</En>
  <Zh>由于我们在测试损失不再改善时即早停训练，且对所有模型采用同样的优化方式，我们预期更大的模型总应优于更小的模型。但在固定的有限 $D$ 下，我们也不认为任何模型能逼近最优可能的损失（即文本的熵）。类似地，规模固定的模型将受容量限制。这些考量促成了我们的第二条原则。注意，无限 $D$ 下的 $L(N)$ 与无限 $N$ 下的 $L(D)$ 一旦已知，便完全确定了 $L(N,D)$ 中的所有参数。</Zh>
</Para>

<Para>
  <En>The third principle is more speculative. There is a simple and general reason one might expect overfitting to scale $\propto 1/D$ at very large $D$. Overfitting should be related to the variance or the signal-to-noise ratio of the dataset \cite{1710.03667}, and this scales as $1/D$. This expectation should hold for any smooth loss function, since we expect to be able to expand the loss about the $D \to \infty$ limit. However, this argument assumes that $1/D$ corrections dominate over other sources of variance, such as the finite batch size and other limits on the efficacy of optimization. Without empirical confirmation, we would not be very confident of its applicability.</En>
  <Zh>第三条原则更具推测性。有一个简单而一般的理由让我们预期：在 $D$ 非常大时，过拟合按 $\propto 1/D$ 缩放。过拟合应与数据集的方差或信噪比有关 \cite{1710.03667}，而后者按 $1/D$ 缩放。这一预期对任何光滑的损失函数都应成立，因为我们预期可以把损失在 $D \to \infty$ 极限附近展开。然而，该论证假设 $1/D$ 修正主导其他方差来源，例如有限的批量大小以及优化效果的其他限制。若无经验佐证，我们对它的适用性没有太大把握。</Zh>
</Para>

<Para>
  <En>Our third principle explains the asymmetry between the roles of $N$ and $D$ in Equation \eqref{eq:FundamentalLikelihioodvsModelandDataSize}. Very similar symmetric expressions\footnote{For example, one might have used $L(N,D) = \left[ \left( \frac{N_c}{N} \right)^{\alpha_N} + \left( \frac{D_c}{D} \right)^{\alpha_D} \right]^\beta$, but this does not have a $1/D$ expansion.} are possible, but they would not have a $1/D$ expansion with integer powers, and would require the introduction of an additional parameter.</En>
  <Zh>第三条原则解释了公式 \eqref{eq:FundamentalLikelihioodvsModelandDataSize} 中 $N$ 与 $D$ 地位的不对称性。非常相似的对称表达式\footnote{例如，本可以采用 $L(N,D) = \left[ \left( \frac{N_c}{N} \right)^{\alpha_N} + \left( \frac{D_c}{D} \right)^{\alpha_D} \right]^\beta$，但它没有 $1/D$ 展开。}是可能的，但它们不具有整数次幂的 $1/D$ 展开，且需要引入额外参数。</Zh>
</Para>

<Para>
  <En>In any case, we will see that our equation for $L(N,D)$ fits the data well, which is the most important justification for our $L(N,D)$ ansatz.</En>
  <Zh>无论如何，我们将看到我们的 $L(N,D)$ 方程与数据拟合得很好，这是 $L(N,D)$ 设定最重要的依据。</Zh>
</Para>

<Heading :level="2" en="Results" zh="结果" />

<Para>
  <En>We regularize all our models with 10\% dropout, and by tracking test loss and stopping once it is no longer decreasing. The results are displayed in Figure \ref{fig:DatasetModelSizevsPerformance}, including a fit to the four parameters $\alpha_N, \alpha_D, N_c, D_c$ in Equation \eqref{eq:FundamentalLikelihioodvsModelandDataSize}:</En>
  <Zh>我们对所有模型使用 10\% 的 dropout 进行正则化，并跟踪测试损失、在不再下降时停止训练。结果显示于图 \ref{fig:DatasetModelSizevsPerformance}，其中包括对公式 \eqref{eq:FundamentalLikelihioodvsModelandDataSize} 中四个参数 $\alpha_N, \alpha_D, N_c, D_c$ 的拟合：</Zh>
</Para>

<Table caption-en="Fits to $L(N, D)$" caption-zh="$L(N, D)$ 的拟合">
  <tr>
    <Th>Parameter</Th>
    <Th align="center">$\alpha_N$</Th>
    <Th align="center">$\alpha_D$</Th>
    <Th align="center">$N_c$</Th>
    <Th align="center">$D_c$</Th>
  </tr>
  <tr>
    <Th>Value</Th>
    <Td align="center">$0.076$</Td>
    <Td align="center">$0.103$</Td>
    <Td align="center">$6.4 \times 10^{13}$</Td>
    <Td align="center">$1.8 \times 10^{13}$</Td>
  </tr>
</Table>

<Para>
  <En>We obtain an excellent fit, with the exception of the runs where the dataset has been reduced by a factor of $1024$, to about $2 \times 10^7$ tokens. With such a small dataset, an epoch consists of only 40 parameter updates. Perhaps such a tiny dataset represents a different regime for language modeling, as overfitting happens very early in training (see Figure \ref{fig:OverfittingandEarlyStopping}). Also note that the parameters differ very slightly from those obtained in Section \ref{sec:Empirical}, as here we are fitting the full $L(N,D)$ rather than just $L(N, \infty)$ or $L(\infty, D)$.</En>
  <Zh>除数据集缩减 $1024$ 倍（约 $2 \times 10^7$ 个词元）的那些运行外，我们得到了极好的拟合。对于如此小的数据集，一个 epoch 只包含 40 次参数更新。这样微小的数据集或许代表了语言建模的另一种情形，因为过拟合在训练极早期就已发生（见图 \ref{fig:OverfittingandEarlyStopping}）。另请注意，这里的参数与第 \ref{sec:Empirical} 节所得略有不同，因为此处拟合的是完整的 $L(N,D)$，而不只是 $L(N, \infty)$ 或 $L(\infty, D)$。</Zh>
</Para>

<Para>
  <En>To chart the borderlands of the infinite data limit, we can directly study the extent of overfitting. For all but the largest models, we see no sign of overfitting when training with the full 22B token WebText2 dataset, so we can take it as representative of $D=\infty$. Thus we can compare finite $D$ to the infinite data limit by defining</En>
  <Zh>为描绘无限数据极限的边界地带，我们可以直接研究过拟合的程度。对除最大模型之外的所有模型，用完整的 220 亿词元 WebText2 数据集训练时我们没有看到任何过拟合迹象，因此可以把它视为 $D=\infty$ 的代表。于是可以通过定义如下量来比较有限 $D$ 与无限数据极限：</Zh>
</Para>

<Equation latex="\delta L(N, D) \equiv \frac{L(N, D)}{L(N, \infty)} - 1"
  :tips="{ '\\delta L(N, D)': '过拟合程度：有限数据损失相对无限数据损失的相对增量', N: '非嵌入参数量', D: '数据集规模（词元数）' }" />

<Para>
  <En>and studying it as a function of $N, D$. In fact, we see empirically that $\delta L$ depends only a specific combination of $N$ and $D$, as shown in Figure \ref{fig:OverfittingandEarlyStopping}. This follows from the scaling law of Equation \eqref{eq:FundamentalLikelihioodvsModelandDataSize}, which implies</En>
  <Zh>并将其作为 $N, D$ 的函数来研究。事实上，我们从经验上看到 $\delta L$ 只依赖于 $N$ 与 $D$ 的一个特定组合，如图 \ref{fig:OverfittingandEarlyStopping} 所示。这可由公式 \eqref{eq:FundamentalLikelihioodvsModelandDataSize} 的缩放律推出，它意味着</Zh>
</Para>

<Equation label="eq:OverfittingPrediction" latex="\delta L \approx \left( 1 + \left(\frac{N}{N_c} \right)^{\frac{\alpha_N}{\alpha_D}} \frac{D_c}{D} \right)^{\alpha_D} - 1"
  :tips="{ '\\delta L': '过拟合程度（相对增量）', N: '非嵌入参数量', N_c: '参数尺度常数', D: '数据集规模（词元数）', D_c: '数据尺度常数', '\\alpha_N': '参数项的幂律指数', '\\alpha_D': '数据项的幂律指数' }" />

<Para>
  <En>Note that at large $D$ this formula also has a series expansion in powers of $1/D$.</En>
  <Zh>注意在 $D$ 较大时，该公式同样具有 $1/D$ 的幂级数展开。</Zh>
</Para>

<Para>
  <En>We estimate that the variation in the loss with different random seeds is roughly $0.02$, which means that to avoid overfitting when training to within that threshold of convergence we require</En>
  <Zh>我们估计不同随机种子引起的损失变化约为 $0.02$；这意味着要在该收敛阈值内训练并避免过拟合，需要</Zh>
</Para>

<Equation latex="D \gtrsim (5 \times 10^3) \, N^{0.74}"
  :tips="{ D: '避免过拟合所需的数据集规模（词元数）', N: '非嵌入参数量' }" />

<Para>
  <En>With this relation, models smaller than $10^9$ parameters can be trained with minimal overfitting on the 22B token WebText2 dataset, but our largest models will encounter some mild overfitting. More generally, this relation shows that dataset size may grow sub-linearly in model size while avoiding overfitting. Note however that this does not typically represent maximally compute-efficient training. We should also emphasize that we have not optimized regularization (eg the dropout probability) while varying dataset and model size.</En>
  <Zh>根据这一关系，在 220 亿词元的 WebText2 数据集上训练参数量小于 $10^9$ 的模型几乎不会过拟合，而我们最大的模型会遇到一些轻微的过拟合。更一般地，该关系表明数据集规模可以随模型规模次线性增长而避免过拟合。但请注意，这通常并不代表算力最优的训练。还应强调，在改变数据集与模型规模时，我们并未对正则化（如 dropout 概率）进行优化。</Zh>
</Para>
</template>
