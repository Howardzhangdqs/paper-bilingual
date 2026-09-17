<!-- Evaluation Details -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Table, Td } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:other" appendix en="Evaluation Details" zh="评估细节" />

<Table label="tab:setupval" caption-en="\textbf{Setup for computing validation loss during training.} At every \emph{Evaluation Interval}, loss is computed on \emph{Evaluation Tokens} many tokens from the validation set. The evaluation tokens vary with the interval, i.e. the evaluation tokens at 100 steps are not the same as at 200 steps. However, the tokens do not vary across data budgets for the same FLOP budget (\autoref{fig:validation}). For example, $N=2.8$ billion parameter models with $D_C=55$ billion tokens are evaluated on the same data as models with $D_C=28$ billion tokens at each evaluation interval." caption-zh="\textbf{训练过程中计算验证损失的设置。}每隔\emph{评估间隔}（Evaluation Interval），在验证集的\emph{评估词元}（Evaluation Tokens）个词元上计算损失。评估词元随间隔变化，即 100 步时的评估词元与 200 步时不同。但对同一 FLOP 预算，评估词元在不同数据预算间保持不变（\autoref{fig:validation}）。例如，$D_C=550$ 亿词元的 $N=28$ 亿参数模型在每个评估间隔上与 $D_C=280$ 亿词元的模型在相同数据上评估。">
  <tr>
    <Td align="center">FLOP budget</Td>
    <Td align="center">Parameters</Td>
    <Td align="center">Evaluation Interval</Td>
    <Td align="center">Evaluation Tokens</Td>
  </tr>
  <tr>
    <Td align="center">$9.3 \times 10^{20}$</Td>
    <Td align="center">$2.8$B</Td>
    <Td align="center">100</Td>
    <Td align="center">105 million</Td>
  </tr>
  <tr>
    <Td align="center">$2.1 \times 10^{21}$</Td>
    <Td align="center">$4.2$B</Td>
    <Td align="center">1000</Td>
    <Td align="center">105 million</Td>
  </tr>
  <tr>
    <Td align="center">$9.3 \times 10^{21}$</Td>
    <Td align="center">$8.7$B</Td>
    <Td align="center">1000</Td>
    <Td align="center">2.1 million</Td>
  </tr>
</Table>

<Para>
  <En>Loss evaluation} For all models trained on C4, the final test loss is computed on the same 210 million tokens from the C4 validation set after training. For held-out evaluation during training, such as in \autoref{fig:validation}, the configurations are displayed in \autoref{tab:setupval}. The small number of evaluation tokens for the 8.7 billion parameter models likely contributes to the loss spikes for 8.7 billion parameter models seen in \autoref{fig:validation}. Thus, we smooth the validation loss curves of 8.7 billion parameter models with exponential moving average smoothing and a weight of 0.85. For training on OSCAR, configurations are the same, however, the validation split used is a held-out part from the OSCAR training split, as there is no official validation split for OSCAR. All training loss curves for C4 and OSCAR models are smoothed with exponential moving average smoothing and a weight of 0.999.</En>
  <Zh>损失评估}对所有在 C4 上训练的模型，最终测试损失在训练结束后从 C4 验证集的同一批 2.1 亿词元上计算。训练过程中的留出评估（如 \autoref{fig:validation}）所用配置见 \autoref{tab:setupval}。87 亿参数模型的评估词元数量很少，这可能是 \autoref{fig:validation} 中 87 亿参数模型出现损失尖峰的原因之一。因此，我们对 87 亿参数模型的验证损失曲线做权重 0.85 的指数移动平均平滑。在 OSCAR 上训练时配置相同，但由于 OSCAR 没有官方验证集，所用验证集是 OSCAR 训练集中留出的一部分。C4 与 OSCAR 所有模型的训练损失曲线均做权重 0.999 的指数移动平均平滑。</Zh>
</Para>

<Para>
  <En>Downstream evaluation} We provide statistics of all downstream evaluation datasets in \autoref{tab:eval}. We use the evaluation-harness frameworks from BigScience and EleutherAI~\cite{eval-harness} to evaluate models on 19 evaluation datasets. For each dataset, a maximum of 3000 samples are evaluated with 0,1,2,3,4 and 5 few-shots~\cite{brown2020language} to produce six scores which are then averaged.  We normalize scores to range from the random baseline of each task to 1 and report them as percentages. For example, if random guessing produces 50\% accuracy and the maximum accuracy possible is 100\%, then a raw accuracy of 55\% would be normalized to 10\%, and a raw accuracy of 45\% would be normalized to -10\% since it is worse than random. This is done to give all tasks the same weight. Otherwise average performance would heavily depend on generative tasks, where the random baselines are 0. Prompts are sourced from GPT-3~\cite{brown2020language} and PromptSource~\cite{promptsource} and detailed in \autoref{sec:samples}. We note that our evaluation is in no means comprehensive and a larger benchmarking would be helpful~\cite{srivastava2022beyond,muennighoff2022mteb}. However, by training five seeds for most models benchmarked, always averaging 0-5 fewshots, and ensuring maximum data overlap for repeated data (\autoref{sec:exp}) we significantly reduce uncertainty.</En>
  <Zh>下游评估}我们在 \autoref{tab:eval} 中给出全部下游评估数据集的统计信息。我们使用 BigScience 与 EleutherAI 的 evaluation-harness 框架~\cite{eval-harness} 在 19 个评估数据集上评估模型。对每个数据集，最多评估 3000 个样本，分别以 0、1、2、3、4、5 个少样本示例~\cite{brown2020language}进行评估，产生六个分数后取平均。我们把分数归一化到从各任务的随机基线到 1 的区间，并以百分比报告。例如，若随机猜测的准确率为 50\%、最高可能准确率为 100\%，则 55\% 的原始准确率归一化为 10\%，而 45\% 的原始准确率因低于随机而归一化为 -10\%。这样做是为了让所有任务具有相同权重，否则平均性能将严重取决于随机基线为 0 的生成式任务。提示词来自 GPT-3~\cite{brown2020language} 与 PromptSource~\cite{promptsource}，详见 \autoref{sec:samples}。我们指出，本评估绝非全面，更大规模的基准测试会更有帮助~\cite{srivastava2022beyond,muennighoff2022mteb}。不过，通过为大多数被评测模型训练五个随机种子、始终对 0-5 few-shot 取平均，并确保重复数据的最大重叠（\autoref{sec:exp}），我们显著降低了不确定性。</Zh>
</Para>

<Table label="tab:eval" caption-en="\textbf{Downstream evaluation datasets.} We evaluate on 19 datasets: The first 14 are evaluated using accuracy (ANLI counted as three), the next 4 using ROUGE-2 f-measure~\cite{lin2004rouge} and bAbI using exact match." caption-zh="\textbf{下游评估数据集。}我们在 19 个数据集上评估：前 14 个使用准确率（ANLI 计为三个），接下来 4 个使用 ROUGE-2 F 值~\cite{lin2004rouge}，bAbI 使用精确匹配。">
  <tr>
    <Td align="left">Dataset</Td>
    <Td align="left">Split(s)</Td>
    <Td align="left">Samples</Td>
    <Td align="left">Baseline</Td>
    <Td align="left">URL</Td>
  </tr>
  <tr>
    <Td align="left">ANLI~\cite{nie2019adversarial}</Td>
    <Td align="left">dev\_r{1,2,3}</Td>
    <Td align="left">3000</Td>
    <Td align="left">33.3</Td>
    <Td align="left">\rurl{hf.co/datasets/anli}</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy~\cite{allenai:arc}</Td>
    <Td align="left">test</Td>
    <Td align="left">1172</Td>
    <Td align="left">25.0</Td>
    <Td align="left">\rurl{hf.co/datasets/ai2_arc}</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge~\cite{allenai:arc}</Td>
    <Td align="left">test</Td>
    <Td align="left">2376</Td>
    <Td align="left">25.0</Td>
    <Td align="left">\rurl{hf.co/datasets/ai2_arc}</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ~\cite{clark2019boolq}</Td>
    <Td align="left">validation</Td>
    <Td align="left">3270</Td>
    <Td align="left">50.0</Td>
    <Td align="left">\rurl{hf.co/datasets/boolq}</Td>
  </tr>
  <tr>
    <Td align="left">CB~\cite{de2019commitmentbank}</Td>
    <Td align="left">validation</Td>
    <Td align="left">56</Td>
    <Td align="left">33.3</Td>
    <Td align="left">\rurl{hf.co/datasets/super_glue}</Td>
  </tr>
  <tr>
    <Td align="left">Copa~\cite{roemmele2011choice}</Td>
    <Td align="left">validation</Td>
    <Td align="left">100</Td>
    <Td align="left">50.0</Td>
    <Td align="left">\rurl{hf.co/datasets/super_glue}</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag~\cite{zellers2019hellaswag}</Td>
    <Td align="left">test</Td>
    <Td align="left">10003</Td>
    <Td align="left">25.0</Td>
    <Td align="left">\rurl{hf.co/datasets/hellaswag}</Td>
  </tr>
  <tr>
    <Td align="left">PiQA~\cite{Bisk2020}</Td>
    <Td align="left">validation</Td>
    <Td align="left">1838</Td>
    <Td align="left">50.0</Td>
    <Td align="left">\rurl{hf.co/datasets/piqa}</Td>
  </tr>
  <tr>
    <Td align="left">RTE~\cite{dagan2006pascal,wang2019superglue}</Td>
    <Td align="left">validation</Td>
    <Td align="left">277</Td>
    <Td align="left">50.0</Td>
    <Td align="left">\rurl{hf.co/datasets/super_glue}</Td>
  </tr>
  <tr>
    <Td align="left">SciQ~\cite{welbl2017crowdsourcing}</Td>
    <Td align="left">test</Td>
    <Td align="left">1000</Td>
    <Td align="left">25.0</Td>
    <Td align="left">\rurl{hf.co/datasets/sciq}</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016~\cite{mostafazadeh2017lsdsem}</Td>
    <Td align="left">test</Td>
    <Td align="left">1871</Td>
    <Td align="left">25.0</Td>
    <Td align="left">\rurl{hf.co/datasets/story_cloze}</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL~\cite{sakaguchi2021winogrande}</Td>
    <Td align="left">test</Td>
    <Td align="left">1267</Td>
    <Td align="left">50.0</Td>
    <Td align="left">\rurl{hf.co/datasets/winogrande}</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG~\cite{dusek.etal2020:csl}</Td>
    <Td align="left">test</Td>
    <Td align="left">4693</Td>
    <Td align="left">0.0</Td>
    <Td align="left">\rurl{hf.co/datasets/e2e_nlg_cleaned}</Td>
  </tr>
  <tr>
    <Td align="left">XSUM~\cite{xsum-emnlp,gehrmann2021gem}</Td>
    <Td align="left">test</Td>
    <Td align="left">11334</Td>
    <Td align="left">0.0</Td>
    <Td align="left">\rurl{hf.co/datasets/GEM/xsum}</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN~\cite{castro-ferreira20:bilin-bi-direc-webnl-shared,gehrmann2021gem}</Td>
    <Td align="left">test</Td>
    <Td align="left">5150</Td>
    <Td align="left">0.0</Td>
    <Td align="left">\rurl{hf.co/datasets/GEM/web_nlg}</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN~\cite{ladhak2020wikilingua,gehrmann2021gem}</Td>
    <Td align="left">sampled\_test</Td>
    <Td align="left">3000</Td>
    <Td align="left">0.0</Td>
    <Td align="left">\rurl{hf.co/datasets/GEM/wiki_lingua}</Td>
  </tr>
  <tr>
    <Td align="left">bAbI ~\cite{weston2015towards}</Td>
    <Td align="left">test</Td>
    <Td align="left">19000</Td>
    <Td align="left">0.0</Td>
    <Td align="left">\rurl{hf.co/datasets/Muennighoff/babi}</Td>
  </tr>
</Table>
</template>
