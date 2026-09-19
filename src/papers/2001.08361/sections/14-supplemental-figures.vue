<!-- Supplemental Figures -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Figure } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix en="Supplemental Figures" zh="补充图表" />

<Figure src="figures/2001.08361/EarlyStoppingvsNandD.svg" :width="50" label="fig:OverfittingandEarlyStopping" caption-en="\textbf{Left:} We characterize the step on which early stopping occurs, as a function of the extent of overfitting. The red line indicates a \textbf{lower bound} for early stopping that is derived in Section \ref{sec:EarlyStop}. \textbf{Right:} We display train and test loss for a series of 300M parameter models trained on different sized dataset sub-samples. The test loss typically follows that of a run done with unrestricted data until diverging. Note that the degree of overfitting (as compared to the infinite data limit) is significantly overestimated by $L_{\rm test} - L_{\rm train}$ (denoted by a black bar for each run)." caption-zh="\textbf{左：}我们将早停发生的步数表征为过拟合程度的函数。红线给出第 \ref{sec:EarlyStop} 节推导的早停\textbf{下界}。\textbf{右：}我们展示一系列 3 亿参数模型在不同规模数据子样本上训练的训练与测试损失。测试损失通常与无数据限制的运行一致，直至发散。注意，过拟合程度（与无限数据极限相比）会被 $L_{\rm test} - L_{\rm train}$ 显著高估（每次运行为一根黑色竖线标示）。" />
<Figure src="figures/2001.08361/TrainVsTestMedium.svg" :width="50" />

<Figure src="figures/2001.08361/ComputeVsParamswithUTNoReuse.svg" :width="50" label="fig:RecurrentTransformers" caption-en="We compare recurrent Transformers \cite{DBLP:journals/corr/abs-1807-03819}, which re-use parameters, to standard Transformers. Recurrent Transformers perform slightly better when comparing models with equal parameter count, but slightly worse when accounting for reuse and comparing per FLOP." caption-zh="我们比较了重复使用参数的循环 Transformer \cite{DBLP:journals/corr/abs-1807-03819} 与标准 Transformer。在参数量相同的模型之间比较时，循环 Transformer 稍好；但在考虑参数重复使用、按 FLOP 比较时则稍差。" />
<Figure src="figures/2001.08361/ComputeVsParamswithUTWithReuse.svg" :width="50" />

<Heading :level="2" appendix label="sec:OverfittingandEarlyStopping" en="Early Stopping and Test vs Train" zh="早停与测试/训练损失" />

<Para>
  <En>In section \ref{sec:EarlyStop} we described the result shown in Figure \ref{fig:OverfittingandEarlyStopping}, which provides a prediction for a lower bound on the early stopping step. We also show the train and test loss for a given model size when training on different sized datasets.</En>
  <Zh>在第 \ref{sec:EarlyStop} 节中我们描述了图 \ref{fig:OverfittingandEarlyStopping} 所示的结果，它给出了早停步数下界的预测。我们还展示了给定模型规模在不同规模数据集上训练时的训练与测试损失。</Zh>
</Para>

<Heading :level="2" appendix en="Universal Transformers" zh="Universal Transformer" />

<Para>
  <En>We compare the performance of standard Transformers to recurrent Transformers \cite{DBLP:journals/corr/abs-1807-03819} in Figure \ref{fig:RecurrentTransformers}. These models re-use parameters, and so perform slightly better as a function of $N$, but slightly worse as a function of compute $C$. We include several different different possibilities for parameter re-use.</En>
  <Zh>图 \ref{fig:RecurrentTransformers} 比较了标准 Transformer 与循环 Transformer \cite{DBLP:journals/corr/abs-1807-03819} 的性能。后者重复使用参数，因此作为 $N$ 的函数表现稍好，但作为算力 $C$ 的函数表现稍差。我们纳入了几种不同的参数重复使用方案。</Zh>
</Para>

<Heading :level="2" appendix en="Batch Size" zh="批量大小" />

<Para>
  <En>We measure the critical batch size using the data displayed in figure \ref{fig:BatchPareto}. This made it possible to estimate $B_{\rm crit}(L)$ in figure \ref{fig:OptimalBatchSize}.</En>
  <Zh>我们利用图 \ref{fig:BatchPareto} 所示数据测量临界批量大小，从而估计出图 \ref{fig:OptimalBatchSize} 中的 $B_{\rm crit}(L)$。</Zh>
</Para>

<Figure src="figures/2001.08361/BatchParetoFronts3M.svg" :width="50" label="fig:BatchPareto" caption-en="These figures demonstrate fits to Equation \eqref{eq:TimeComputeTradeoff} for a large number of values of the loss $L$, and for two different Transformer model sizes. These fits were used to measure $B_{\rm crit}(L)$ for Figure \ref{fig:OptimalBatchSize}." caption-zh="这些图展示了对大量损失值 $L$ 以及两种不同 Transformer 模型规模，公式 \eqref{eq:TimeComputeTradeoff} 的拟合情况。这些拟合被用于测量图 \ref{fig:OptimalBatchSize} 中的 $B_{\rm crit}(L)$。" />
<Figure src="figures/2001.08361/BatchParetoFronts85M.svg" :width="50" />

<Heading :level="2" appendix en="Sample Efficiency vs Model Size" zh="样本效率与模型规模" />

<Para>
  <En>It is easy to see from figure \ref{fig:EfficiencyIllustration} that larger models train faster, and are therefore more sample efficient. We provide another way of looking at this phenomenon in figure \ref{fig:SampleEfficiency}, which shows when different models reach various fixed values of the loss.</En>
  <Zh>从图 \ref{fig:EfficiencyIllustration} 容易看出，更大的模型训练更快，因此样本效率更高。图 \ref{fig:SampleEfficiency} 提供了看待这一现象的另一种视角，它展示了不同模型在何时达到各个固定损失值。</Zh>
</Para>

<Figure src="figures/2001.08361/SampleEfficiencystep_min.svg" :width="50" label="fig:SampleEfficiency" caption-en="The number of minimum serial steps needed to reach any fixed value of the test loss decreases precipitously with model size. Sample efficiency (show here for training far below the critical batch size) improves greatly as well, improving by a factor of almost 100 when comparing the smallest possible model to a very large one." caption-zh="达到任意固定测试损失所需的最少串行步数随模型规模急剧下降。样本效率（此处展示远低于临界批量的训练）也大幅提升：从最小可能的模型到非常大的模型，提升近 100 倍。" />
<Figure src="figures/2001.08361/SampleEfficiencyexamples_min.svg" :width="50" />

<Figure src="figures/2001.08361/ContextPowerLaw.svg" :width="50" label="fig:MoreTokenAnalysis" caption-en="This figure provides information about the performance per token as a function of model size and training time. \textbf{Left:} Loss per token as a function of its position $T$ in the 1024-token context. Loss scales predictably as a power-law in $T$. \textbf{Right:} Test loss per token as a function of training step." caption-zh="本图给出每词元性能随模型规模与训练时间变化的信息。\textbf{左：}每词元损失作为其在 1024 词元上下文中位置 $T$ 的函数。损失随 $T$ 呈可预测的幂律缩放。\textbf{右：}每词元测试损失随训练步数的变化。" />
<Figure src="figures/2001.08361/SingleRunTokenTraining.svg" :width="48" />

<Heading :level="2" appendix label="sec:ContextDependence" en="Context Dependence" zh="上下文依赖" />

<Figure src="figures/2001.08361/PerformancevsModelSizevsContext.svg" :width="54" label="fig:PerformancevsModelSizevsContext" caption-en="In addition to the averaged loss, individual tokens within the 1024-token context also improve smoothly as model size increases. Training runs with shorter context $n_{\rm ctx} = 8$ (dashed lines) perform better on early tokens, since they can allocate all of their capacity to them." caption-zh="除平均损失外，1024 词元上下文中的单个词元也随模型规模增大而平稳改善。以较短上下文 $n_{\rm ctx} = 8$ 训练的运行（虚线）在较早词元上表现更好，因为它们可以把全部容量分配给这些词元。" />

<Para>
  <En>The trends for loss as a function of model size are displayed for different tokens in the context in Figure \ref{fig:PerformancevsModelSizevsContext}. We see that models trained on $n_{\rm ctx} = 1024$ show steady improvement with model size on all but the first token.</En>
  <Zh>图 \ref{fig:PerformancevsModelSizevsContext} 展示了上下文中不同词元的损失随模型规模变化的趋势。我们看到，以 $n_{\rm ctx} = 1024$ 训练的模型除第一个词元外，在所有词元上都随模型规模稳步改善。</Zh>
</Para>

<Para>
  <En>Fixing model size, it appears that the loss scales as a power-law as a function of position $T$ in the context, see Figure \ref{fig:MoreTokenAnalysis}. This may be a consequence of underlying power-law correlations in language \cite{ebeling1994entropy, altmann2012origin, lin2016criticality}, or a more general feature of the model architecture and optimization. It provides some suggestion for the potential benefits (or lack thereof) from training on larger contexts. Not only do larger models converge to better performance at $T=1024$, but they also improve more quickly at early tokens, suggesting that larger models are more efficient at detecting patterns with less contextual information. In the right-hand plot we show how per-token performance varies for a fixed model as a function of the training step. The model begins by learning short-range information, and only learns longer-range correlations later in training.</En>
  <Zh>固定模型规模时，损失似乎随上下文中的位置 $T$ 呈幂律缩放，见图 \ref{fig:MoreTokenAnalysis}。这可能是语言中潜在幂律相关性的结果 \cite{ebeling1994entropy, altmann2012origin, lin2016criticality}，也可能是模型架构与优化更一般的特征。它为“在更大上下文上训练的潜在收益（或没有收益）”提供了一些线索。更大的模型不仅在 $T=1024$ 处收敛到更好的性能，在较早词元上的改善也更快，这表明更大的模型能以更少的上下文信息更高效地检测模式。右图中我们展示了固定模型的每词元性能如何随训练步数变化。模型先学习短程信息，直到训练后期才学习更长程的相关性。</Zh>
</Para>

<Para>
  <En>We have also included models trained with a tiny context $n_{\rm ctx} = 8$ in order to compare with our longer context models. Even modestly sized models trained on $n_{\rm ctx} = 8$ can dominate our largest $n_{\rm ctx} = 1024$ models on very early tokens. This also suggests that further improvements should be possible with much larger models trained on large contexts.</En>
  <Zh>我们还纳入了以极小上下文 $n_{\rm ctx} = 8$ 训练的模型，以便与较长上下文的模型比较。即使在 $n_{\rm ctx} = 8$ 上训练的中等规模模型，在非常早的词元上也能胜过我们最大的 $n_{\rm ctx} = 1024$ 模型。这也提示，用大得多的模型在大上下文上训练应能取得进一步改进。</Zh>
</Para>

<Figure src="figures/2001.08361/VariousLearningSchedules.svg" :width="46" label="fig:LearningRateSchedules" caption-en="We test a variety of learning rate schedules including cosine decay, linear decay, as well as other faster/slower decays schedules on a 3 million parameter model, shown on the left. For these experiments we do not decay to zero, since we find that this tends to give a fixed improvement close to the end of training. We find that, as long as the learning rate is not too small and does not decay too quickly, performance does not depend strongly on learning rate. Run-to-run variation is at the level of ~0.05 in the loss, so averaging multiple runs is necessary to validate performance changes smaller than this level." caption-zh="我们在一个 300 万参数模型上测试了多种学习率调度，包括余弦衰减、线性衰减以及其他更快/更慢的衰减调度，见图左。这些实验中我们不衰减到零，因为我们发现那样往往会在训练临近结束时带来固定的提升。我们发现，只要学习率不太小、衰减不太快，性能对学习率的依赖就不强。运行之间的波动在损失 ~0.05 的量级，因此要验证小于该水平的变化需要对多次运行取平均。" />
<Figure src="figures/2001.08361/LearningRateSchedulesvsPerformance.svg" :width="46" />

<Heading :level="2" appendix label="app:OptimizationDetailsandErrorAnalysis" en="Learning Rate Schedules and Error Analysis" zh="学习率调度与误差分析" />

<Para>
  <En>We experimented with a variety of learning rates and schedules. A host of schedules and resulting test performances for a small language model are plotted in Figure \ref{fig:LearningRateSchedules}. We conclude that the choice of learning rate schedule is mostly irrelevant, as long as the total summed learning rate is sufficiently large, and the schedule includes a warmup period and a final decay to near-vanishing learning rate. Variations among schedules appear to be statistical noise, and provide a rough gauge for the scale of variation between different training runs. Experiments on larger models suggest that the variation in the final test loss between different random seeds is roughly constant in magnitude for different model sizes.</En>
  <Zh>我们尝试了多种学习率与调度。一个小语言模型的多种调度及相应测试性能绘于图 \ref{fig:LearningRateSchedules}。我们的结论是：只要累计学习率总量足够大，且调度包含预热期和最终衰减到接近于零的学习率，学习率调度的选择基本无关紧要。不同调度之间的差异似乎是统计噪声，并可作为不同训练运行之间波动幅度的粗略度量。在更大模型上的实验表明，不同随机种子之间最终测试损失的差异对不同模型规模而言幅度大致恒定。</Zh>
</Para>

<Para>
  <En>We found that larger models require a smaller learning rate to prevent divergence, while smaller models can tolerate a larger learning rate. To implement this, the following rule of thumb was used for most runs:</En>
  <Zh>我们发现更大的模型需要更小的学习率以防发散，而更小的模型可以容忍更大的学习率。为此，大多数运行采用如下经验法则：</Zh>
</Para>

<Equation latex="\mathrm{LR}(N) \approx 0.003239 + -0.0001395  \log(N)" />

<Para>
  <En>We expect that this formula could be improved. There may be a dependence on network width, likely set by the initialization scale. The formula also breaks down for $N>10^{10}$ parameters. Nevertheless, we found that it works sufficiently well for the models we considered.</En>
  <Zh>我们预期这一公式还可以改进。它可能依赖于网络宽度（很可能由初始化尺度决定），并且在 $N>10^{10}$ 参数时失效。不过，对我们所考虑的模型它已足够好用。</Zh>
</Para>

<Heading :level="2" appendix en="Fit Details and Power Law Quality" zh="拟合细节与幂律质量" />

<Figure src="figures/2001.08361/PoorLogFit.svg" :width="40" label="fig:PoorLogFit" caption-en="The trend for performance as a function of parameter count, $L(N)$, is fit better by a power law than by other functions such as a logarithm at a qualitative level." caption-zh="性能随参数量 $L(N)$ 的趋势，在定性层面上用幂律拟合优于对数等其他函数。" />

<Figure src="figures/2001.08361/DepthVsGeneralization.svg" :width="50" label="fig:DepthVsGeneralization" caption-en="We show evaluations on a series of datasets for models with approximately 1.5 Billion parameters. We observe no effect of depth on generalization; generalization performance depends primarily on training distribution performance. The 12-layer model overfit the Internet Books dataset and we show the early-stopped performance; we have not seen this surprising result in other experiments." caption-zh="我们展示了约 15 亿参数模型在一系列数据集上的评估。我们未观察到深度对泛化的影响；泛化性能主要取决于训练分布上的性能。12 层模型在 Internet Books 数据集上过拟合，我们展示的是早停后的性能；在其他实验中我们没有见过这一令人意外的结果。" />

<Para>
  <En>We experimented with a number of functional forms for the fits to $L(N), L(C)$, and $L(D)$; the power-law fits were qualitatively much more accurate than other functions such as logarithms (see Figure \ref{fig:PoorLogFit}).</En>
  <Zh>我们尝试了多种函数形式来拟合 $L(N), L(C)$ 和 $L(D)$；幂律拟合在定性上远比对数等其他函数准确（见图 \ref{fig:PoorLogFit}）。</Zh>
</Para>

<Para>
  <En>For $L(C)$, we do not include small models with only 1 layer in the fit, as the transition from 1 to 2 layers causes a noticable lump in the data. For $L(N)$ we also do not include very small models with only 1 layer in the fit, and we exclude the largest models that have not trained fully to convergence. Fit parameters change marginally if we do include them, and the trend extrapolates well in both directions regardless.</En>
  <Zh>对于 $L(C)$，拟合中不包含只有 1 层的小模型，因为从 1 层到 2 层的转变在数据中造成一个明显的凸起。对于 $L(N)$，拟合中同样不包含只有 1 层的极小模型，并排除了尚未完全训练至收敛的最大模型。即使把它们包括进来，拟合参数的变化也很小，而且无论如何趋势在两个方向上外推都很好。</Zh>
</Para>

<Heading :level="2" appendix label="sec:DepthVsGeneralization" en="Generalization and Architecture" zh="泛化与架构" />

<Para>
  <En>In figure \ref{fig:DepthVsGeneralization} we show that generalization to other data distributions does not depend on network depth when we hold the total parameter count fixed. It seems to depend only on the performance on the training distribution.</En>
  <Zh>图 \ref{fig:DepthVsGeneralization} 表明，在固定总参数量时，对其他数据分布的泛化不依赖于网络深度。它似乎只取决于在训练分布上的性能。</Zh>
</Para>
</template>
