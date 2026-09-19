<!-- Related Work -->
<script setup lang="ts">
import { Heading, Para, En, Zh } from '../../../components/paper'
</script>

<template>
<Heading :level="1" en="Related Work" zh="相关工作" />

<Para>
  <En>Power laws can arise from a wide variety of sources \cite{thurner2018introduction}. Power-law scalings with model and dataset size in density estimation \cite{wasserman2006all} and in random forest models \cite{biau2012analysis} may be connected with our results. These models suggest that power-law exponents may have a very rough interpretation as the inverse of the number of relevant features in the data.</En>
  <Zh>幂律可以由多种多样的来源产生 \cite{thurner2018introduction}。密度估计 \cite{wasserman2006all} 与随机森林模型 \cite{biau2012analysis} 中性能随模型和数据集规模的幂律标度可能与我们的结果相关。这些模型提示，幂律指数或许可以被非常粗略地解读为数据中相关特征数量的倒数。</Zh>
</Para>

<Para>
  <En>Some early \cite{banko2001scaling, DBLP:journals/corr/cs-CL-0108005} work found power-law scalings between performance and dataset size. More recent work \cite{1712.00409, Hestness:2019:BHA:3293883.3295710} also investigated scaling between model size and data size; their work is perhaps the closest to ours in the literature\footnote{After this work was completed, \cite{rosenfeld2019constructive} also appeared, which makes similar predictions for the dependence of loss on both model and dataset size.}. Note, however, that \cite{1712.00409} found super-linear scaling of dataset size with model size, whereas we find a sub-linear scaling. There are some parallels between our findings on optimal allocation of compute and \cite{1906.06669}, including power-law learning curves. EfficientNets \cite{DBLP:journals/corr/abs-1905-11946} also appear to obey an approximate power-law relation between accuracy and model size. Very recent work \cite{1909.12673} studies scaling with both dataset size and model size for a variety of datasets, and fits an ansatz similar to ours.</En>
  <Zh>一些早期工作 \cite{banko2001scaling, DBLP:journals/corr/cs-CL-0108005} 发现了性能与数据集规模之间的幂律标度。较近的工作 \cite{1712.00409, Hestness:2019:BHA:3293883.3295710} 也研究了模型规模与数据规模之间的标度关系；这些工作或许是文献中与我们的最接近的\footnote{本工作完成后，\cite{rosenfeld2019constructive} 也出现了，它对损失与模型、数据集规模的依赖作出了类似的预测。}。但请注意，\cite{1712.00409} 发现数据集规模随模型规模超线性增长，而我们发现的是次线性标度。我们关于算力最优分配的发现与 \cite{1906.06669} 有一些相似之处，包括幂律学习曲线。EfficientNets \cite{DBLP:journals/corr/abs-1905-11946} 似乎也服从准确率与模型规模之间的近似幂律关系。最新的工作 \cite{1909.12673} 研究了多种数据集上随数据集规模与模型规模的标度，并拟合了与我们类似的设定。</Zh>
</Para>

<Para>
  <En>EfficientNet \cite{DBLP:journals/corr/abs-1905-11946} advocates scaling depth and width exponentially (with different coefficients) for optimal performance of image models, resulting in a power-law scaling of width as a function of depth. We find that for language models this power should be roughly one when scaling up (as width/depth should remain fixed). But more importantly, we find that the precise architectural hyperparameters are unimportant compared to the overall scale of the language model. In \cite{ResNetsEnsemblesShallow} it was argued that deep models can function as ensembles of shallower models, which could potentially explain this finding. Earlier work \cite{Zagoruyko_2016} has compared width and depth, and found that wide ResNets can outperform deep ResNets on image classification. Some studies fix computation per data example, which tends to scale in proportion to the number of model parameters, whereas we investigate scaling with both model size and the quantity of training computation.</En>
  <Zh>EfficientNet \cite{DBLP:journals/corr/abs-1905-11946} 主张对图像模型按指数（以不同系数）缩放深度与宽度以获得最优性能，由此得到宽度随深度的幂律标度。我们发现对语言模型而言，扩大规模时该幂指数应约为一（因为宽度/深度应保持固定）。但更重要的是，我们发现与语言模型的整体规模相比，具体的架构超参数并不重要。\cite{ResNetsEnsemblesShallow} 中提出深模型可以起到多个浅模型集成的作用，这或许可以解释这一发现。更早的工作 \cite{Zagoruyko_2016} 比较了宽度与深度，发现宽 ResNet 在图像分类上可以胜过深 ResNet。一些研究固定每个数据样本的计算量（它大致与模型参数量成比例），而我们则同时考察模型规模与训练计算量的标度。</Zh>
</Para>

<Para>
  <En>Various works \cite{1710.03667,1812.11118} have investigated generalization in highly overparameterized models, finding a ``jamming transition'' \cite{1901.01608} when the model size reaches the dataset size (this may require training many orders of magnitude beyond typical practice, and in particular does not use early stopping). We do not observe such a transition, and find that the necessary training data scales sublinearly in the model size. Expansions in the model size, particularly at large width \cite{jacot2018neural, 1902.06720}, may provide a useful framework for thinking about some of our scaling relations. Our results on optimization, such as the shape of learning curves, can likely be explained using a noisy quadratic model, which can provide quite accurate predictions \cite{DBLP:journals/corr/abs-1907-04164} in realistic settings. Making this connection quantitative will require a characterization of the Hessian spectrum \cite{DBLP:journals/corr/abs-1811-07062, DBLP:journals/corr/abs-1901-10159, unpublished-grd}.</En>
  <Zh>多项工作 \cite{1710.03667,1812.11118} 研究了高度过参数化模型中的泛化，发现当模型规模达到数据集规模时存在“jamming 相变” \cite{1901.01608}（这可能需要训练到超出常规实践许多个数量级，尤其是不使用早停）。我们没有观察到这样的相变，并发现所需训练数据随模型规模次线性增长。模型规模展开（尤其在大宽度下 \cite{jacot2018neural, 1902.06720}）或许为思考我们的某些标度关系提供了有用的框架。我们在优化方面的结果（如学习曲线的形状）很可能可以用带噪二次模型解释，该模型在现实设定中能给出相当准确的预测 \cite{DBLP:journals/corr/abs-1907-04164}。把这一联系定量化需要对 Hessian 谱的刻画 \cite{DBLP:journals/corr/abs-1811-07062, DBLP:journals/corr/abs-1901-10159, unpublished-grd}。</Zh>
</Para>
</template>
