<!-- Background and Methods -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Equation, Table, Th, Td } from '../../../components/paper'
</script>

<template>
<Heading :level="1" en="Background and Methods" zh="背景与方法" />

<Para>
  <En>We train language models on WebText2, an extended version of the WebText \cite{radford2019language} dataset, tokenized using byte-pair encoding \cite{BPE} with a vocabulary size $n_{\rm vocab} = 50257$.  We optimize the autoregressive log-likelihood (i.e. cross-entropy loss) averaged over a 1024-token context, which is also our principal performance metric.  We record the loss on the WebText2 test distribution and on a selection of other text distributions.  We primarily train decoder-only \cite{liu2018generating, radford2018improving} Transformer \cite{OriginalTransformer} models, though we also train LSTM models and Universal Transformers \cite{DBLP:journals/corr/abs-1807-03819}  for comparison.</En>
  <Zh>我们在 WebText2 上训练语言模型，它是 WebText \cite{radford2019language} 数据集的扩展版本，使用字节对编码（byte-pair encoding）\cite{BPE} 进行分词，词表大小为 $n_{\rm vocab} = 50257$。我们优化在 1024 词元上下文上取平均的自回归对数似然（即交叉熵损失），它也是我们的主要性能指标。我们记录模型在 WebText2 测试分布以及若干其他文本分布上的损失。我们主要训练仅解码器（decoder-only）\cite{liu2018generating, radford2018improving} 的 Transformer \cite{OriginalTransformer} 模型，同时也训练了 LSTM 模型和 Universal Transformer \cite{DBLP:journals/corr/abs-1807-03819} 以作比较。</Zh>
</Para>

<Heading :level="2" label="sec:ParameterComputeCounts" en="Parameter and Compute Scaling of Transformers" zh="Transformer 的参数与算力标度" />

<Table label="tab:TableTransformerParamsFLOPs" caption-en="Parameter counts and compute (forward pass) estimates for a Transformer model.  Sub-leading terms such as nonlinearities, biases, and layer normalization are omitted." caption-zh="Transformer 模型的参数量与前向传播计算量估计。非线性、偏置与层归一化等次主导项已略去。">
  <tr>
    <Th align="left">\textbf{Operation}</Th>
    <Th align="left">\textbf{Parameters}</Th>
    <Th align="left">\textbf{FLOPs per Token}</Th>
  </tr>
  <tr>
    <Td align="left">Embed</Td>
    <Td align="left">$\left(n_{\rm vocab} + n_{\rm ctx}\right)d_{\rm model}$</Td>
    <Td align="left">$4d_{\rm model}$</Td>
  </tr>
  <tr>
    <Td align="left">Attention: QKV</Td>
    <Td align="left">$n_{\rm layer}d_{\rm model}3d_{\rm attn}$</Td>
    <Td align="left">$2n_{\rm layer}d_{\rm model}3d_{\rm attn}$</Td>
  </tr>
  <tr>
    <Td align="left">Attention: Mask</Td>
    <Td align="left">---</Td>
    <Td align="left">$2n_{\rm layer}n_{\rm ctx}d_{\rm attn}$</Td>
  </tr>
  <tr>
    <Td align="left">Attention: Project</Td>
    <Td align="left">$n_{\rm layer}d_{\rm attn}d_{\rm model}$</Td>
    <Td align="left">$2n_{\rm layer}d_{\rm attn}d_{\rm embd}$</Td>
  </tr>
  <tr>
    <Td align="left">Feedforward</Td>
    <Td align="left">$n_{\rm layer}2d_{\rm model}d_{\rm ff}$</Td>
    <Td align="left">$2n_{\rm layer}2d_{\rm model}d_{\rm ff}$</Td>
  </tr>
  <tr>
    <Td align="left">De-embed</Td>
    <Td align="left">---</Td>
    <Td align="left">$2d_{\rm model}n_{\rm vocab}$</Td>
  </tr>
  <tr>
    <Td align="left">\textbf{Total (Non-Embedding)}</Td>
    <Td align="left">$N=2d_{\rm model}n_{\rm layer}\left(2d_{\rm attn}+d_{\rm ff}\right)$</Td>
    <Td align="left">$C_{\mathrm{forward}}=2N+2n_{\rm layer}n_{\rm ctx}d_{\rm attn}$</Td>
  </tr>
</Table>

<Para>
  <En> We parameterize the Transformer architecture using hyperparameters $n_{\rm layer}$ (number of layers), $d_{\rm model}$ (dimension of the residual stream), $d_{\rm ff}$ (dimension of the intermediate feed-forward layer), $d_{\rm attn}$ (dimension of the attention output), and $n_{\rm heads}$ (number of attention heads per layer).  We include $n_{\rm ctx}$ tokens in the input context, with $n_{\rm ctx} = 1024$ except where otherwise noted.</En>
  <Zh>我们用如下超参数描述 Transformer 架构：$n_{\rm layer}$（层数）、$d_{\rm model}$（残差流的维度）、$d_{\rm ff}$（中间前馈层的维度）、$d_{\rm attn}$（注意力输出的维度），以及 $n_{\rm heads}$（每层注意力头数）。输入上下文包含 $n_{\rm ctx}$ 个词元，除特别说明外取 $n_{\rm ctx} = 1024$。</Zh>
</Para>

<Para>
  <En>We use $N$ to denote the model size, which we define as the number of \emph{non-embedding} parameters</En>
  <Zh>我们用 $N$ 表示模型规模，并将其定义为\emph{非嵌入}参数的数量：</Zh>
</Para>

<Equation label="eq:ModelSizeDefinition" latex="\begin{aligned}
N & \approx  2d_{\rm model}n_{\rm layer}\left(2d_{\rm attn}+d_{\rm ff}\right) \\
& = 12 n_{\rm layer} d_{\rm model}^2 \quad \text{ with the standard } \quad d_{\rm attn} = d_{\rm ff}/4 = d_{\rm model}
\end{aligned}" />

<Para>
  <En>where we have excluded biases and other sub-leading terms. Our models also have $n_{\rm vocab} d_{\rm model}$ parameters in an embedding matrix, and use $n_{\rm ctx} d_{\rm model}$ parameters for positional embeddings, but we do not include these when discussing the `model size' $N$; we will see that this produces significantly cleaner scaling laws.</En>
  <Zh>上式中我们排除了偏置项和其他次主导项。我们的模型在嵌入矩阵中还有 $n_{\rm vocab} d_{\rm model}$ 个参数，并使用 $n_{\rm ctx} d_{\rm model}$ 个参数作位置嵌入，但在讨论“模型规模”$N$ 时不把它们计入；我们将看到，这样做能得到明显更干净的缩放律。</Zh>
</Para>

<Para>
  <En>Evaluating a forward pass of the Transformer involves roughly</En>
  <Zh>对 Transformer 做一次前向传播大约需要</Zh>
</Para>

<Equation label="eq:ApproximateTotalCompute" latex="C_{\rm forward} \approx 2N + 2n_{\rm layer}n_{\rm ctx}d_{\rm model}" />

<Para>
  <En>add-multiply operations, where the factor of two comes from the multiply-accumulate operation used in matrix multiplication.  A more detailed per-operation parameter and compute count is included in Table \ref{tab:TableTransformerParamsFLOPs}.</En>
  <Zh>次乘加运算，其中因子 2 来自矩阵乘法中的乘加运算。更细致的逐操作参数量与计算量统计见表 \ref{tab:TableTransformerParamsFLOPs}。</Zh>
</Para>

<Para>
  <En>For contexts and models with $d_{\rm model} > n_{\rm ctx} / 12$, the context-dependent computational cost per token is a relatively small fraction of the total compute. Since we primarily study models where $d_{\rm model} \gg n_{\rm ctx}/12$, we do not include context-dependent terms in our training compute estimate.  Accounting for the backwards pass (approximately twice the compute as the forwards pass), we then define the estimated non-embedding compute as $C \approx 6 N$ floating point operators per training token.</En>
  <Zh>对于 $d_{\rm model} > n_{\rm ctx} / 12$ 的上下文和模型而言，每个词元依赖上下文的计算成本在总算力中占比相对较小。由于我们主要研究 $d_{\rm model} \gg n_{\rm ctx}/12$ 的模型，训练算力估计中不计入依赖上下文的项。再计入反向传播（计算量约为前向传播的两倍），我们将估计的非嵌入算力定义为每个训练词元 $C \approx 6 N$ 次浮点运算。</Zh>
</Para>

<Heading :level="2" en="Training Procedures" zh="训练流程" />

<Para>
  <En>Unless otherwise noted, we train  models with the Adam optimizer \cite{kingma2014adam} for a fixed $2.5 \times 10^5$  steps with a batch size of $512$ sequences of $1024$ tokens. Due to memory constraints, our largest models (more than 1B parameters) were trained with Adafactor \cite{DBLP:journals/corr/abs-1804-04235}. We experimented with a variety of learning rates and schedules, as discussed in Appendix \ref{app:OptimizationDetailsandErrorAnalysis}. We found that results at convergence were largely independent of learning rate schedule.  Unless otherwise noted, all training runs included in our data used a learning rate schedule with a 3000 step linear warmup followed by a cosine decay to zero.</En>
  <Zh>除非另有说明，我们使用 Adam 优化器 \cite{kingma2014adam} 以固定步数 $2.5 \times 10^5$、批量大小为 $512$ 条 $1024$ 词元序列来训练模型。受内存限制，我们最大的模型（超过 10 亿参数）使用 Adafactor \cite{DBLP:journals/corr/abs-1804-04235} 训练。我们尝试了多种学习率与调度方案，见附录 \ref{app:OptimizationDetailsandErrorAnalysis} 的讨论。我们发现收敛时的结果与学习率调度基本无关。除非另有说明，我们数据中包含的所有训练运行都采用如下学习率调度：3000 步线性预热，随后按余弦衰减至零。</Zh>
</Para>

<Heading :level="2" en="Datasets" zh="数据集" />

<Para>
  <En>We train our models on an extended version of the WebText dataset described in \cite{radford2019language}.  The original WebText dataset was a web scrape of outbound links from Reddit through December 2017 which received at least 3 karma. In the second version, WebText2, we added outbound Reddit links from the period of January to October 2018, also with a minimum of 3 karma. The karma threshold served as a heuristic for whether people found the link interesting or useful. The text of the new links was extracted with the Newspaper3k python library. In total, the dataset consists of 20.3M documents containing 96 GB of text and $1.62 \times 10^{10}$ words (as defined by \texttt{wc}). We then apply the reversible tokenizer described in \cite{radford2019language}, which yields $2.29 \times 10^{10}$ tokens.  We reserve $6.6 \times 10^{8}$ of these tokens for use as a test set, and we also test on similarly-prepared samples of Books Corpus \cite{Zhu_2015}, Common Crawl \cite{commoncrawl}, English Wikipedia, and a collection of publicly-available Internet Books.</En>
  <Zh>我们在 \cite{radford2019language} 所描述的 WebText 数据集的扩展版本上训练模型。最初的 WebText 数据集抓取了截至 2017 年 12 月 Reddit 上获得至少 3 个 karma 的外链。在第二个版本 WebText2 中，我们补充了 2018 年 1 月至 10 月间的 Reddit 外链，同样要求至少 3 个 karma。karma 阈值被用作“人们是否觉得该链接有趣或有用”的启发式判断。新链接的文本用 Newspaper3k Python 库提取。数据集总计包含 2030 万篇文档、96 GB 文本和 $1.62 \times 10^{10}$ 个词（按 \texttt{wc} 的定义）。随后我们使用 \cite{radford2019language} 描述的可逆分词器，得到 $2.29 \times 10^{10}$ 个词元。我们预留其中 $6.6 \times 10^{8}$ 个词元作为测试集，另外还在类似准备的 Books Corpus \cite{Zhu_2015}、Common Crawl \cite{commoncrawl}、英文维基百科以及公开网络图书合集的样本上进行测试。</Zh>
</Para>
</template>
