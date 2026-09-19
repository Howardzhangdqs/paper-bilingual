<!-- Introduction -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Figure, Equation, Numbered, Bullets, Item } from '../../../components/paper'
</script>

<template>
<Heading :level="1" en="Introduction" zh="引言" />

<Para>
  <En>Language provides a natural domain for the study of artificial intelligence, as the vast majority of reasoning tasks can be efficiently expressed and evaluated in language, and the world's text provides a wealth of data for unsupervised learning via generative modeling.  Deep learning has recently seen rapid progress in language modeling, with state of the art models \cite{radford2018improving,1810.04805,1906.08237,DBLP:journals/corr/abs-1907-11692, 1910.10683} approaching human-level performance on many specific tasks \cite{wang2019superglue}, including the composition of coherent multi-paragraph prompted text samples \cite{radford2019language}.</En>
  <Zh>语言为人工智能研究提供了一个天然的领域：绝大多数推理任务都可以在语言中得到高效的表述与评估，而全世界的文本则为通过生成式建模开展无监督学习提供了海量数据。近来，深度学习在语言建模方面进展迅速，最先进的模型 \cite{radford2018improving,1810.04805,1906.08237,DBLP:journals/corr/abs-1907-11692, 1910.10683} 已在许多具体任务上逼近人类水平 \cite{wang2019superglue}，其中包括生成连贯的多段落提示文本样本 \cite{radford2019language}。</Zh>
</Para>

<Para>
  <En>One might expect language modeling performance to depend on model architecture, the size of neural models, the computing power used to train them, and the data available for this training process.  In this work we will empirically investigate the dependence of language modeling loss on all of these factors, focusing on the Transformer architecture \cite{OriginalTransformer,liu2018generating}.  The high ceiling and low floor for performance on language tasks allows us to study trends over more than seven orders of magnitude in scale.</En>
  <Zh>人们或许会预期，语言建模性能取决于模型架构、神经网络的规模、训练所用的算力，以及训练过程中可用的数据。本文将对语言建模损失与所有这些因素之间的依赖关系进行实证考察，并重点关注 Transformer 架构 \cite{OriginalTransformer,liu2018generating}。语言任务性能的高上限与低下限，使我们得以在超过七个数量级的尺度范围内研究其变化趋势。</Zh>
</Para>

<Para>
  <En>Throughout we will observe precise power-law scalings for performance as a function of training time, context length, dataset size, model size, and compute budget.  </En>
  <Zh>在整个研究中，我们都将观察到性能随训练时间、上下文长度、数据集规模、模型规模与算力预算变化的精确幂律缩放。</Zh>
</Para>

<Figure src="figures/2001.08361/SimplePowerLaws.svg" :width="100" label="fig:BasicPowerLaws" caption-en="Language modeling performance improves smoothly as we increase the model size, datasetset size, and amount of compute~used for training.  For optimal performance all three factors must be scaled up in tandem. Empirical performance has a power-law relationship with each individual factor when not bottlenecked by the other two." caption-zh="当我们增大模型规模、数据集规模与训练所用算力时，语言建模性能平稳提升。为获得最优性能，这三个因素必须同步扩大。在不受其余两个因素瓶颈制约时，经验性能与其中每一个单独因素均呈幂律关系。" />

<Heading :level="2" en="Summary" zh="总结" />

<Para>
  <En>Our key findings for Transformer language models are are as follows:</En>
  <Zh>我们针对 Transformer 语言模型的主要发现如下：</Zh>
</Para>

<Para>
  <En>\textbf{Performance depends strongly on scale, weakly on model shape:} Model performance depends most strongly on scale, which consists of three factors: the number of model parameters $N$ (excluding embeddings), the size of the dataset $D$, and the amount of compute $C$ used for training.  Within reasonable limits, performance depends very weakly on other architectural hyperparameters such as depth vs.~width. (Section \ref{sec:Empirical})</En>
  <Zh>\textbf{性能强烈依赖于规模，而对模型形状的依赖较弱：}模型性能对规模的依赖最强。规模由三个因素构成：模型参数量 $N$（不含嵌入层）、数据集规模 $D$，以及训练所用算力 $C$。在合理范围内，性能对其他架构超参数（如深度与宽度之比）的依赖非常弱。（第 \ref{sec:Empirical} 节）</Zh>
</Para>

<Para>
  <En>\textbf{Smooth power laws:} Performance has a power-law relationship with each of the three scale factors $N, D, C$ when not bottlenecked by the other two, with trends spanning more than six orders of magnitude (see Figure \ref{fig:BasicPowerLaws}). We observe no signs of deviation from these trends on the upper end, though performance must flatten out eventually before reaching zero loss. (Section \ref{sec:Empirical})</En>
  <Zh>\textbf{平滑的幂律：}在不受其余两个因素瓶颈制约时，性能与三个规模因素 $N, D, C$ 中的每一个都呈幂律关系，且趋势跨越六个数量级以上（见图 \ref{fig:BasicPowerLaws}）。在上端我们未观察到任何偏离这些趋势的迹象，尽管性能最终必会在到达零损失之前趋于平缓。（第 \ref{sec:Empirical} 节）</Zh>
</Para>

<Para>
  <En>\textbf{Universality of overfitting:} Performance improves predictably as long as we scale up $N$ and $D$ in tandem, but enters a regime of diminishing returns if either $N$ or $D$ is held fixed while the other increases.  The performance penalty depends predictably on the ratio $N^{0.74}/D$, meaning that every time we increase the model size 8x, we only need to increase the data by roughly 5x to avoid a penalty. (Section \ref{sec:ChartingOverfitting})</En>
  <Zh>\textbf{过拟合的普适性：}只要同步扩大 $N$ 和 $D$，性能便可预测地提升；但如果固定 $N$ 或 $D$ 之一而增大另一个，性能就会进入收益递减区间。性能损失可由比值 $N^{0.74}/D$ 可预测地刻画：也就是说，模型规模每扩大 8 倍，只需将数据增加约 5 倍即可避免性能损失。（第 \ref{sec:ChartingOverfitting} 节）</Zh>
</Para>

<Para>
  <En>\textbf{Universality of training:} Training curves follow predictable power-laws whose parameters are roughly independent of the model size.  By extrapolating the early part of a training curve, we can roughly predict the loss that would be achieved if we trained for much longer. (Section \ref{sec:ScalingSizeandSteps})</En>
  <Zh>\textbf{训练过程的普适性：}训练曲线遵循可预测的幂律，其参数与模型规模基本无关。通过外推训练曲线的早期部分，我们可以大致预测若训练更长时间所能达到的损失。（第 \ref{sec:ScalingSizeandSteps} 节）</Zh>
</Para>

<Para>
  <En>\textbf{Transfer improves with test performance:} When we evaluate models on text with a different distribution than they were trained on, the results are strongly correlated to those on the training validation set with a roughly constant offset in the loss -- in other words, transfer to a different distribution incurs a constant penalty but otherwise improves roughly in line with performance on the training set. (Section \ref{sec:GeneralizationtoOtherDistributions})</En>
  <Zh>\textbf{迁移能力随测试性能提升：}当我们在与训练分布不同的文本上评估模型时，其结果与训练验证集上的结果高度相关，且损失偏移大致恒定——换言之，向不同分布的迁移只带来固定的性能损失，除此之外其提升大体与训练集上的性能同步。（第 \ref{sec:GeneralizationtoOtherDistributions} 节）</Zh>
</Para>

<Para>
  <En>\textbf{Sample efficiency:} Large models are  more sample-efficient than small models, reaching the same level of performance with fewer optimization steps (Figure \ref{fig:EfficiencyIllustration}) and using  fewer data points (Figure \ref{fig:LossvsModelDatasetSize}).</En>
  <Zh>\textbf{样本效率：}大模型比小模型更具样本效率：它们用更少的优化步数（图 \ref{fig:EfficiencyIllustration}）和更少的数据点（图 \ref{fig:LossvsModelDatasetSize}）即可达到同等的性能水平。</Zh>
</Para>

<Figure src="figures/2001.08361/EfficiencyIllustration.svg" :width="100" label="fig:EfficiencyIllustration" caption-en="We show a series of language model training runs, with models ranging in size from $10^3$ to $10^9$ parameters (excluding embeddings)." caption-zh="我们展示了一系列语言模型训练运行，模型规模从 $10^3$ 到 $10^9$ 个参数（不含嵌入层）。" />

<Figure src="figures/2001.08361/ContributionIllustration.svg" :width="60" label="fig:ContributionIllustration" caption-en="As more compute becomes available, we can choose how much to allocate towards training larger models, using larger batches, and training for more steps.  We illustrate this for a billion-fold increase in compute.  For optimally compute-efficient training, most of the increase should go towards increased model size.  A relatively small increase in data is needed to avoid reuse.  Of the increase in data, most can be used to increase parallelism through larger batch sizes, with only a very small increase in serial training time required." caption-zh="当可获得更多算力时，我们可以选择将其中的多少分配给训练更大的模型、使用更大的批量以及训练更多步数。图中以算力扩大十亿倍为例说明了这一点。对于算力最优的训练而言，大部分新增算力应用于增大模型规模；为避免数据重复使用，需要相对少量地增加数据；而在新增的数据中，大部分可通过增大批量来提升并行度，串行训练时间只需极少量增加。" />

<Para>
  <En>\textbf{Convergence is inefficient:} When working within a fixed compute budget $C$ but without any other restrictions on the model size $N$ or available data $D$, we attain optimal performance by training \emph{very large models} and stopping \emph{significantly short of convergence} (see Figure \ref{fig:ContributionIllustration}).  Maximally compute-efficient training would therefore be far more sample efficient than one might expect based on training small models to convergence, with data requirements growing very slowly as $D \sim C^{0.27}$ with training compute. (Section \ref{sec:OptimalCompute})</En>
  <Zh>\textbf{收敛训练并不高效：}在固定算力预算 $C$ 下工作、而对模型规模 $N$ 或可用数据量 $D$ 不作其他限制时，我们通过训练\emph{非常大的模型}并在\emph{远未收敛处即停止}来获得最优性能（见图 \ref{fig:ContributionIllustration}）。因此，算力最优的训练在样本效率上将远远超出“把小模型训练至收敛”所给人的预期，其数据需求随训练算力增长得非常缓慢，仅为 $D \sim C^{0.27}$。（第 \ref{sec:OptimalCompute} 节）</Zh>
</Para>

<Para>
  <En>\textbf{Optimal batch size:} The ideal batch size for training these models is roughly a power of the loss only, and continues to be determinable by measuring the gradient noise scale \cite{1812.06162}; it is roughly 1-2 million tokens at convergence for the largest models we can train. (Section \ref{sec:OptimalBatchSize})</En>
  <Zh>\textbf{最优批量大小：}训练这类模型的理想批量大小大致只取决于损失的一个幂，并且仍可通过测量梯度噪声尺度来确定 \cite{1812.06162}；对于我们能训练的最大模型，收敛时的理想批量约为 100 万至 200 万个词元。（第 \ref{sec:OptimalBatchSize} 节）</Zh>
</Para>

<Para>
  <En>Taken together, these results show that language modeling performance improves smoothly and predictably as we appropriately scale up model size, data, and compute.  We expect that larger language models will perform better and be more sample efficient than current models.</En>
  <Zh>综合起来，这些结果表明：只要恰当地扩大模型规模、数据与算力，语言建模性能就会平稳且可预测地提升。我们预期，更大的语言模型将比现有模型表现更好，且样本效率更高。</Zh>
</Para>

<Heading :level="2" en="Summary of Scaling Laws" zh="缩放律概要" />

<Para>
  <En>The test loss of a Transformer trained to autoregressively model language can be predicted using a power-law  when performance is limited by only either the number of non-embedding parameters $N$, the dataset size $D$, or the optimally allocated compute budget $C_{\rm min}$ (see Figure \ref{fig:BasicPowerLaws}):</En>
  <Zh>当性能仅受非嵌入参数量 $N$、数据集规模 $D$ 或最优分配的算力预算 $C_{\rm min}$ 三者之一限制时，以自回归方式建模语言的 Transformer 的测试损失可用幂律预测（见图 \ref{fig:BasicPowerLaws}）：</Zh>
</Para>

<Numbered>
  <Item>
    <En>For models with a limited number of parameters, trained to convergence on sufficiently large datasets:</En>
    <Zh>对于参数量受限、在足够大的数据集上训练至收敛的模型：</Zh>
    <Equation label="eq:crit_n" latex="L(N) = \left(N_{\mathrm{c}}/N\right)^{\alpha_N};~~ \alpha_N \sim 0.076, \quad N_{\mathrm{c}} \sim 8.8 \times 10^{13}~\text{(non-embedding parameters)}" />
  </Item>
  <Item>
    <En>For large models trained with a limited dataset with early stopping:</En>
    <Zh>对于在受限数据集上训练并采用早停（early stopping）的大模型：</Zh>
    <Equation label="eq:crit_d" latex="L(D) = \left(D_{\mathrm{c}}/D\right)^{\alpha_D};~~ \alpha_D \sim 0.095, \quad D_{\mathrm{c}} \sim 5.4 \times 10^{13}~\text{(tokens)}" />
  </Item>
  <Item>
    <En>When training with a limited amount of compute, a sufficiently large dataset, an optimally-sized model, and a sufficiently small batch size (making optimal\footnote{We also observe an empirical power-law trend with the training compute $C$ (Figure \ref{fig:BasicPowerLaws}) while training at fixed batch size, but it is the trend with $C_{\rm min}$ that should be used to make predictions.  They are related by equation \eqref{eq:AdjustedCompute}. } use of compute):</En>
    <Zh>当在算力受限、数据集足够大、模型尺寸最优且批量足够小（即最优\footnote{在固定批量下训练时，我们也观察到损失与训练算力 $C$ 之间的经验幂律趋势（图 \ref{fig:BasicPowerLaws}），但用于预测的应当是与 $C_{\rm min}$ 的趋势；二者由公式 \eqref{eq:AdjustedCompute} 相联系。}利用算力）的条件下训练时：</Zh>
    <Equation label="eq:crit_c" latex="L(C_{\rm min}) = \left(C_{\mathrm{c}}^{\rm min} / C_{\rm min}\right)^{\alpha_C^{\rm min}};~~ \alpha_C^{\rm min} \sim 0.050, \quad C_{\mathrm{c}}^{\rm min} \sim 3.1 \times 10^{8}~\text{(PF-days)}" />
  </Item>
</Numbered>

<Para>
  <En>These relations hold across eight orders of magnitude in $C_{\rm min}$, six orders of magnitude in $N$, and over two orders of magnitude in $D$.  They depend very weakly on model shape and other Transformer hyperparameters (depth, width, number of self-attention heads), with specific numerical values associated with the Webtext2 training set \cite{radford2019language}.   The power laws $\alpha_{\rm N}, \alpha_{\rm D}, \alpha_{C}^{\rm min}$ specify the degree of performance improvement expected as we scale up $N$, $D$, or $C_{\rm min}$; for example, doubling the number of parameters yields a loss that is smaller by a factor $2^{-\alpha_N}=0.95$. The precise numerical values of $N_{\mathrm{c}}, C_{\rm c}^{\rm min},$ and $D_{\mathrm{c}}$ depend on the vocabulary size and tokenization and hence do not have a fundamental meaning.  </En>
  <Zh>这些关系在 $C_{\rm min}$ 的八个数量级、$N$ 的六个数量级以及 $D$ 的两个以上数量级范围内均成立。它们对模型形状及其他 Transformer 超参数（深度、宽度、自注意力头数）的依赖非常弱；其中的具体数值与 Webtext2 训练集 \cite{radford2019language} 相关联。幂指数 $\alpha_{\rm N}, \alpha_{\rm D}, \alpha_{C}^{\rm min}$ 刻画了扩大 $N$、$D$ 或 $C_{\rm min}$ 时性能提升的幅度；例如，参数量翻倍会使损失缩小为原来的 $2^{-\alpha_N}=0.95$ 倍。$N_{\mathrm{c}}, C_{\rm c}^{\rm min},$ 和 $D_{\mathrm{c}}$ 的精确数值取决于词表大小与分词方式，因此并不具有基本常数的意义。</Zh>
</Para>

<Para>
  <En>The critical batch size, which determines the speed/efficiency tradeoff for data parallelism (\cite{1812.06162}), also roughly obeys a power law in $L$:</En>
  <Zh>决定数据并行中速度/效率权衡的临界批量大小（\cite{1812.06162}）也大致服从关于 $L$ 的幂律：</Zh>
</Para>

<Equation label="eq:critical-batch-size" latex="B_{\rm crit}\left(L\right)=\frac{B_{\ast}}{L^{1/\alpha_{B}}},\qquad B_{\ast} \sim 2\cdot 10^8 \text{ tokens},\ \ \alpha_{B} \sim 0.21" />

<Figure src="figures/2001.08361/LossvsModelDatasetSize.svg" :width="50" label="fig:LossvsModelDatasetSize" caption-en="\textbf{Left}: The early-stopped test loss $L(N, D)$ varies predictably with the dataset size $D$ and model size $N$ according to Equation \eqref{eq:FundamentalLikelihioodvsModelandDataSize}." caption-zh="\textbf{左}：早停测试损失 $L(N, D)$ 依公式 \eqref{eq:FundamentalLikelihioodvsModelandDataSize} 随数据集规模 $D$ 与模型规模 $N$ 可预测地变化。" />

<Figure src="figures/2001.08361/LearningCurveFitComparisonIntro.svg" :width="50" label="fig:LearningCurveFitsandResiduals" caption-en="\textbf{Right}:  After an initial transient period, learning curves for all model sizes $N$ can be fit with Equation \eqref{eq:FundamentalLikelihioodvsModelandSteps}, which is parameterized in terms of $S_{\rm min}$, the number of steps when training at large batch size (details in Section \ref{sec:OptimalBatchSize})." caption-zh="\textbf{右}：经过初始瞬变期之后，所有模型规模 $N$ 的学习曲线都可用公式 \eqref{eq:FundamentalLikelihioodvsModelandSteps} 拟合；该公式以 $S_{\rm min}$——大批量训练时的步数——为参数（详见第 \ref{sec:OptimalBatchSize} 节）。" />

<Para>
  <En>Equation \eqref{eq:crit_n} and \eqref{eq:crit_d} together suggest that as we increase the model size, we should increase the dataset size sublinearly according to $D \propto N^{\frac{\alpha_N}{\alpha_D}} \sim N^{0.74}$. In fact, we find that there is a single equation combining \eqref{eq:crit_n} and \eqref{eq:crit_d} that governs the simultaneous dependence on $N$ and $D$ and governs the degree of overfitting:</En>
  <Zh>公式 \eqref{eq:crit_n} 与 \eqref{eq:crit_d} 共同提示：增大模型规模时，数据集规模应按 $D \propto N^{\frac{\alpha_N}{\alpha_D}} \sim N^{0.74}$ 次线性地增大。事实上，我们发现存在一个融合 \eqref{eq:crit_n} 与 \eqref{eq:crit_d} 的单一方程，它刻画了对 $N$ 与 $D$ 的同时依赖，并决定过拟合的程度：</Zh>
</Para>

<Equation label="eq:FundamentalLikelihioodvsModelandDataSize" latex="L(N, D) = \left[ \left( \frac{N_c}{N} \right)^{\frac{\alpha_N}{\alpha_D}} + \frac{D_c}{D}  \right]^{\alpha_D}" />

<Para>
  <En>with fits pictured on the left in figure \ref{fig:LossvsModelDatasetSize}.  We conjecture that this functional form may also parameterize the trained log-likelihood for other generative modeling tasks.</En>
  <Zh>拟合结果见图 \ref{fig:LossvsModelDatasetSize} 左侧。我们推测，这一函数形式或许也可用于参数化其他生成建模任务训练所得的对数似然。</Zh>
</Para>

<Para>
  <En>When training a given model for a finite number of parameter update steps $S$ in the infinite data limit, after an initial transient period, the learning curves can be accurately fit by  (see the right of figure \ref{fig:LearningCurveFitsandResiduals})</En>
  <Zh>当在无限数据极限下以有限步数 $S$ 训练给定模型时，经过初始瞬变期后，学习曲线可被精确拟合为（见图 \ref{fig:LearningCurveFitsandResiduals} 右侧）：</Zh>
</Para>

<Equation label="eq:FundamentalLikelihioodvsModelandSteps" latex="L(N, S) = \left( \frac{N_c}{N} \right)^{\alpha_N}  + \left( \frac{S_c }{S_{\rm min}(S)} \right)^{\alpha_S}" />

<Para>
  <En>where $S_c \approx 2.1 \times 10^3$ and $\alpha_S \approx 0.76$, and $S_{\rm min}(S)$ is the minimum possible number of optimization steps (parameter updates) estimated  using Equation \eqref{eq:AdjustedSteps}.</En>
  <Zh>其中 $S_c \approx 2.1 \times 10^3$，$\alpha_S \approx 0.76$，而 $S_{\rm min}(S)$ 是可行的最少优化步数（参数更新次数），由公式 \eqref{eq:AdjustedSteps} 估计。</Zh>
</Para>

<Para>
  <En>When training within a fixed compute budget $C$, but with no other constraints, Equation \eqref{eq:FundamentalLikelihioodvsModelandSteps} leads to the prediction that the optimal model size $N$, optimal batch size $B$, optimal number of steps $S$, and dataset size $D$ should grow as </En>
  <Zh>当在固定算力预算 $C$ 内训练而无其他约束时，公式 \eqref{eq:FundamentalLikelihioodvsModelandSteps} 预言最优模型规模 $N$、最优批量大小 $B$、最优步数 $S$ 与数据集规模 $D$ 应按如下方式增长：</Zh>
</Para>

<Equation label="eq:OptimalModelSizeTrainingTimevsCompute" latex="N \propto C^{\alpha_{C}^{\rm min} /\alpha_{N}}, \quad B \propto C^{\alpha_C^{\rm min} / \alpha_B}, \quad S \propto C^{\alpha_C^{\rm min} / \alpha_S}, \quad D = B\cdot S" />

<Para>
  <En>with</En>
  <Zh>其中</Zh>
</Para>

<Equation latex="\alpha_{C}^{\rm min} = 1/\left(1/\alpha_{S}+1/\alpha_{B}+1/\alpha_{N}\right)" />

<Para>
  <En>which closely matches the empirically optimal results $N \propto C_{\rm min}^{0.73}$, $B \propto C_{\rm min}^{0.24}$, and $S \propto C_{\rm min}^{0.03}$.  As the computational budget $C$ increases, it should be spent primarily on larger models, without dramatic increases in training time or dataset size (see Figure \ref{fig:ContributionIllustration}).  This also implies that as models grow larger, they  become increasingly sample efficient.  In practice, researchers typically train  smaller models for  longer than would be maximally compute-efficient because of  hardware constraints. Optimal performance depends on total compute as a power law (see Equation \eqref{eq:crit_c}).</En>
  <Zh>上式与经验最优结果 $N \propto C_{\rm min}^{0.73}$、$B \propto C_{\rm min}^{0.24}$、$S \propto C_{\rm min}^{0.03}$ 高度吻合。随着算力预算 $C$ 的增加，新增算力应主要用于更大的模型，而训练时间和数据集规模无须大幅增加（见图 \ref{fig:ContributionIllustration}）。这也意味着模型越大，其样本效率越高。实践中，由于硬件限制，研究者训练的模型通常比算力最优配置更小、训练时间更长。最优性能与总算力之间呈幂律关系（见公式 \eqref{eq:crit_c}）。</Zh>
</Para>

<Para>
  <En>We  provide some basic theoretical motivation for Equation \eqref{eq:FundamentalLikelihioodvsModelandDataSize}, an analysis of learning curve fits and their implications for training time, and a breakdown of our results per token.  We also make some brief comparisons to LSTMs and recurrent Transformers \cite{DBLP:journals/corr/abs-1807-03819}.</En>
  <Zh>我们为公式 \eqref{eq:FundamentalLikelihioodvsModelandDataSize} 提供了一些基本的理论动机，分析了学习曲线拟合及其对训练时间的含义，并给出了按词元分解的结果。我们还与 LSTM 和循环 Transformer \cite{DBLP:journals/corr/abs-1807-03819} 进行了简要比较。</Zh>
</Para>

<Heading :level="2" en="Notation" zh="记号" />

<Para>
  <En>We use the following notation:</En>
  <Zh>我们使用如下记号：</Zh>
</Para>

<Bullets>
  <Item>
    <En>$L$ -- the cross entropy loss in nats.  Typically it will be averaged over the tokens in a context, but in some cases we report the loss for specific tokens within the context.</En>
    <Zh>$L$——以奈特（nat）为单位的交叉熵损失。通常它是对上下文中的词元取平均，但在某些情况下我们会报告上下文中特定词元的损失。</Zh>
  </Item>
  <Item>
    <En>$N$ -- the number of model parameters, \emph{excluding all vocabulary and positional embeddings}  </En>
    <Zh>$N$——模型参数量，\emph{不含所有词表嵌入与位置嵌入}。</Zh>
  </Item>
  <Item>
    <En>$C \approx 6 N B S$ -- an estimate of the total non-embedding training compute, where $B$ is the batch size, and $S$ is the number of training steps (ie parameter updates). We quote numerical values in PF-days, where one PF-day $ = 10^{15} \times 24 \times 3600 = 8.64 \times 10^{19}$ floating point operations.   </En>
    <Zh>$C \approx 6 N B S$——非嵌入训练总算力的估计值，其中 $B$ 为批量大小，$S$ 为训练步数（即参数更新次数）。数值以 PF-days 表示，1 PF-day $ = 10^{15} \times 24 \times 3600 = 8.64 \times 10^{19}$ 次浮点运算。</Zh>
  </Item>
  <Item>
    <En>$D$ -- the dataset size in tokens </En>
    <Zh>$D$——以词元数计的数据集规模。</Zh>
  </Item>
  <Item>
    <En>$B_{\rm crit}$ -- the critical batch size \cite{1812.06162}, defined and discussed in Section \ref{sec:OptimalBatchSize}.  Training at the critical batch size provides a roughly optimal compromise between time and compute efficiency. </En>
    <Zh>$B_{\rm crit}$——临界批量大小 \cite{1812.06162}，其定义与讨论见第 \ref{sec:OptimalBatchSize} 节。以临界批量大小训练可在时间效率与算力效率之间取得大致最优的折中。</Zh>
  </Item>
  <Item>
    <En>$C_{\rm min}$ -- an estimate of the minimum amount of non-embedding compute to reach a given value of the loss.  This is the training compute that would be used if the model were trained at a batch size much less than the critical batch size.   </En>
    <Zh>$C_{\rm min}$——达到给定损失值所需非嵌入算力最小量的估计值，即模型在远小于临界批量的批量下训练时所需使用的训练算力。</Zh>
  </Item>
  <Item>
    <En>$S_{\rm min}$ -- an estimate of the minimal number of training steps needed to reach a given value of the loss.  This is also the number of training steps that would be used if the model were trained at a batch size much greater than the critical batch size. </En>
    <Zh>$S_{\rm min}$——达到给定损失值所需最少训练步数的估计值，也是模型在远大于临界批量的批量下训练时所需使用的训练步数。</Zh>
  </Item>
  <Item>
    <En>$\alpha_X$ -- power-law exponents for the scaling of the loss as $L(X) \propto 1/X^{\alpha_X}$ where $X$ can be any of $N, D, C, S, B, C^{\rm min}$. </En>
    <Zh>$\alpha_X$——损失按 $L(X) \propto 1/X^{\alpha_X}$ 缩放的幂律指数，其中 $X$ 可以是 $N, D, C, S, B, C^{\rm min}$ 中的任意一个。</Zh>
  </Item>
</Bullets>
</template>
