<!-- Empirical Results and Basic Power Laws -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Figure, Bullets, Item } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:Empirical" en="Empirical Results and Basic Power Laws" zh="实证结果与基本幂律" />

<Para>
  <En>To characterize language model scaling we train a wide variety of models, varying a number of factors including:</En>
  <Zh>为刻画语言模型的缩放行为，我们训练了多种多样的模型，变化因素包括：</Zh>
</Para>

<Bullets>
  <Item>
    <En>Model size (ranging in size from 768 to 1.5 billion non-embedding parameters)</En>
    <Zh>模型规模（从 768 到 15 亿个非嵌入参数）</Zh>
  </Item>
  <Item>
    <En>Dataset size (ranging from 22 million to 23 billion tokens)</En>
    <Zh>数据集规模（从 2200 万到 230 亿个词元）</Zh>
  </Item>
  <Item>
    <En>Shape (including depth, width, attention heads, and feed-forward dimension)</En>
    <Zh>形状（包括深度、宽度、注意力头数与前馈层维度）</Zh>
  </Item>
  <Item>
    <En>Context length (1024 for most runs, though we also experiment with shorter contexts)</En>
    <Zh>上下文长度（大多数运行为 1024，我们也试验了更短的上下文）</Zh>
  </Item>
  <Item>
    <En>Batch size ($2^{19}$ for most runs, but we also vary it to measure the critical batch size)</En>
    <Zh>批量大小（大多数运行为 $2^{19}$，我们也改变它以测量临界批量）</Zh>
  </Item>
</Bullets>

<Para>
  <En>In this section we will display data along with empirically-motivated fits, deferring theoretical analysis to later sections.</En>
  <Zh>本节将展示数据及基于经验的拟合，理论分析留待后续章节。</Zh>
</Para>

<Heading :level="2" label="sec:ShapeIndependence" en="Approximate Transformer Shape and Hyperparameter Independence" zh="Transformer 形状与超参数的近似无关性" />

<Figure src="figures/2001.08361/HyperparameterTuning.svg" :width="100" label="fig:HeadsLayersIndependence" caption-en="Performance depends very mildly on model shape when the total number of non-embedding parameters $N$ is held fixed. The loss varies only a few percent over a wide range of shapes. Small differences in parameter counts are compensated for by using the fit to $L(N)$ as a baseline. Aspect ratio in particular can vary by a factor of 40 while only slightly impacting performance; an $(n_{\mathrm{layer}}, d_{\mathrm{model}}) = (6, 4288)$ reaches a loss within 3\% of the $(48, 1600)$ model used in \cite{radford2019language}." caption-zh="在非嵌入参数总数 $N$ 固定时，性能对模型形状的依赖非常轻微：在很宽的形状范围内损失只变化几个百分点。参数量的微小差异通过以 $L(N)$ 的拟合作为基线来补偿。尤其长宽比可以变化 40 倍而对性能影响甚微；$(n_{\mathrm{layer}}, d_{\mathrm{model}}) = (6, 4288)$ 所达到的损失与 \cite{radford2019language} 使用的 $(48, 1600)$ 模型相差在 3\% 以内。" />

<Para>
  <En>Transformer performance depends very weakly on the shape parameters $n_{\rm layer}, n_{\rm heads}$, and $d_{\rm ff}$ when we hold the total non-embedding parameter count $N$ fixed. To establish these results we trained models with fixed size while varying a single hyperparameter. This was simplest for the case of $n_{\rm heads}$. When varying $n_{\rm layer}$, we simultaneously varied $d_{\rm model}$ while keeping $N \approx 12 n_{\rm layer} d_{\rm model}^2$ fixed. Similarly, to vary $d_{\rm ff}$ at fixed model size we also simultaneously varied the $d_{\rm model}$ parameter, as required by the parameter counts in Table \ref{tab:TableTransformerParamsFLOPs}. Independence of $n_{\rm layers}$ would follow if deeper Transformers effectively behave as ensembles of shallower models, as has been suggested for ResNets \cite{ResNetsEnsemblesShallow}. The results are shown in Figure \ref{fig:HeadsLayersIndependence}.</En>
  <Zh>在固定非嵌入参数总数 $N$ 时，Transformer 性能对形状参数 $n_{\rm layer}, n_{\rm heads}$ 和 $d_{\rm ff}$ 的依赖非常弱。为确立这些结果，我们在固定模型规模的同时只改变单个超参数进行训练。这对 $n_{\rm heads}$ 最容易实现。改变 $n_{\rm layer}$ 时，我们同时调整 $d_{\rm model}$ 以保持 $N \approx 12 n_{\rm layer} d_{\rm model}^2$ 不变。类似地，要在固定模型规模下改变 $d_{\rm ff}$，也需按表 \ref{tab:TableTransformerParamsFLOPs} 的参数统计同时调整 $d_{\rm model}$。如果更深的 Transformer 实际上表现得像多个浅层模型的集成——正如对 ResNets \cite{ResNetsEnsemblesShallow} 所提出的那样——那么性能对 $n_{\rm layers}$ 的无关性便可得到解释。结果见图 \ref{fig:HeadsLayersIndependence}。</Zh>
</Para>

<Heading :level="2" label="sec:PerformancevsModelSize" en="Performance with Non-Embedding Parameter Count N" zh="非嵌入参数量 N 与性能" />

<Figure src="figures/2001.08361/PerfVsModelSizeAllParams.svg" :width="60" label="fig:PerformancevsModelSizeBody" caption-en="\textbf{Left:} When we include embedding parameters, performance appears to depend strongly on the number of layers in addition to the number of parameters." caption-zh="\textbf{左}：计入嵌入参数时，性能除参数量外似乎还强烈依赖于层数。" />
<Figure src="figures/2001.08361/PerfVsModelSizeNonEmbed.svg" :width="60" caption-en="\textbf{Right:} When we exclude embedding parameters, the performance of models with different depths converge to a single trend. Only models with fewer than 2 layers or with extreme depth-to-width ratios deviate significantly from the trend." caption-zh="\textbf{右}：排除嵌入参数后，不同深度的模型性能收敛到单一趋势。只有层数少于 2 层或深宽比极端的模型才明显偏离该趋势。" />

<Para>
  <En>In Figure \ref{fig:PerformancevsModelSizeBody} we display the performance of a wide variety of models, ranging from small models with shape $(n_{\rm layer}, d_{\rm model}) = (2, 128)$ through billion-parameter models, ranging in shape from $(6, 4288)$ through $(207, 768)$. Here we have trained to near convergence on the full WebText2 dataset and observe no overfitting (except possibly for the very largest models).</En>
  <Zh>图 \ref{fig:PerformancevsModelSizeBody} 展示了多种多样模型的性能：从形状为 $(n_{\rm layer}, d_{\rm model}) = (2, 128)$ 的小模型，到形状介于 $(6, 4288)$ 与 $(207, 768)$ 之间的十亿参数级模型。这里我们在完整的 WebText2 数据集上训练到接近收敛，未观察到过拟合（最大的几个模型可能除外）。</Zh>
</Para>

<Para>
  <En>As shown in Figure \ref{fig:BasicPowerLaws}, we find a steady trend with non-embedding parameter count $N$, which can be fit to the first term of Equation \eqref{eq:FundamentalLikelihioodvsModelandDataSize}, so that</En>
  <Zh>如图 \ref{fig:BasicPowerLaws} 所示，我们发现性能随非嵌入参数量 $N$ 呈稳定趋势，可用公式 \eqref{eq:FundamentalLikelihioodvsModelandDataSize} 的第一项拟合，即</Zh>
</Para>

<Equation latex="L(N) \approx \left( \frac{N_c}{N} \right)^{ \alpha_N }"
  :tips="{ L: '模型在留出数据上的测试损失', N: '非嵌入参数量', N_c: '参数尺度常数（拟合学得）', '\\alpha_N': '参数项的幂律指数' }" />

<Para>
  <En>To observe these trends it is crucial to study performance as a function of $N$; if we instead use the total parameter count (including the embedding parameters) the trend is somewhat obscured (see Figure \ref{fig:PerformancevsModelSizeBody}). This suggests that the embedding matrix can be made smaller without impacting performance, as has been seen in recent work \cite{lan2019albert}.</En>
  <Zh>要观察到这些趋势，关键在于把性能作为 $N$ 的函数来研究；若改用总参数量（含嵌入参数），趋势会有所模糊（见图 \ref{fig:PerformancevsModelSizeBody}）。这提示嵌入矩阵可以在不影响性能的情况下做得更小，与近期工作 \cite{lan2019albert} 的观察一致。</Zh>
</Para>

<Para>
  <En>Although these models have been trained on the WebText2 dataset, their test loss on a variety of other datasets is also a power-law in $N$ with nearly identical power, as shown in Figure \ref{fig:GeneralizationVsModelSize}.</En>
  <Zh>尽管这些模型是在 WebText2 数据集上训练的，它们在多种其他数据集上的测试损失同样随 $N$ 呈幂律变化，且幂指数几乎相同，见图 \ref{fig:GeneralizationVsModelSize}。</Zh>
</Para>

<Heading :level="3" en="Comparing to LSTMs and Universal Transformers" zh="与 LSTM 及 Universal Transformer 的比较" />

<Figure src="figures/2001.08361/LSTMvsTransformerSummary.svg" :width="60" label="fig:LSTMvsTransformers" caption-en="LSTM and Transformer performance comparison" caption-zh="LSTM 与 Transformer 的性能比较" />

<Para>
  <En>In Figure \ref{fig:LSTMvsTransformers} we compare LSTM and Transformer performance as a function of non-embedding parameter count $N$. The LSTMs were trained with the same dataset and context length. We see from these figures that the LSTMs perform as well as Transformers for tokens appearing early in the context, but cannot match the Transformer performance for later tokens. We present power-law relationships between performance and context position Appendix \ref{sec:ContextDependence}, where increasingly large powers for larger models suggest improved ability to quickly recognize patterns.</En>
  <Zh>图 \ref{fig:LSTMvsTransformers} 比较了 LSTM 与 Transformer 的性能随非嵌入参数量 $N$ 的变化。LSTM 使用相同的数据集与上下文长度训练。从图中可以看到，对于上下文中较早出现的词元，LSTM 的表现与 Transformer 相当，但在较后的词元上则无法匹敌 Transformer。我们在附录 \ref{sec:ContextDependence} 中给出性能与上下文位置之间的幂律关系；模型越大幂指数越大，表明其快速识别模式的能力更强。</Zh>
</Para>

<Para>
  <En>We also compare the performance of standard Transformers to recurrent Transformers \cite{DBLP:journals/corr/abs-1807-03819} in Figure \ref{fig:RecurrentTransformers} in the appendix. These models re-use parameters, and so perform slightly better as a function of $N$, at the cost of additional compute per-parameter.</En>
  <Zh>我们还在附录图 \ref{fig:RecurrentTransformers} 中比较了标准 Transformer 与循环 Transformer \cite{DBLP:journals/corr/abs-1807-03819} 的性能。后者重复使用参数，因此作为 $N$ 的函数表现稍好，代价是每参数的计算量增加。</Zh>
</Para>

<Heading :level="3" label="sec:GeneralizationtoOtherDistributions" en="Generalization Among Data Distributions" zh="跨数据分布的泛化" />

<Para>
  <En>We have also tested our models on a set of additional text data distributions. The test loss on these datasets as a function of model size is shown in Figure \ref{fig:GeneralizationVsModelSize}; in all cases the models were trained only on the WebText2 dataset. We see that the loss on these other data distributions improves smoothly with model size, in direct parallel with the improvement on WebText2. We find that generalization depends almost exclusively on the in-distribution validation loss, and does not depend on the duration of training or proximity to convergence. We also observe no dependence on model depth (see Appendix \ref{sec:DepthVsGeneralization}).</En>
  <Zh>我们还在一组额外的文本数据分布上测试了模型。模型在这些数据集上的测试损失随模型规模的变化见图 \ref{fig:GeneralizationVsModelSize}；所有情况下模型都只在 WebText2 数据集上训练。我们看到，模型在这些其他数据分布上的损失随模型规模平稳改善，与 WebText2 上的改善完全同步。我们发现泛化几乎只取决于同分布验证损失，而与训练时长或是否接近收敛无关。我们也未观察到对模型深度的依赖（见附录 \ref{sec:DepthVsGeneralization}）。</Zh>
</Para>

<Figure src="figures/2001.08361/GeneralizationVsModelSize.svg" :width="60" label="fig:GeneralizationVsModelSize" caption-en="\textbf{Left:} Generalization performance to other data distributions improves smoothly with model size, with only a small and very slowly growing offset from the WebText2 training distribution." caption-zh="\textbf{左：}对其他数据分布的泛化性能随模型规模平稳提升，与 WebText2 训练分布相比只有很小且增长极慢的偏移。" />
<Figure src="figures/2001.08361/TrainingVsConvergence.svg" :width="60" caption-en="\textbf{Right:} Generalization performance depends only on training distribution performance, and not on the phase of training. We compare generalization of converged models (points) to that of a single large model (dashed curves) as it trains." caption-zh="\textbf{右：}泛化性能只取决于训练分布上的性能，而与训练阶段无关。我们将收敛模型（散点）的泛化与单个大模型训练过程（虚线）的泛化进行比较。" />

<Heading :level="2" en="Performance with Dataset Size and Compute" zh="数据集规模与算力对应的性能" />

<Para>
  <En>We display empirical trends for the test loss as a function of dataset size $D$ (in tokens) and training compute $C$ in Figure \ref{fig:BasicPowerLaws}.</En>
  <Zh>我们在图 \ref{fig:BasicPowerLaws} 中展示了测试损失随数据集规模 $D$（以词元计）和训练算力 $C$ 变化的经验趋势。</Zh>
</Para>

<Para>
  <En>For the trend with $D$ we trained a model with $(n_{\rm layer}, n_{\rm embd}) = (36, 1280)$ on fixed subsets of the WebText2 dataset. We stopped training once the test loss ceased to decrease. We see that the resulting test losses can be fit with simple power-law</En>
  <Zh>对于 $D$ 的趋势，我们在 WebText2 数据集的固定子集上训练了一个 $(n_{\rm layer}, n_{\rm embd}) = (36, 1280)$ 的模型，并在测试损失不再下降时停止训练。可以看到，所得测试损失可用简单幂律拟合：</Zh>
</Para>

<Equation latex="L(D) \approx \left( \frac{D_c}{D} \right)^{\alpha_D}"
  :tips="{ L: '模型在留出数据上的测试损失', D: '数据集规模（词元数）', D_c: '数据尺度常数（拟合学得）', '\\alpha_D': '数据项的幂律指数' }" />

<Para>
  <En>in the dataset size. The data and fit appear in Figure \ref{fig:BasicPowerLaws}.</En>
  <Zh>即关于数据集规模的幂律。数据与拟合见图 \ref{fig:BasicPowerLaws}。</Zh>
</Para>

<Para>
  <En>The total amount of non-embedding compute used during training can be estimated as $C = 6 N B S$, where $B$ is the batch size, $S$ is the number of parameter updates, and the factor of $6$ accounts for the forward and backward passes. Thus for a given value of $C$ we can scan over all models with various $N$ to find the model with the best performance on step $S = \frac{C}{6 B S}$. Note that in these results \emph{the batch size $B$ remains fixed for all models}, which means that these empirical results are not truly optimal. We will account for this in later sections using an adjusted $C_{\rm min}$ to produce cleaner trends.</En>
  <Zh>训练期间使用的非嵌入总算力可估计为 $C = 6 N B S$，其中 $B$ 为批量大小，$S$ 为参数更新次数，因子 $6$ 计入了前向与反向传播。因此对给定的 $C$，我们可以遍历各种 $N$ 的模型，找出在第 $S = \frac{C}{6 B S}$ 步性能最好的模型。注意在这些结果中\emph{所有模型的批量大小 $B$ 保持固定}，这意味着这些经验结果并非真正最优。我们将在后续章节中使用调整后的 $C_{\rm min}$ 来修正这一点，以得到更干净的趋势。</Zh>
</Para>

<Para>
  <En>The result appears as the heavy black line on the left-hand plot in Figure \ref{fig:BasicPowerLaws}. It can be fit with</En>
  <Zh>结果为图 \ref{fig:BasicPowerLaws} 左图中的黑色粗线，可用下式拟合：</Zh>
</Para>

<Equation latex="L(C) \approx \left( \frac{C_c}{C} \right)^{\alpha_C}"
  :tips="{ L: '模型在留出数据上的测试损失', C: '训练使用的非嵌入总算力（FLOPs）', C_c: '算力尺度常数（拟合学得）', '\\alpha_C': '算力项的幂律指数' }" />

<Para>
  <En>The figure also includes images of individual learning curves to clarify when individual models are optimal. We will study the optimal allocation of compute more closely later on. The data strongly suggests that sample efficiency improves with model size, and we also illustrate this directly in Figure \ref{fig:SampleEfficiency} in the appendix.</En>
  <Zh>图中还画出了单条学习曲线，以说明各个模型分别在何时最优。我们稍后将更细致地研究算力的最优分配。数据有力地表明样本效率随模型规模提升；我们在附录图 \ref{fig:SampleEfficiency} 中也直接展示了这一点。</Zh>
</Para>
</template>
