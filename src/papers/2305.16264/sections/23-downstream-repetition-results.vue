<!-- Downstream Repetition Results -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Table, Td } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:release" appendix en="Downstream Repetition Results" zh="下游重复训练结果" />

<Para>
  <En>In Tables~\ref{tab:2b8rep}-\ref{tab:8b7oscarrep} we report downstream results of all models trained on C4~\cite{raffel2020exploring} and OSCAR~\cite{ortiz-suarez-etal-2020-monolingual} according to the configurations in \autoref{fig:validation}. All scores are from the final checkpoints at the end of training. OSCAR is a noisier dataset than C4 due to less filtering, thus models trained on C4 generally perform better. Notably, models trained on C4 completely fail on bAbI~\cite{weston2015towards}, while OSCAR models are able to perform better than random. This is likely due to code data being present in OSCAR, which enables state-tracking capabilities like for code augmented models in \autoref{sec:beyond}. For C4 the creators strictly removed all data that resembles code \cite{raffel2020exploring}. There are no significant differences between models trained for a single epoch and models trained for up to 4 epochs. Even models trained for more epochs (and thus on less unique data) have similar performance.</En>
  <Zh>在表~\ref{tab:2b8rep}-\ref{tab:8b7oscarrep} 中，我们报告按照 \autoref{fig:validation} 配置在 C4~\cite{raffel2020exploring} 与 OSCAR~\cite{ortiz-suarez-etal-2020-monolingual} 上训练的全部模型的下游结果。所有分数均来自训练结束时的最终检查点。OSCAR 由于过滤较少而比 C4 更含噪，因此在 C4 上训练的模型通常表现更好。值得注意的是，在 C4 上训练的模型在 bAbI~\cite{weston2015towards} 上完全失败，而 OSCAR 模型的表现优于随机。这可能是因为 OSCAR 中存在代码数据，使其具备与 \autoref{sec:beyond} 中代码增广模型类似的状态跟踪能力。C4 的创建者严格移除了所有类似代码的数据~\cite{raffel2020exploring}。单 epoch 模型与至多 4 epoch 模型之间没有显著差异，即使是训练更多 epoch（因而在更少唯一数据上训练）的模型也有相近的性能。</Zh>
</Para>

<Table label="tab:2b8rep" caption-en="\textbf{Results for 2.8B parameter models trained on repeated data on C4 for 55B total tokens.} Scores are normalized averages of 0-5 few-shots and reported as percentages. We report mean/std. err. across five different models, each trained with a different random seed." caption-zh="\textbf{在C4上以重复数据训练 55B 总词元的 2.8B 参数模型的结果。}分数为 0-5 few-shot 的归一化平均值，以百分比报告。我们报告五个不同随机种子训练模型之间的均值/标准误。">
  <tr>
    <Td align="left">Data Budget</Td>
    <Td align="left">55B</Td>
    <Td align="left">28B</Td>
    <Td align="left">18B</Td>
    <Td align="left">14B</Td>
    <Td align="left">11B</Td>
    <Td align="left">9B</Td>
    <Td align="left">4B</Td>
    <Td align="left">1.25B</Td>
  </tr>
  <tr>
    <Td align="left">Epochs</Td>
    <Td align="left">1</Td>
    <Td align="left">2</Td>
    <Td align="left">3</Td>
    <Td align="left">4</Td>
    <Td align="left">5</Td>
    <Td align="left">7</Td>
    <Td align="left">14</Td>
    <Td align="left">44</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">0.4 ± 1.6</Td>
    <Td align="left">0.7 ± 0.8</Td>
    <Td align="left">0.3 ± 0.5</Td>
    <Td align="left">-0.3 ± 1.8</Td>
    <Td align="left">0.4 ± 1.8</Td>
    <Td align="left">0.4 ± 0.7</Td>
    <Td align="left">0.0 ± 0.9</Td>
    <Td align="left">-0.6 ± 0.6</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">0.9 ± 0.4</Td>
    <Td align="left">1.4 ± 0.8</Td>
    <Td align="left">0.8 ± 0.8</Td>
    <Td align="left">1.1 ± 0.7</Td>
    <Td align="left">0.5 ± 0.7</Td>
    <Td align="left">0.6 ± 1.0</Td>
    <Td align="left">1.1 ± 1.1</Td>
    <Td align="left">2.7 ± 1.6</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">1.7 ± 0.5</Td>
    <Td align="left">1.2 ± 0.4</Td>
    <Td align="left">0.4 ± 0.5</Td>
    <Td align="left">1.9 ± 0.7</Td>
    <Td align="left">0.6 ± 1.0</Td>
    <Td align="left">0.8 ± 0.8</Td>
    <Td align="left">1.7 ± 0.7</Td>
    <Td align="left">0.7 ± 1.7</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">1.6 ± 1.0</Td>
    <Td align="left">0.9 ± 0.5</Td>
    <Td align="left">1.2 ± 0.6</Td>
    <Td align="left">1.1 ± 0.6</Td>
    <Td align="left">1.1 ± 1.2</Td>
    <Td align="left">1.3 ± 0.5</Td>
    <Td align="left">0.3 ± 0.6</Td>
    <Td align="left">-2.9 ± 1.0</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">44.5 ± 0.5</Td>
    <Td align="left">44.9 ± 0.4</Td>
    <Td align="left">44.7 ± 0.7</Td>
    <Td align="left">44.3 ± 0.4</Td>
    <Td align="left">44.0 ± 0.5</Td>
    <Td align="left">44.2 ± 0.9</Td>
    <Td align="left">41.4 ± 0.2</Td>
    <Td align="left">28.9 ± 0.7</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">18.8 ± 3.4</Td>
    <Td align="left">16.2 ± 5.2</Td>
    <Td align="left">16.1 ± 2.7</Td>
    <Td align="left">19.7 ± 1.8</Td>
    <Td align="left">15.0 ± 3.8</Td>
    <Td align="left">16.9 ± 3.2</Td>
    <Td align="left">13.1 ± 4.9</Td>
    <Td align="left">-2.1 ± 4.7</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">20.0 ± 4.7</Td>
    <Td align="left">17.4 ± 6.4</Td>
    <Td align="left">14.6 ± 5.1</Td>
    <Td align="left">17.5 ± 4.2</Td>
    <Td align="left">12.3 ± 12.2</Td>
    <Td align="left">14.4 ± 7.5</Td>
    <Td align="left">21.6 ± 8.4</Td>
    <Td align="left">21.3 ± 5.6</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">49.7 ± 3.5</Td>
    <Td align="left">50.3 ± 3.4</Td>
    <Td align="left">49.9 ± 2.3</Td>
    <Td align="left">50.1 ± 2.5</Td>
    <Td align="left">50.9 ± 1.2</Td>
    <Td align="left">48.1 ± 2.4</Td>
    <Td align="left">43.5 ± 3.1</Td>
    <Td align="left">33.3 ± 1.9</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">24.7 ± 0.3</Td>
    <Td align="left">24.6 ± 0.2</Td>
    <Td align="left">24.3 ± 0.1</Td>
    <Td align="left">24.3 ± 0.0</Td>
    <Td align="left">24.3 ± 0.3</Td>
    <Td align="left">24.1 ± 0.1</Td>
    <Td align="left">22.8 ± 0.2</Td>
    <Td align="left">16.7 ± 0.4</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">47.9 ± 0.6</Td>
    <Td align="left">47.6 ± 0.8</Td>
    <Td align="left">47.3 ± 0.3</Td>
    <Td align="left">47.6 ± 0.6</Td>
    <Td align="left">47.6 ± 0.7</Td>
    <Td align="left">47.0 ± 0.2</Td>
    <Td align="left">45.6 ± 0.5</Td>
    <Td align="left">37.0 ± 0.4</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">5.1 ± 4.0</Td>
    <Td align="left">2.5 ± 4.5</Td>
    <Td align="left">8.4 ± 2.6</Td>
    <Td align="left">6.0 ± 2.5</Td>
    <Td align="left">5.1 ± 1.6</Td>
    <Td align="left">2.3 ± 3.9</Td>
    <Td align="left">7.8 ± 2.5</Td>
    <Td align="left">2.6 ± 4.3</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">83.2 ± 0.6</Td>
    <Td align="left">82.5 ± 0.6</Td>
    <Td align="left">82.7 ± 1.1</Td>
    <Td align="left">81.9 ± 0.6</Td>
    <Td align="left">81.9 ± 0.8</Td>
    <Td align="left">81.6 ± 0.9</Td>
    <Td align="left">78.5 ± 1.1</Td>
    <Td align="left">59.3 ± 1.6</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">58.7 ± 0.2</Td>
    <Td align="left">58.7 ± 0.5</Td>
    <Td align="left">58.5 ± 0.3</Td>
    <Td align="left">58.3 ± 0.3</Td>
    <Td align="left">58.5 ± 0.6</Td>
    <Td align="left">58.4 ± 0.3</Td>
    <Td align="left">56.7 ± 0.5</Td>
    <Td align="left">52.0 ± 0.6</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">11.6 ± 0.8</Td>
    <Td align="left">10.8 ± 1.1</Td>
    <Td align="left">10.9 ± 1.3</Td>
    <Td align="left">10.6 ± 0.5</Td>
    <Td align="left">11.1 ± 0.9</Td>
    <Td align="left">10.6 ± 0.9</Td>
    <Td align="left">6.4 ± 1.3</Td>
    <Td align="left">2.9 ± 1.3</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">17.0 ± 1.4</Td>
    <Td align="left">17.7 ± 0.5</Td>
    <Td align="left">17.0 ± 1.2</Td>
    <Td align="left">16.9 ± 1.1</Td>
    <Td align="left">15.1 ± 2.3</Td>
    <Td align="left">13.3 ± 2.2</Td>
    <Td align="left">14.9 ± 0.9</Td>
    <Td align="left">9.8 ± 0.9</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">2.4 ± 0.1</Td>
    <Td align="left">2.4 ± 0.1</Td>
    <Td align="left">2.5 ± 0.1</Td>
    <Td align="left">2.3 ± 0.2</Td>
    <Td align="left">2.4 ± 0.1</Td>
    <Td align="left">2.4 ± 0.1</Td>
    <Td align="left">2.1 ± 0.1</Td>
    <Td align="left">1.6 ± 0.1</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">5.3 ± 0.1</Td>
    <Td align="left">5.5 ± 0.2</Td>
    <Td align="left">5.4 ± 0.1</Td>
    <Td align="left">5.4 ± 0.1</Td>
    <Td align="left">5.1 ± 0.1</Td>
    <Td align="left">5.4 ± 0.2</Td>
    <Td align="left">5.1 ± 0.3</Td>
    <Td align="left">2.9 ± 0.2</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">3.1 ± 0.1</Td>
    <Td align="left">2.9 ± 0.1</Td>
    <Td align="left">2.9 ± 0.3</Td>
    <Td align="left">2.9 ± 0.2</Td>
    <Td align="left">2.9 ± 0.1</Td>
    <Td align="left">2.6 ± 0.1</Td>
    <Td align="left">2.0 ± 0.2</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">20.9 ± 0.4</Td>
    <Td align="left">20.4 ± 0.3</Td>
    <Td align="left">20.4 ± 0.2</Td>
    <Td align="left">20.6 ± 0.2</Td>
    <Td align="left">19.9 ± 0.9</Td>
    <Td align="left">19.7 ± 0.2</Td>
    <Td align="left">19.2 ± 0.5</Td>
    <Td align="left">14.1 ± 0.4</Td>
  </tr>
</Table>

<Table label="tab:2b8oscarrep" caption-en="\textbf{Results for 2.8B parameter models trained on repeated data on OSCAR for 55B total tokens.} Scores are normalized averages of 0-5 few-shots and reported as percentages. We report mean/std. err. across five different models, each trained with a different random seed." caption-zh="\textbf{在OSCAR上以重复数据训练 55B 总词元的 2.8B 参数模型的结果。}分数为 0-5 few-shot 的归一化平均值，以百分比报告。我们报告五个不同随机种子训练模型之间的均值/标准误。">
  <tr>
    <Td align="left">Data Budget</Td>
    <Td align="left">55B</Td>
    <Td align="left">28B</Td>
    <Td align="left">18B</Td>
    <Td align="left">14B</Td>
    <Td align="left">11B</Td>
    <Td align="left">9B</Td>
    <Td align="left">4B</Td>
    <Td align="left">1.25B</Td>
  </tr>
  <tr>
    <Td align="left">Epochs</Td>
    <Td align="left">1</Td>
    <Td align="left">2</Td>
    <Td align="left">3</Td>
    <Td align="left">4</Td>
    <Td align="left">5</Td>
    <Td align="left">7</Td>
    <Td align="left">14</Td>
    <Td align="left">44</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">-0.3 ± 0.5</Td>
    <Td align="left">-0.6 ± 1.3</Td>
    <Td align="left">0.2 ± 0.6</Td>
    <Td align="left">0.3 ± 1.1</Td>
    <Td align="left">0.2 ± 1.2</Td>
    <Td align="left">-0.1 ± 1.1</Td>
    <Td align="left">-0.1 ± 0.5</Td>
    <Td align="left">-0.7 ± 1.3</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">1.0 ± 1.0</Td>
    <Td align="left">1.1 ± 0.3</Td>
    <Td align="left">1.7 ± 0.8</Td>
    <Td align="left">2.3 ± 0.8</Td>
    <Td align="left">1.4 ± 1.0</Td>
    <Td align="left">0.8 ± 0.7</Td>
    <Td align="left">1.0 ± 0.7</Td>
    <Td align="left">2.3 ± 0.7</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">0.4 ± 0.8</Td>
    <Td align="left">0.5 ± 0.5</Td>
    <Td align="left">-0.2 ± 0.8</Td>
    <Td align="left">-0.1 ± 1.0</Td>
    <Td align="left">1.1 ± 0.6</Td>
    <Td align="left">0.7 ± 0.4</Td>
    <Td align="left">-0.2 ± 0.9</Td>
    <Td align="left">0.5 ± 1.2</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">-1.4 ± 0.8</Td>
    <Td align="left">-0.6 ± 0.8</Td>
    <Td align="left">-1.7 ± 0.1</Td>
    <Td align="left">-1.6 ± 0.7</Td>
    <Td align="left">-1.6 ± 0.6</Td>
    <Td align="left">-1.4 ± 0.5</Td>
    <Td align="left">-1.9 ± 0.8</Td>
    <Td align="left">-5.0 ± 1.1</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">39.7 ± 0.3</Td>
    <Td align="left">39.6 ± 0.8</Td>
    <Td align="left">39.5 ± 0.6</Td>
    <Td align="left">39.3 ± 0.5</Td>
    <Td align="left">38.7 ± 0.6</Td>
    <Td align="left">38.7 ± 0.4</Td>
    <Td align="left">36.9 ± 0.4</Td>
    <Td align="left">25.4 ± 0.7</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">12.8 ± 4.4</Td>
    <Td align="left">7.8 ± 3.8</Td>
    <Td align="left">7.9 ± 3.8</Td>
    <Td align="left">3.3 ± 5.4</Td>
    <Td align="left">0.2 ± 3.0</Td>
    <Td align="left">2.3 ± 6.1</Td>
    <Td align="left">-2.1 ± 2.4</Td>
    <Td align="left">7.4 ± 6.1</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">19.7 ± 5.1</Td>
    <Td align="left">15.4 ± 7.3</Td>
    <Td align="left">13.2 ± 5.1</Td>
    <Td align="left">12.6 ± 2.6</Td>
    <Td align="left">21.7 ± 3.6</Td>
    <Td align="left">15.4 ± 3.7</Td>
    <Td align="left">16.2 ± 5.2</Td>
    <Td align="left">9.7 ± 5.7</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">42.7 ± 2.2</Td>
    <Td align="left">39.5 ± 2.2</Td>
    <Td align="left">40.9 ± 2.0</Td>
    <Td align="left">41.5 ± 2.1</Td>
    <Td align="left">38.5 ± 2.4</Td>
    <Td align="left">40.4 ± 2.4</Td>
    <Td align="left">38.6 ± 2.6</Td>
    <Td align="left">28.5 ± 3.1</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">16.3 ± 0.1</Td>
    <Td align="left">16.3 ± 0.2</Td>
    <Td align="left">16.3 ± 0.2</Td>
    <Td align="left">16.1 ± 0.2</Td>
    <Td align="left">16.0 ± 0.1</Td>
    <Td align="left">15.9 ± 0.2</Td>
    <Td align="left">15.0 ± 0.2</Td>
    <Td align="left">11.7 ± 0.1</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">41.2 ± 0.7</Td>
    <Td align="left">41.4 ± 0.5</Td>
    <Td align="left">40.3 ± 0.4</Td>
    <Td align="left">40.6 ± 0.5</Td>
    <Td align="left">40.3 ± 0.9</Td>
    <Td align="left">39.8 ± 0.6</Td>
    <Td align="left">38.8 ± 1.1</Td>
    <Td align="left">31.0 ± 0.4</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">3.9 ± 1.1</Td>
    <Td align="left">2.1 ± 1.6</Td>
    <Td align="left">2.3 ± 3.3</Td>
    <Td align="left">1.6 ± 3.0</Td>
    <Td align="left">0.5 ± 2.1</Td>
    <Td align="left">2.9 ± 2.5</Td>
    <Td align="left">0.9 ± 3.4</Td>
    <Td align="left">-3.2 ± 2.7</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">83.2 ± 0.6</Td>
    <Td align="left">82.4 ± 0.6</Td>
    <Td align="left">82.1 ± 0.9</Td>
    <Td align="left">82.6 ± 0.7</Td>
    <Td align="left">81.5 ± 0.9</Td>
    <Td align="left">80.5 ± 0.6</Td>
    <Td align="left">76.5 ± 1.3</Td>
    <Td align="left">57.7 ± 1.8</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">52.8 ± 0.3</Td>
    <Td align="left">52.9 ± 0.4</Td>
    <Td align="left">52.6 ± 0.3</Td>
    <Td align="left">53.0 ± 0.4</Td>
    <Td align="left">52.3 ± 0.4</Td>
    <Td align="left">52.4 ± 0.4</Td>
    <Td align="left">51.8 ± 0.7</Td>
    <Td align="left">47.9 ± 0.5</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">5.8 ± 0.9</Td>
    <Td align="left">4.4 ± 1.4</Td>
    <Td align="left">4.5 ± 0.3</Td>
    <Td align="left">4.2 ± 1.3</Td>
    <Td align="left">4.5 ± 0.6</Td>
    <Td align="left">4.1 ± 0.7</Td>
    <Td align="left">1.7 ± 1.2</Td>
    <Td align="left">0.8 ± 1.3</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">20.3 ± 0.3</Td>
    <Td align="left">19.9 ± 0.5</Td>
    <Td align="left">19.9 ± 0.7</Td>
    <Td align="left">20.9 ± 0.9</Td>
    <Td align="left">19.7 ± 0.7</Td>
    <Td align="left">20.4 ± 0.6</Td>
    <Td align="left">19.1 ± 0.8</Td>
    <Td align="left">14.2 ± 0.7</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">2.9 ± 0.0</Td>
    <Td align="left">2.9 ± 0.3</Td>
    <Td align="left">2.9 ± 0.2</Td>
    <Td align="left">2.9 ± 0.1</Td>
    <Td align="left">2.8 ± 0.3</Td>
    <Td align="left">2.6 ± 0.2</Td>
    <Td align="left">1.8 ± 0.1</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">8.8 ± 0.4</Td>
    <Td align="left">8.3 ± 0.6</Td>
    <Td align="left">8.5 ± 0.3</Td>
    <Td align="left">8.4 ± 0.6</Td>
    <Td align="left">8.1 ± 0.2</Td>
    <Td align="left">8.2 ± 0.2</Td>
    <Td align="left">7.2 ± 0.3</Td>
    <Td align="left">3.3 ± 0.3</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">2.9 ± 0.1</Td>
    <Td align="left">3.1 ± 0.2</Td>
    <Td align="left">3.1 ± 0.1</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">3.1 ± 0.1</Td>
    <Td align="left">3.2 ± 0.3</Td>
    <Td align="left">2.7 ± 0.2</Td>
    <Td align="left">1.7 ± 0.2</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">15.5 ± 1.0</Td>
    <Td align="left">15.7 ± 1.1</Td>
    <Td align="left">15.3 ± 0.8</Td>
    <Td align="left">15.1 ± 1.5</Td>
    <Td align="left">15.9 ± 1.1</Td>
    <Td align="left">16.2 ± 0.9</Td>
    <Td align="left">14.3 ± 0.6</Td>
    <Td align="left">6.6 ± 0.6</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">19.4 ± 0.5</Td>
    <Td align="left">18.5 ± 0.2</Td>
    <Td align="left">18.4 ± 0.4</Td>
    <Td align="left">18.2 ± 0.4</Td>
    <Td align="left">18.2 ± 0.4</Td>
    <Td align="left">18.1 ± 0.4</Td>
    <Td align="left">16.8 ± 0.5</Td>
    <Td align="left">12.7 ± 0.7</Td>
  </tr>
</Table>

<Table label="tab:4b2rep" caption-en="\textbf{Results for 4.2B parameter models trained on repeated data on C4 for 84B total tokens.} Scores are normalized averages of 0-5 few-shots and reported as percentages. We report mean/std. err. across five different models, each trained with a different random seed." caption-zh="\textbf{在C4上以重复数据训练 84B 总词元的 4.2B 参数模型的结果。}分数为 0-5 few-shot 的归一化平均值，以百分比报告。我们报告五个不同随机种子训练模型之间的均值/标准误。">
  <tr>
    <Td align="left">Unique Tokens</Td>
    <Td align="left">84B</Td>
    <Td align="left">42B</Td>
    <Td align="left">28B</Td>
    <Td align="left">21B</Td>
    <Td align="left">17B</Td>
    <Td align="left">12B</Td>
    <Td align="left">6B</Td>
    <Td align="left">1.9B</Td>
  </tr>
  <tr>
    <Td align="left">Epochs</Td>
    <Td align="left">1</Td>
    <Td align="left">2</Td>
    <Td align="left">3</Td>
    <Td align="left">4</Td>
    <Td align="left">5</Td>
    <Td align="left">7</Td>
    <Td align="left">14</Td>
    <Td align="left">44</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">-1.0 ± 0.3</Td>
    <Td align="left">-0.7 ± 1.1</Td>
    <Td align="left">-0.7 ± 1.0</Td>
    <Td align="left">-0.4 ± 1.1</Td>
    <Td align="left">0.4 ± 0.8</Td>
    <Td align="left">0.5 ± 1.1</Td>
    <Td align="left">0.1 ± 0.9</Td>
    <Td align="left">0.2 ± 0.9</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">0.8 ± 0.5</Td>
    <Td align="left">0.8 ± 0.8</Td>
    <Td align="left">0.0 ± 1.4</Td>
    <Td align="left">0.5 ± 0.7</Td>
    <Td align="left">0.5 ± 0.9</Td>
    <Td align="left">0.3 ± 1.0</Td>
    <Td align="left">0.7 ± 0.7</Td>
    <Td align="left">2.5 ± 1.0</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">1.1 ± 0.7</Td>
    <Td align="left">0.8 ± 0.9</Td>
    <Td align="left">0.3 ± 0.8</Td>
    <Td align="left">1.4 ± 1.1</Td>
    <Td align="left">1.3 ± 0.9</Td>
    <Td align="left">2.3 ± 0.2</Td>
    <Td align="left">1.3 ± 0.2</Td>
    <Td align="left">1.6 ± 1.2</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">5.3 ± 0.6</Td>
    <Td align="left">5.1 ± 0.9</Td>
    <Td align="left">5.2 ± 2.0</Td>
    <Td align="left">6.0 ± 0.8</Td>
    <Td align="left">4.7 ± 0.8</Td>
    <Td align="left">3.1 ± 0.4</Td>
    <Td align="left">2.9 ± 1.0</Td>
    <Td align="left">-1.3 ± 1.0</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">49.2 ± 0.9</Td>
    <Td align="left">50.4 ± 1.2</Td>
    <Td align="left">47.4 ± 4.5</Td>
    <Td align="left">49.4 ± 0.7</Td>
    <Td align="left">48.7 ± 1.5</Td>
    <Td align="left">44.9 ± 0.7</Td>
    <Td align="left">45.0 ± 1.2</Td>
    <Td align="left">31.9 ± 0.9</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">18.2 ± 4.0</Td>
    <Td align="left">19.6 ± 5.1</Td>
    <Td align="left">22.1 ± 1.0</Td>
    <Td align="left">20.4 ± 3.6</Td>
    <Td align="left">18.4 ± 6.0</Td>
    <Td align="left">18.4 ± 3.9</Td>
    <Td align="left">18.9 ± 2.6</Td>
    <Td align="left">-3.3 ± 7.1</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">12.0 ± 7.2</Td>
    <Td align="left">8.5 ± 9.2</Td>
    <Td align="left">7.9 ± 10.4</Td>
    <Td align="left">19.6 ± 7.3</Td>
    <Td align="left">17.8 ± 7.3</Td>
    <Td align="left">15.1 ± 5.8</Td>
    <Td align="left">17.5 ± 3.5</Td>
    <Td align="left">19.5 ± 6.6</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">59.1 ± 5.4</Td>
    <Td align="left">57.7 ± 3.5</Td>
    <Td align="left">56.7 ± 2.0</Td>
    <Td align="left">55.5 ± 2.4</Td>
    <Td align="left">56.8 ± 1.8</Td>
    <Td align="left">58.9 ± 1.7</Td>
    <Td align="left">48.7 ± 3.3</Td>
    <Td align="left">34.9 ± 3.4</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">27.8 ± 4.8</Td>
    <Td align="left">30.2 ± 0.5</Td>
    <Td align="left">29.8 ± 0.9</Td>
    <Td align="left">29.9 ± 0.7</Td>
    <Td align="left">28.5 ± 1.1</Td>
    <Td align="left">29.0 ± 0.5</Td>
    <Td align="left">27.0 ± 1.2</Td>
    <Td align="left">19.7 ± 0.5</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">50.6 ± 0.5</Td>
    <Td align="left">50.8 ± 0.5</Td>
    <Td align="left">48.6 ± 3.4</Td>
    <Td align="left">50.9 ± 0.7</Td>
    <Td align="left">50.3 ± 1.3</Td>
    <Td align="left">49.5 ± 0.4</Td>
    <Td align="left">47.6 ± 1.2</Td>
    <Td align="left">39.5 ± 1.3</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">5.6 ± 3.1</Td>
    <Td align="left">2.6 ± 3.9</Td>
    <Td align="left">7.2 ± 2.7</Td>
    <Td align="left">7.0 ± 3.2</Td>
    <Td align="left">8.8 ± 5.3</Td>
    <Td align="left">9.3 ± 3.6</Td>
    <Td align="left">3.0 ± 4.3</Td>
    <Td align="left">2.6 ± 4.2</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">84.6 ± 3.9</Td>
    <Td align="left">86.1 ± 1.3</Td>
    <Td align="left">84.4 ± 3.7</Td>
    <Td align="left">85.9 ± 0.7</Td>
    <Td align="left">86.2 ± 0.8</Td>
    <Td align="left">79.0 ± 0.7</Td>
    <Td align="left">81.1 ± 1.4</Td>
    <Td align="left">65.3 ± 1.1</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">61.1 ± 3.7</Td>
    <Td align="left">62.6 ± 0.2</Td>
    <Td align="left">61.9 ± 2.2</Td>
    <Td align="left">62.6 ± 0.4</Td>
    <Td align="left">61.8 ± 0.8</Td>
    <Td align="left">61.5 ± 0.8</Td>
    <Td align="left">60.1 ± 0.7</Td>
    <Td align="left">53.9 ± 0.5</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">17.0 ± 2.6</Td>
    <Td align="left">17.8 ± 1.4</Td>
    <Td align="left">16.5 ± 1.8</Td>
    <Td align="left">17.1 ± 1.8</Td>
    <Td align="left">14.9 ± 1.5</Td>
    <Td align="left">15.9 ± 1.2</Td>
    <Td align="left">11.8 ± 1.5</Td>
    <Td align="left">3.9 ± 0.8</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">18.2 ± 1.2</Td>
    <Td align="left">18.8 ± 0.8</Td>
    <Td align="left">17.8 ± 1.5</Td>
    <Td align="left">16.0 ± 2.2</Td>
    <Td align="left">15.9 ± 2.5</Td>
    <Td align="left">13.8 ± 1.3</Td>
    <Td align="left">15.7 ± 0.9</Td>
    <Td align="left">11.2 ± 1.4</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">2.9 ± 0.2</Td>
    <Td align="left">3.0 ± 0.2</Td>
    <Td align="left">2.8 ± 0.3</Td>
    <Td align="left">2.9 ± 0.2</Td>
    <Td align="left">2.9 ± 0.2</Td>
    <Td align="left">1.0 ± 0.4</Td>
    <Td align="left">2.4 ± 0.1</Td>
    <Td align="left">1.8 ± 0.1</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">4.8 ± 2.0</Td>
    <Td align="left">5.7 ± 0.2</Td>
    <Td align="left">5.4 ± 0.3</Td>
    <Td align="left">5.6 ± 0.2</Td>
    <Td align="left">5.4 ± 0.5</Td>
    <Td align="left">5.5 ± 0.1</Td>
    <Td align="left">5.4 ± 0.2</Td>
    <Td align="left">3.4 ± 0.3</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">3.3 ± 0.5</Td>
    <Td align="left">3.6 ± 0.1</Td>
    <Td align="left">3.4 ± 0.1</Td>
    <Td align="left">3.4 ± 0.1</Td>
    <Td align="left">3.3 ± 0.1</Td>
    <Td align="left">1.4 ± 0.6</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">2.2 ± 0.1</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">0.0 ± 0.0</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">22.1 ± 1.7</Td>
    <Td align="left">22.3 ± 0.9</Td>
    <Td align="left">21.9 ± 1.2</Td>
    <Td align="left">22.8 ± 0.5</Td>
    <Td align="left">22.5 ± 0.6</Td>
    <Td align="left">21.6 ± 0.5</Td>
    <Td align="left">20.6 ± 0.6</Td>
    <Td align="left">15.2 ± 1.0</Td>
  </tr>
</Table>

<Table label="tab:4b2oscarrep" caption-en="\textbf{Results for 4.2B parameter models trained on repeated data on OSCAR for 84B total tokens.} Scores are normalized averages of 0-5 few-shots and reported as percentages. We report mean/std. err. across five different models, each trained with a different random seed." caption-zh="\textbf{在OSCAR上以重复数据训练 84B 总词元的 4.2B 参数模型的结果。}分数为 0-5 few-shot 的归一化平均值，以百分比报告。我们报告五个不同随机种子训练模型之间的均值/标准误。">
  <tr>
    <Td align="left">Unique Tokens</Td>
    <Td align="left">84B</Td>
    <Td align="left">42B</Td>
    <Td align="left">28B</Td>
    <Td align="left">21B</Td>
    <Td align="left">17B</Td>
    <Td align="left">12B</Td>
    <Td align="left">6B</Td>
    <Td align="left">1.9B</Td>
  </tr>
  <tr>
    <Td align="left">Epochs</Td>
    <Td align="left">1</Td>
    <Td align="left">2</Td>
    <Td align="left">3</Td>
    <Td align="left">4</Td>
    <Td align="left">5</Td>
    <Td align="left">7</Td>
    <Td align="left">14</Td>
    <Td align="left">44</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">-0.9 ± 0.5</Td>
    <Td align="left">-0.8 ± 1.1</Td>
    <Td align="left">-0.9 ± 1.4</Td>
    <Td align="left">-0.4 ± 0.4</Td>
    <Td align="left">-0.1 ± 1.2</Td>
    <Td align="left">0.3 ± 1.1</Td>
    <Td align="left">-0.5 ± 0.8</Td>
    <Td align="left">1.1 ± 1.3</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">0.7 ± 0.9</Td>
    <Td align="left">0.7 ± 1.1</Td>
    <Td align="left">1.3 ± 1.0</Td>
    <Td align="left">1.5 ± 1.1</Td>
    <Td align="left">1.7 ± 1.3</Td>
    <Td align="left">0.9 ± 0.8</Td>
    <Td align="left">0.9 ± 1.0</Td>
    <Td align="left">1.7 ± 1.3</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">0.4 ± 0.6</Td>
    <Td align="left">0.6 ± 0.4</Td>
    <Td align="left">0.7 ± 0.3</Td>
    <Td align="left">0.4 ± 0.8</Td>
    <Td align="left">0.7 ± 1.2</Td>
    <Td align="left">0.6 ± 1.2</Td>
    <Td align="left">0.7 ± 0.5</Td>
    <Td align="left">0.8 ± 1.2</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">1.3 ± 0.5</Td>
    <Td align="left">1.8 ± 0.5</Td>
    <Td align="left">1.6 ± 0.7</Td>
    <Td align="left">2.4 ± 1.1</Td>
    <Td align="left">1.6 ± 0.7</Td>
    <Td align="left">2.0 ± 0.7</Td>
    <Td align="left">1.6 ± 0.5</Td>
    <Td align="left">-2.1 ± 0.5</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">45.5 ± 0.8</Td>
    <Td align="left">45.1 ± 1.2</Td>
    <Td align="left">44.8 ± 0.9</Td>
    <Td align="left">44.8 ± 0.6</Td>
    <Td align="left">45.0 ± 1.0</Td>
    <Td align="left">43.9 ± 0.7</Td>
    <Td align="left">40.7 ± 0.7</Td>
    <Td align="left">28.0 ± 0.9</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">14.5 ± 1.9</Td>
    <Td align="left">15.1 ± 4.6</Td>
    <Td align="left">10.8 ± 5.1</Td>
    <Td align="left">12.5 ± 1.9</Td>
    <Td align="left">6.7 ± 4.0</Td>
    <Td align="left">10.1 ± 4.2</Td>
    <Td align="left">-0.0 ± 6.9</Td>
    <Td align="left">-4.3 ± 7.2</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">21.3 ± 2.3</Td>
    <Td align="left">19.2 ± 3.8</Td>
    <Td align="left">12.9 ± 6.4</Td>
    <Td align="left">16.9 ± 3.4</Td>
    <Td align="left">15.1 ± 9.4</Td>
    <Td align="left">17.8 ± 3.6</Td>
    <Td align="left">15.0 ± 8.1</Td>
    <Td align="left">11.2 ± 4.1</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">43.1 ± 3.0</Td>
    <Td align="left">42.5 ± 3.7</Td>
    <Td align="left">44.4 ± 1.1</Td>
    <Td align="left">43.0 ± 3.4</Td>
    <Td align="left">41.8 ± 2.3</Td>
    <Td align="left">44.6 ± 2.7</Td>
    <Td align="left">40.3 ± 3.0</Td>
    <Td align="left">34.9 ± 4.9</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">21.1 ± 0.2</Td>
    <Td align="left">21.0 ± 0.2</Td>
    <Td align="left">20.9 ± 0.1</Td>
    <Td align="left">20.7 ± 0.2</Td>
    <Td align="left">20.5 ± 0.3</Td>
    <Td align="left">20.3 ± 0.1</Td>
    <Td align="left">19.3 ± 0.1</Td>
    <Td align="left">14.5 ± 0.2</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">45.3 ± 0.9</Td>
    <Td align="left">44.8 ± 0.7</Td>
    <Td align="left">44.8 ± 0.9</Td>
    <Td align="left">44.4 ± 0.6</Td>
    <Td align="left">44.3 ± 0.6</Td>
    <Td align="left">43.9 ± 0.5</Td>
    <Td align="left">42.2 ± 0.9</Td>
    <Td align="left">34.0 ± 0.8</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">4.2 ± 2.8</Td>
    <Td align="left">1.5 ± 2.4</Td>
    <Td align="left">-1.1 ± 3.9</Td>
    <Td align="left">-2.5 ± 3.9</Td>
    <Td align="left">5.3 ± 1.8</Td>
    <Td align="left">4.4 ± 1.9</Td>
    <Td align="left">1.6 ± 2.2</Td>
    <Td align="left">-1.0 ± 2.4</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">86.6 ± 0.7</Td>
    <Td align="left">86.5 ± 0.5</Td>
    <Td align="left">86.0 ± 0.2</Td>
    <Td align="left">86.3 ± 1.0</Td>
    <Td align="left">85.4 ± 0.8</Td>
    <Td align="left">84.7 ± 0.4</Td>
    <Td align="left">82.0 ± 1.4</Td>
    <Td align="left">62.9 ± 2.5</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">56.5 ± 0.6</Td>
    <Td align="left">56.8 ± 0.6</Td>
    <Td align="left">56.5 ± 0.7</Td>
    <Td align="left">55.8 ± 0.3</Td>
    <Td align="left">55.9 ± 0.2</Td>
    <Td align="left">56.0 ± 0.3</Td>
    <Td align="left">54.5 ± 0.7</Td>
    <Td align="left">49.3 ± 0.2</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">9.7 ± 1.4</Td>
    <Td align="left">9.0 ± 1.8</Td>
    <Td align="left">9.5 ± 0.7</Td>
    <Td align="left">8.9 ± 1.0</Td>
    <Td align="left">7.8 ± 1.2</Td>
    <Td align="left">7.4 ± 1.4</Td>
    <Td align="left">6.8 ± 1.4</Td>
    <Td align="left">2.1 ± 1.0</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">21.4 ± 1.3</Td>
    <Td align="left">21.9 ± 0.4</Td>
    <Td align="left">21.2 ± 1.0</Td>
    <Td align="left">21.8 ± 0.6</Td>
    <Td align="left">21.0 ± 0.9</Td>
    <Td align="left">20.5 ± 0.7</Td>
    <Td align="left">20.9 ± 1.0</Td>
    <Td align="left">16.0 ± 0.6</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">3.6 ± 0.2</Td>
    <Td align="left">3.5 ± 0.2</Td>
    <Td align="left">3.5 ± 0.2</Td>
    <Td align="left">3.5 ± 0.2</Td>
    <Td align="left">3.5 ± 0.3</Td>
    <Td align="left">3.2 ± 0.5</Td>
    <Td align="left">3.0 ± 0.2</Td>
    <Td align="left">1.9 ± 0.1</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">9.9 ± 0.4</Td>
    <Td align="left">9.7 ± 0.8</Td>
    <Td align="left">9.3 ± 0.6</Td>
    <Td align="left">9.7 ± 0.5</Td>
    <Td align="left">9.3 ± 0.7</Td>
    <Td align="left">9.4 ± 0.3</Td>
    <Td align="left">8.9 ± 0.5</Td>
    <Td align="left">3.8 ± 0.4</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">3.9 ± 0.1</Td>
    <Td align="left">3.8 ± 0.2</Td>
    <Td align="left">3.6 ± 0.3</Td>
    <Td align="left">3.7 ± 0.2</Td>
    <Td align="left">3.6 ± 0.2</Td>
    <Td align="left">3.7 ± 0.1</Td>
    <Td align="left">3.3 ± 0.2</Td>
    <Td align="left">2.1 ± 0.2</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">15.0 ± 7.5</Td>
    <Td align="left">19.0 ± 1.2</Td>
    <Td align="left">18.8 ± 1.4</Td>
    <Td align="left">18.5 ± 1.4</Td>
    <Td align="left">19.2 ± 0.6</Td>
    <Td align="left">18.1 ± 1.4</Td>
    <Td align="left">14.5 ± 1.5</Td>
    <Td align="left">9.6 ± 1.7</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">21.2 ± 0.2</Td>
    <Td align="left">21.1 ± 0.4</Td>
    <Td align="left">20.4 ± 0.3</Td>
    <Td align="left">20.6 ± 0.5</Td>
    <Td align="left">20.4 ± 0.5</Td>
    <Td align="left">20.6 ± 0.2</Td>
    <Td align="left">18.7 ± 0.5</Td>
    <Td align="left">14.0 ± 0.6</Td>
  </tr>
</Table>

<Table label="tab:8b7rep" caption-en="\textbf{Results for 8.7B parameter models trained on repeated data on C4 for 178B total tokens and a data-constrained compute-optimal 6.3B model.} Scores are normalized averages of 0-5 few-shots and reported as percentages. The two models with 25 billion unique tokens are the ones depicted in \autoref{fig:returnalloc} (right). The data-constrained compute-optimal variant (6.3 billion parameters) performs better by using fewer parameters and repeating more data." caption-zh="\textbf{在 C4 上以重复数据训练 178B 总词元的 8.7B 参数模型以及数据受限计算最优的 6.3B 模型的结果。}分数为 0-5 few-shot 的归一化平均值，以百分比报告。拥有 250 亿唯一词元的两个模型即 \autoref{fig:returnalloc}（右）中所示。数据受限计算最优版本（63 亿参数）以更少参数、更多数据重复取得了更好的结果。">
  <tr>
    <Td align="left">Parameters</Td>
    <Td align="left" :colspan="8">{8.7B}</Td>
    <Td align="left">6.3B</Td>
  </tr>
  <tr>
    <Td align="left">Unique Tokens</Td>
    <Td align="left">178B</Td>
    <Td align="left">88B</Td>
    <Td align="left">58B</Td>
    <Td align="left">44B</Td>
    <Td align="left">35B</Td>
    <Td align="left">25B</Td>
    <Td align="left">13B</Td>
    <Td align="left">4B</Td>
    <Td align="left">25B</Td>
  </tr>
  <tr>
    <Td align="left">Epochs</Td>
    <Td align="left">1</Td>
    <Td align="left">2</Td>
    <Td align="left">3</Td>
    <Td align="left">4</Td>
    <Td align="left">5</Td>
    <Td align="left">7</Td>
    <Td align="left">14</Td>
    <Td align="left">44</Td>
    <Td align="left">9.7</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">-0.9</Td>
    <Td align="left">-1.2</Td>
    <Td align="left">-4.2</Td>
    <Td align="left">0.7</Td>
    <Td align="left">-1.3</Td>
    <Td align="left">0.1</Td>
    <Td align="left">1.2</Td>
    <Td align="left">2.1</Td>
    <Td align="left">-0.9</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">-0.4</Td>
    <Td align="left">-1.2</Td>
    <Td align="left">-0.2</Td>
    <Td align="left">0.2</Td>
    <Td align="left">-0.4</Td>
    <Td align="left">-0.1</Td>
    <Td align="left">0.4</Td>
    <Td align="left">2.2</Td>
    <Td align="left">1.0</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">0.7</Td>
    <Td align="left">0.5</Td>
    <Td align="left">0.7</Td>
    <Td align="left">1.8</Td>
    <Td align="left">0.4</Td>
    <Td align="left">1.6</Td>
    <Td align="left">2.0</Td>
    <Td align="left">4.0</Td>
    <Td align="left">2.6</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">12.2</Td>
    <Td align="left">11.9</Td>
    <Td align="left">10.5</Td>
    <Td align="left">12.2</Td>
    <Td align="left">10.6</Td>
    <Td align="left">11.8</Td>
    <Td align="left">8.3</Td>
    <Td align="left">2.2</Td>
    <Td align="left">12.7</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">58.5</Td>
    <Td align="left">58.0</Td>
    <Td align="left">56.9</Td>
    <Td align="left">57.4</Td>
    <Td align="left">56.7</Td>
    <Td align="left">58.5</Td>
    <Td align="left">52.9</Td>
    <Td align="left">37.4</Td>
    <Td align="left">57.2</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">26.1</Td>
    <Td align="left">31.8</Td>
    <Td align="left">31.3</Td>
    <Td align="left">30.3</Td>
    <Td align="left">28.8</Td>
    <Td align="left">28.5</Td>
    <Td align="left">27.9</Td>
    <Td align="left">4.1</Td>
    <Td align="left">30.6</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">7.6</Td>
    <Td align="left">12.9</Td>
    <Td align="left">-15.2</Td>
    <Td align="left">17.9</Td>
    <Td align="left">14.3</Td>
    <Td align="left">-22.8</Td>
    <Td align="left">-12.1</Td>
    <Td align="left">17.4</Td>
    <Td align="left">6.2</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">68.0</Td>
    <Td align="left">64.7</Td>
    <Td align="left">62.3</Td>
    <Td align="left">66.3</Td>
    <Td align="left">63.3</Td>
    <Td align="left">70.0</Td>
    <Td align="left">57.0</Td>
    <Td align="left">45.0</Td>
    <Td align="left">66.0</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">37.8</Td>
    <Td align="left">37.8</Td>
    <Td align="left">37.3</Td>
    <Td align="left">37.4</Td>
    <Td align="left">37.1</Td>
    <Td align="left">37.5</Td>
    <Td align="left">36.1</Td>
    <Td align="left">27.5</Td>
    <Td align="left">38.1</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">55.9</Td>
    <Td align="left">55.6</Td>
    <Td align="left">54.7</Td>
    <Td align="left">56.5</Td>
    <Td align="left">55.8</Td>
    <Td align="left">53.9</Td>
    <Td align="left">52.4</Td>
    <Td align="left">45.7</Td>
    <Td align="left">54.3</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">14.1</Td>
    <Td align="left">11.4</Td>
    <Td align="left">11.0</Td>
    <Td align="left">8.7</Td>
    <Td align="left">15.9</Td>
    <Td align="left">-2.6</Td>
    <Td align="left">-1.8</Td>
    <Td align="left">-3.2</Td>
    <Td align="left">7.7</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">90.4</Td>
    <Td align="left">91.1</Td>
    <Td align="left">90.7</Td>
    <Td align="left">90.0</Td>
    <Td align="left">89.8</Td>
    <Td align="left">89.8</Td>
    <Td align="left">87.9</Td>
    <Td align="left">72.9</Td>
    <Td align="left">90.3</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">68.3</Td>
    <Td align="left">67.3</Td>
    <Td align="left">67.2</Td>
    <Td align="left">67.6</Td>
    <Td align="left">67.8</Td>
    <Td align="left">66.8</Td>
    <Td align="left">66.2</Td>
    <Td align="left">58.9</Td>
    <Td align="left">68.4</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">26.3</Td>
    <Td align="left">27.7</Td>
    <Td align="left">26.5</Td>
    <Td align="left">29.0</Td>
    <Td align="left">26.1</Td>
    <Td align="left">23.5</Td>
    <Td align="left">18.1</Td>
    <Td align="left">10.0</Td>
    <Td align="left">27.0</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">20.5</Td>
    <Td align="left">17.9</Td>
    <Td align="left">18.7</Td>
    <Td align="left">20.0</Td>
    <Td align="left">17.2</Td>
    <Td align="left">17.7</Td>
    <Td align="left">17.4</Td>
    <Td align="left">11.2</Td>
    <Td align="left">16.9</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">3.6</Td>
    <Td align="left">3.3</Td>
    <Td align="left">3.8</Td>
    <Td align="left">3.8</Td>
    <Td align="left">3.5</Td>
    <Td align="left">3.0</Td>
    <Td align="left">3.3</Td>
    <Td align="left">2.0</Td>
    <Td align="left">3.8</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">5.3</Td>
    <Td align="left">5.8</Td>
    <Td align="left">5.9</Td>
    <Td align="left">5.6</Td>
    <Td align="left">5.8</Td>
    <Td align="left">5.2</Td>
    <Td align="left">5.7</Td>
    <Td align="left">4.9</Td>
    <Td align="left">5.3</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">4.1</Td>
    <Td align="left">4.2</Td>
    <Td align="left">4.2</Td>
    <Td align="left">4.1</Td>
    <Td align="left">4.2</Td>
    <Td align="left">4.0</Td>
    <Td align="left">3.5</Td>
    <Td align="left">2.7</Td>
    <Td align="left">4.0</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.0</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">26.2</Td>
    <Td align="left">26.3</Td>
    <Td align="left">24.3</Td>
    <Td align="left">26.8</Td>
    <Td align="left">26.1</Td>
    <Td align="left">23.5</Td>
    <Td align="left">22.4</Td>
    <Td align="left">18.3</Td>
    <Td align="left">25.9</Td>
  </tr>
</Table>

<Table label="tab:8b7oscarrep" caption-en="\textbf{Results for 8.7B parameter models trained on repeated data on OSCAR for 178B total tokens.} Scores are normalized averages of 0-5 few-shots and reported as percentages.">
  <tr>
    <Td align="left">Unique Tokens</Td>
    <Td align="left">178B</Td>
    <Td align="left">88B</Td>
    <Td align="left">58B</Td>
    <Td align="left">44B</Td>
    <Td align="left">35B</Td>
    <Td align="left">25B</Td>
    <Td align="left">13B</Td>
    <Td align="left">4B</Td>
  </tr>
  <tr>
    <Td align="left">Epochs</Td>
    <Td align="left">1</Td>
    <Td align="left">2</Td>
    <Td align="left">3</Td>
    <Td align="left">4</Td>
    <Td align="left">5</Td>
    <Td align="left">7</Td>
    <Td align="left">14</Td>
    <Td align="left">44</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">-1.3</Td>
    <Td align="left">-2.3</Td>
    <Td align="left">-0.5</Td>
    <Td align="left">-1.8</Td>
    <Td align="left">0.1</Td>
    <Td align="left">-0.3</Td>
    <Td align="left">2.6</Td>
    <Td align="left">-0.4</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">0.8</Td>
    <Td align="left">3.2</Td>
    <Td align="left">-0.2</Td>
    <Td align="left">-1.3</Td>
    <Td align="left">1.0</Td>
    <Td align="left">0.2</Td>
    <Td align="left">1.5</Td>
    <Td align="left">0.5</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">1.1</Td>
    <Td align="left">1.2</Td>
    <Td align="left">1.3</Td>
    <Td align="left">0.9</Td>
    <Td align="left">2.8</Td>
    <Td align="left">-0.4</Td>
    <Td align="left">1.1</Td>
    <Td align="left">-0.1</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">6.9</Td>
    <Td align="left">6.7</Td>
    <Td align="left">6.9</Td>
    <Td align="left">3.8</Td>
    <Td align="left">6.6</Td>
    <Td align="left">4.8</Td>
    <Td align="left">4.0</Td>
    <Td align="left">-0.9</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">50.2</Td>
    <Td align="left">51.6</Td>
    <Td align="left">51.2</Td>
    <Td align="left">51.0</Td>
    <Td align="left">51.9</Td>
    <Td align="left">50.8</Td>
    <Td align="left">47.0</Td>
    <Td align="left">33.0</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">18.4</Td>
    <Td align="left">11.7</Td>
    <Td align="left">19.4</Td>
    <Td align="left">22.4</Td>
    <Td align="left">17.5</Td>
    <Td align="left">20.8</Td>
    <Td align="left">7.6</Td>
    <Td align="left">4.1</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">11.2</Td>
    <Td align="left">13.4</Td>
    <Td align="left">16.1</Td>
    <Td align="left">19.6</Td>
    <Td align="left">21.4</Td>
    <Td align="left">25.0</Td>
    <Td align="left">9.8</Td>
    <Td align="left">20.1</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">46.7</Td>
    <Td align="left">53.0</Td>
    <Td align="left">52.0</Td>
    <Td align="left">53.7</Td>
    <Td align="left">51.0</Td>
    <Td align="left">53.3</Td>
    <Td align="left">48.7</Td>
    <Td align="left">41.7</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">27.4</Td>
    <Td align="left">27.2</Td>
    <Td align="left">26.8</Td>
    <Td align="left">26.8</Td>
    <Td align="left">27.3</Td>
    <Td align="left">26.7</Td>
    <Td align="left">25.5</Td>
    <Td align="left">19.6</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">49.2</Td>
    <Td align="left">49.3</Td>
    <Td align="left">50.1</Td>
    <Td align="left">48.7</Td>
    <Td align="left">48.1</Td>
    <Td align="left">47.2</Td>
    <Td align="left">45.6</Td>
    <Td align="left">37.0</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">-0.5</Td>
    <Td align="left">1.1</Td>
    <Td align="left">0.2</Td>
    <Td align="left">1.2</Td>
    <Td align="left">10.2</Td>
    <Td align="left">3.2</Td>
    <Td align="left">-3.0</Td>
    <Td align="left">-7.8</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">88.1</Td>
    <Td align="left">88.0</Td>
    <Td align="left">88.4</Td>
    <Td align="left">87.9</Td>
    <Td align="left">87.9</Td>
    <Td align="left">87.4</Td>
    <Td align="left">86.3</Td>
    <Td align="left">64.6</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">61.6</Td>
    <Td align="left">61.1</Td>
    <Td align="left">60.2</Td>
    <Td align="left">60.6</Td>
    <Td align="left">61.3</Td>
    <Td align="left">59.0</Td>
    <Td align="left">58.8</Td>
    <Td align="left">52.7</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">17.6</Td>
    <Td align="left">16.3</Td>
    <Td align="left">15.4</Td>
    <Td align="left">13.7</Td>
    <Td align="left">13.9</Td>
    <Td align="left">12.8</Td>
    <Td align="left">10.8</Td>
    <Td align="left">-0.6</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">23.3</Td>
    <Td align="left">24.2</Td>
    <Td align="left">22.2</Td>
    <Td align="left">22.9</Td>
    <Td align="left">23.1</Td>
    <Td align="left">22.1</Td>
    <Td align="left">22.9</Td>
    <Td align="left">16.8</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">4.2</Td>
    <Td align="left">3.8</Td>
    <Td align="left">3.9</Td>
    <Td align="left">3.8</Td>
    <Td align="left">4.3</Td>
    <Td align="left">4.0</Td>
    <Td align="left">3.2</Td>
    <Td align="left">2.4</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">9.9</Td>
    <Td align="left">10.1</Td>
    <Td align="left">10.0</Td>
    <Td align="left">10.5</Td>
    <Td align="left">9.5</Td>
    <Td align="left">9.9</Td>
    <Td align="left">10.7</Td>
    <Td align="left">5.2</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">4.3</Td>
    <Td align="left">4.0</Td>
    <Td align="left">4.1</Td>
    <Td align="left">3.7</Td>
    <Td align="left">4.3</Td>
    <Td align="left">4.2</Td>
    <Td align="left">4.0</Td>
    <Td align="left">2.7</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">20.4</Td>
    <Td align="left">20.6</Td>
    <Td align="left">21.7</Td>
    <Td align="left">21.4</Td>
    <Td align="left">21.1</Td>
    <Td align="left">21.3</Td>
    <Td align="left">19.4</Td>
    <Td align="left">10.7</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">23.1</Td>
    <Td align="left">23.4</Td>
    <Td align="left">23.6</Td>
    <Td align="left">23.7</Td>
    <Td align="left">24.4</Td>
    <Td align="left">23.8</Td>
    <Td align="left">21.4</Td>
    <Td align="left">15.9</Td>
  </tr>
</Table>
</template>
