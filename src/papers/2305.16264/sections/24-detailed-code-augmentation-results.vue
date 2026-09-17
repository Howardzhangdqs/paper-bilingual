<!-- Detailed Code Augmentation Results -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Table, Td } from '../../../components/paper'
</script>

<template>
<Heading :level="1" label="sec:vc" appendix en="Detailed Code Augmentation Results" zh="代码增广的详细结果" />

<Para>
  <En>We report tabular results for replacing part of C4 or OSCAR with code for 4.2 billion parameter and 2.8 billion parameter models in Tables~\ref{tab:4b2py}-\ref{tab:2b8py}. We find that training on up to 50\% of Python data maintains performance on all natural language tasks while enabling huge performance gains on state-tracking (bAbI) for C4. For OSCAR gains are less clear, which is likely due to OSCAR containing code~\cite{ortiz-suarez-etal-2020-monolingual}, while code data was explicitly filtered out for C4~\cite{raffel2020exploring}.</En>
  <Zh>在表~\ref{tab:4b2py}-\ref{tab:2b8py} 中，我们报告了用代码替换部分 C4 或 OSCAR 时 42 亿与 28 亿参数模型的表格化结果。我们发现，用至多 50\% 的 Python 数据训练可以在所有自然语言任务上保持性能，同时使 C4 上的状态跟踪任务（bAbI）大幅提升。OSCAR 上的收益不那么明显，这可能是因为 OSCAR 本身含有代码~\cite{ortiz-suarez-etal-2020-monolingual}，而 C4 曾明确过滤掉代码数据~\cite{raffel2020exploring}。</Zh>
</Para>

<Table label="tab:4b2py" caption-en="\textbf{Results for code-augmentation for 4.2B parameter models.} Models trained on a mix of natural language (C4) and Python (The Stack). Scores are normalized averages of 0-5 few-shots and reported as percentages. We report mean/std. err. across five different models, each trained with a different random seed." caption-zh="\textbf{42 亿参数模型代码增广的结果。}模型在自然语言（C4）与 Python（The Stack）的混合数据上训练。分数为 0-5 few-shot 的归一化平均值，以百分比报告。我们报告五个不同随机种子训练模型之间的均值/标准误。">
  <tr>
    <Td align="left" :colspan="10">{\% of Python pre-training data (remainder is C4)}</Td>
  </tr>
  <tr>
    <Td align="left">Dataset ($\downarrow$)</Td>
    <Td align="left">0</Td>
    <Td align="left">10</Td>
    <Td align="left">20</Td>
    <Td align="left">30</Td>
    <Td align="left">40</Td>
    <Td align="left">50</Td>
    <Td align="left">60</Td>
    <Td align="left">70</Td>
    <Td align="left">80</Td>
    <Td align="left">90</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">-1.0 ± 0.3</Td>
    <Td align="left">-0.7 ± 0.6</Td>
    <Td align="left">0.5 ± 0.6</Td>
    <Td align="left">-0.2 ± 1.1</Td>
    <Td align="left">-1.5 ± 0.7</Td>
    <Td align="left">-0.7 ± 1.1</Td>
    <Td align="left">-1.1 ± 0.9</Td>
    <Td align="left">-1.2 ± 1.1</Td>
    <Td align="left">-1.4 ± 0.7</Td>
    <Td align="left">-1.4 ± 0.6</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">0.8 ± 0.5</Td>
    <Td align="left">0.4 ± 0.8</Td>
    <Td align="left">0.3 ± 1.0</Td>
    <Td align="left">0.6 ± 0.5</Td>
    <Td align="left">0.5 ± 0.6</Td>
    <Td align="left">0.3 ± 0.6</Td>
    <Td align="left">0.8 ± 0.7</Td>
    <Td align="left">0.4 ± 0.5</Td>
    <Td align="left">0.1 ± 1.2</Td>
    <Td align="left">1.0 ± 0.3</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">1.1 ± 0.7</Td>
    <Td align="left">0.6 ± 0.5</Td>
    <Td align="left">0.5 ± 0.6</Td>
    <Td align="left">0.2 ± 0.4</Td>
    <Td align="left">0.3 ± 0.5</Td>
    <Td align="left">0.2 ± 0.5</Td>
    <Td align="left">0.3 ± 0.2</Td>
    <Td align="left">-0.1 ± 0.3</Td>
    <Td align="left">-0.0 ± 0.2</Td>
    <Td align="left">-0.1 ± 0.2</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">5.3 ± 0.6</Td>
    <Td align="left">6.4 ± 1.0</Td>
    <Td align="left">5.2 ± 2.4</Td>
    <Td align="left">4.3 ± 1.4</Td>
    <Td align="left">5.2 ± 0.8</Td>
    <Td align="left">5.2 ± 0.5</Td>
    <Td align="left">2.6 ± 0.4</Td>
    <Td align="left">1.7 ± 0.5</Td>
    <Td align="left">-0.4 ± 0.4</Td>
    <Td align="left">-3.0 ± 0.4</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">49.2 ± 0.9</Td>
    <Td align="left">52.4 ± 1.1</Td>
    <Td align="left">49.6 ± 3.7</Td>
    <Td align="left">48.1 ± 4.1</Td>
    <Td align="left">50.1 ± 1.0</Td>
    <Td align="left">49.7 ± 0.3</Td>
    <Td align="left">48.0 ± 0.5</Td>
    <Td align="left">45.6 ± 0.5</Td>
    <Td align="left">43.3 ± 0.4</Td>
    <Td align="left">37.7 ± 0.7</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">18.2 ± 4.0</Td>
    <Td align="left">10.5 ± 12.0</Td>
    <Td align="left">16.3 ± 5.2</Td>
    <Td align="left">17.8 ± 3.3</Td>
    <Td align="left">13.4 ± 3.4</Td>
    <Td align="left">14.8 ± 2.1</Td>
    <Td align="left">12.5 ± 8.9</Td>
    <Td align="left">12.1 ± 6.6</Td>
    <Td align="left">7.2 ± 6.7</Td>
    <Td align="left">10.7 ± 7.3</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">12.0 ± 7.2</Td>
    <Td align="left">20.3 ± 2.7</Td>
    <Td align="left">14.4 ± 7.1</Td>
    <Td align="left">16.5 ± 1.2</Td>
    <Td align="left">22.3 ± 3.1</Td>
    <Td align="left">22.1 ± 4.8</Td>
    <Td align="left">19.4 ± 4.8</Td>
    <Td align="left">23.8 ± 3.3</Td>
    <Td align="left">23.8 ± 4.1</Td>
    <Td align="left">23.4 ± 2.4</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">59.1 ± 5.4</Td>
    <Td align="left">56.4 ± 4.9</Td>
    <Td align="left">46.7 ± 8.7</Td>
    <Td align="left">50.2 ± 3.7</Td>
    <Td align="left">52.7 ± 2.5</Td>
    <Td align="left">50.1 ± 4.5</Td>
    <Td align="left">46.5 ± 1.9</Td>
    <Td align="left">43.1 ± 4.2</Td>
    <Td align="left">39.2 ± 3.7</Td>
    <Td align="left">35.9 ± 4.9</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">27.8 ± 4.8</Td>
    <Td align="left">29.4 ± 0.4</Td>
    <Td align="left">25.7 ± 4.8</Td>
    <Td align="left">27.0 ± 1.7</Td>
    <Td align="left">26.3 ± 2.4</Td>
    <Td align="left">26.3 ± 0.6</Td>
    <Td align="left">25.0 ± 0.1</Td>
    <Td align="left">22.6 ± 0.1</Td>
    <Td align="left">19.5 ± 0.2</Td>
    <Td align="left">14.7 ± 0.1</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">50.6 ± 0.5</Td>
    <Td align="left">50.8 ± 0.6</Td>
    <Td align="left">48.6 ± 3.0</Td>
    <Td align="left">48.2 ± 2.8</Td>
    <Td align="left">48.7 ± 0.7</Td>
    <Td align="left">48.4 ± 1.0</Td>
    <Td align="left">47.1 ± 0.7</Td>
    <Td align="left">45.6 ± 0.3</Td>
    <Td align="left">43.4 ± 0.9</Td>
    <Td align="left">39.0 ± 0.8</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">5.6 ± 3.1</Td>
    <Td align="left">7.3 ± 3.4</Td>
    <Td align="left">4.4 ± 4.7</Td>
    <Td align="left">6.1 ± 2.6</Td>
    <Td align="left">9.1 ± 4.0</Td>
    <Td align="left">8.1 ± 5.9</Td>
    <Td align="left">7.7 ± 5.3</Td>
    <Td align="left">4.0 ± 2.1</Td>
    <Td align="left">6.2 ± 2.1</Td>
    <Td align="left">4.6 ± 2.5</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">84.6 ± 3.9</Td>
    <Td align="left">87.1 ± 0.2</Td>
    <Td align="left">84.6 ± 4.8</Td>
    <Td align="left">86.9 ± 1.2</Td>
    <Td align="left">86.9 ± 1.2</Td>
    <Td align="left">87.9 ± 0.9</Td>
    <Td align="left">87.6 ± 0.6</Td>
    <Td align="left">87.0 ± 0.2</Td>
    <Td align="left">86.0 ± 0.2</Td>
    <Td align="left">84.5 ± 0.6</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">61.1 ± 3.7</Td>
    <Td align="left">62.0 ± 0.6</Td>
    <Td align="left">59.0 ± 4.8</Td>
    <Td align="left">60.8 ± 1.5</Td>
    <Td align="left">59.9 ± 1.9</Td>
    <Td align="left">60.0 ± 0.7</Td>
    <Td align="left">59.0 ± 0.4</Td>
    <Td align="left">57.2 ± 0.5</Td>
    <Td align="left">54.9 ± 0.4</Td>
    <Td align="left">51.0 ± 0.3</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">17.0 ± 2.6</Td>
    <Td align="left">17.4 ± 2.1</Td>
    <Td align="left">14.9 ± 4.4</Td>
    <Td align="left">15.2 ± 2.0</Td>
    <Td align="left">15.7 ± 1.2</Td>
    <Td align="left">14.2 ± 1.0</Td>
    <Td align="left">13.5 ± 1.3</Td>
    <Td align="left">10.7 ± 1.3</Td>
    <Td align="left">9.1 ± 0.6</Td>
    <Td align="left">5.3 ± 1.3</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">18.2 ± 1.2</Td>
    <Td align="left">21.8 ± 1.6</Td>
    <Td align="left">15.9 ± 8.6</Td>
    <Td align="left">23.3 ± 0.6</Td>
    <Td align="left">21.5 ± 3.8</Td>
    <Td align="left">23.9 ± 0.6</Td>
    <Td align="left">23.7 ± 0.6</Td>
    <Td align="left">23.7 ± 0.5</Td>
    <Td align="left">24.3 ± 0.7</Td>
    <Td align="left">24.0 ± 0.9</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">2.9 ± 0.2</Td>
    <Td align="left">3.2 ± 0.5</Td>
    <Td align="left">3.4 ± 0.3</Td>
    <Td align="left">3.3 ± 0.3</Td>
    <Td align="left">3.6 ± 0.6</Td>
    <Td align="left">3.4 ± 0.2</Td>
    <Td align="left">3.5 ± 0.2</Td>
    <Td align="left">2.9 ± 0.3</Td>
    <Td align="left">2.8 ± 0.4</Td>
    <Td align="left">2.7 ± 0.2</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">4.8 ± 2.0</Td>
    <Td align="left">9.5 ± 0.7</Td>
    <Td align="left">10.2 ± 1.1</Td>
    <Td align="left">10.5 ± 0.7</Td>
    <Td align="left">10.4 ± 0.8</Td>
    <Td align="left">10.4 ± 0.6</Td>
    <Td align="left">9.9 ± 0.4</Td>
    <Td align="left">10.0 ± 0.5</Td>
    <Td align="left">9.3 ± 0.6</Td>
    <Td align="left">9.2 ± 0.2</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">3.3 ± 0.5</Td>
    <Td align="left">4.0 ± 0.1</Td>
    <Td align="left">4.0 ± 0.2</Td>
    <Td align="left">4.2 ± 0.1</Td>
    <Td align="left">4.3 ± 0.3</Td>
    <Td align="left">4.2 ± 0.2</Td>
    <Td align="left">4.4 ± 0.3</Td>
    <Td align="left">4.1 ± 0.2</Td>
    <Td align="left">3.9 ± 0.2</Td>
    <Td align="left">3.6 ± 0.3</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">12.5 ± 6.7</Td>
    <Td align="left">13.8 ± 7.2</Td>
    <Td align="left">15.8 ± 8.2</Td>
    <Td align="left">17.4 ± 9.2</Td>
    <Td align="left">23.2 ± 1.2</Td>
    <Td align="left">23.4 ± 2.0</Td>
    <Td align="left">24.3 ± 1.4</Td>
    <Td align="left">23.2 ± 1.0</Td>
    <Td align="left">24.6 ± 1.8</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">22.1 ± 1.7</Td>
    <Td align="left">23.7 ± 0.7</Td>
    <Td align="left">22.0 ± 3.0</Td>
    <Td align="left">23.1 ± 1.1</Td>
    <Td align="left">23.5 ± 1.0</Td>
    <Td align="left">23.8 ± 0.5</Td>
    <Td align="left">22.8 ± 1.0</Td>
    <Td align="left">22.0 ± 0.6</Td>
    <Td align="left">20.8 ± 0.5</Td>
    <Td align="left">19.3 ± 0.3</Td>
  </tr>
  <tr>
    <Td align="left">Average (no bAbI)</Td>
    <Td align="left">23.4 ± 1.8</Td>
    <Td align="left">24.4 ± 0.7</Td>
    <Td align="left">22.5 ± 2.8</Td>
    <Td align="left">23.5 ± 0.8</Td>
    <Td align="left">23.9 ± 0.9</Td>
    <Td align="left">23.8 ± 0.5</Td>
    <Td align="left">22.8 ± 1.0</Td>
    <Td align="left">21.8 ± 0.6</Td>
    <Td align="left">20.6 ± 0.6</Td>
    <Td align="left">19.1 ± 0.4</Td>
  </tr>
</Table>

<Table label="tab:2b8py" caption-en="\textbf{Results for code-augmentation for 2.8B parameter models.} Models trained on a mix of natural language (C4) and Python (The Stack). Scores are normalized averages of 0-5 few-shots and reported as percentages. We report mean/std. err. across five different models, each trained with a different random seed." caption-zh="\textbf{28 亿参数模型代码增广的结果。}模型在自然语言（C4）与 Python（The Stack）的混合数据上训练。分数为 0-5 few-shot 的归一化平均值，以百分比报告。我们报告五个不同随机种子训练模型之间的均值/标准误。">
  <tr>
    <Td align="left" :colspan="6">{\% of Python pre-training data (rest is C4)}</Td>
    <Td align="left" :colspan="6">{\% of Python pre-training data (rest is OSCAR)}</Td>
  </tr>
  <tr>
    <Td align="left">Dataset ($\downarrow$)</Td>
    <Td align="left">0</Td>
    <Td align="left">10</Td>
    <Td align="left">20</Td>
    <Td align="left">30</Td>
    <Td align="left">40</Td>
    <Td align="left">50</Td>
    <Td align="left">0</Td>
    <Td align="left">10</Td>
    <Td align="left">20</Td>
    <Td align="left">30</Td>
    <Td align="left">40</Td>
    <Td align="left">50</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R1</Td>
    <Td align="left">0.4 ± 1.6</Td>
    <Td align="left">-1.5</Td>
    <Td align="left">-0.9</Td>
    <Td align="left">-1.0</Td>
    <Td align="left">-0.7</Td>
    <Td align="left">-2.4</Td>
    <Td align="left">-0.3 ± 0.5</Td>
    <Td align="left">0.0</Td>
    <Td align="left">-0.6</Td>
    <Td align="left">-1.6</Td>
    <Td align="left">-2.4</Td>
    <Td align="left">-1.7</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R2</Td>
    <Td align="left">0.9 ± 0.4</Td>
    <Td align="left">0.7</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.1</Td>
    <Td align="left">-0.1</Td>
    <Td align="left">0.1</Td>
    <Td align="left">1.0 ± 1.0</Td>
    <Td align="left">1.2</Td>
    <Td align="left">-0.1</Td>
    <Td align="left">-0.0</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.8</Td>
  </tr>
  <tr>
    <Td align="left">ANLI R3</Td>
    <Td align="left">1.7 ± 0.5</Td>
    <Td align="left">0.6</Td>
    <Td align="left">-0.7</Td>
    <Td align="left">-0.2</Td>
    <Td align="left">0.4</Td>
    <Td align="left">0.0</Td>
    <Td align="left">0.4 ± 0.8</Td>
    <Td align="left">-0.4</Td>
    <Td align="left">-0.2</Td>
    <Td align="left">-1.7</Td>
    <Td align="left">-0.8</Td>
    <Td align="left">-0.5</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Challenge</Td>
    <Td align="left">1.6 ± 1.0</Td>
    <Td align="left">4.2</Td>
    <Td align="left">1.7</Td>
    <Td align="left">1.5</Td>
    <Td align="left">0.2</Td>
    <Td align="left">-0.2</Td>
    <Td align="left">-1.4 ± 0.8</Td>
    <Td align="left">-0.7</Td>
    <Td align="left">-1.4</Td>
    <Td align="left">-3.4</Td>
    <Td align="left">-2.3</Td>
    <Td align="left">-3.1</Td>
  </tr>
  <tr>
    <Td align="left">ARC-Easy</Td>
    <Td align="left">44.5 ± 0.5</Td>
    <Td align="left">46.4</Td>
    <Td align="left">46.5</Td>
    <Td align="left">45.4</Td>
    <Td align="left">43.6</Td>
    <Td align="left">42.7</Td>
    <Td align="left">39.7 ± 0.3</Td>
    <Td align="left">39.8</Td>
    <Td align="left">38.7</Td>
    <Td align="left">39.1</Td>
    <Td align="left">37.3</Td>
    <Td align="left">37.6</Td>
  </tr>
  <tr>
    <Td align="left">BoolQ</Td>
    <Td align="left">18.8 ± 3.4</Td>
    <Td align="left">15.7</Td>
    <Td align="left">19.0</Td>
    <Td align="left">13.4</Td>
    <Td align="left">16.0</Td>
    <Td align="left">4.4</Td>
    <Td align="left">12.8 ± 4.4</Td>
    <Td align="left">3.3</Td>
    <Td align="left">12.5</Td>
    <Td align="left">10.6</Td>
    <Td align="left">5.8</Td>
    <Td align="left">8.5</Td>
  </tr>
  <tr>
    <Td align="left">CB</Td>
    <Td align="left">20.0 ± 4.7</Td>
    <Td align="left">22.8</Td>
    <Td align="left">10.7</Td>
    <Td align="left">20.5</Td>
    <Td align="left">17.4</Td>
    <Td align="left">15.2</Td>
    <Td align="left">19.7 ± 5.1</Td>
    <Td align="left">14.7</Td>
    <Td align="left">15.6</Td>
    <Td align="left">19.6</Td>
    <Td align="left">22.8</Td>
    <Td align="left">17.0</Td>
  </tr>
  <tr>
    <Td align="left">COPA</Td>
    <Td align="left">49.7 ± 3.5</Td>
    <Td align="left">46.3</Td>
    <Td align="left">49.3</Td>
    <Td align="left">46.3</Td>
    <Td align="left">42.7</Td>
    <Td align="left">40.0</Td>
    <Td align="left">42.7 ± 2.2</Td>
    <Td align="left">42.7</Td>
    <Td align="left">41.0</Td>
    <Td align="left">42.7</Td>
    <Td align="left">35.7</Td>
    <Td align="left">38.0</Td>
  </tr>
  <tr>
    <Td align="left">HellaSwag</Td>
    <Td align="left">24.7 ± 0.3</Td>
    <Td align="left">24.1</Td>
    <Td align="left">23.3</Td>
    <Td align="left">22.3</Td>
    <Td align="left">21.9</Td>
    <Td align="left">20.9</Td>
    <Td align="left">16.3 ± 0.1</Td>
    <Td align="left">15.7</Td>
    <Td align="left">15.9</Td>
    <Td align="left">15.5</Td>
    <Td align="left">15.1</Td>
    <Td align="left">13.7</Td>
  </tr>
  <tr>
    <Td align="left">PiQA</Td>
    <Td align="left">47.9 ± 0.6</Td>
    <Td align="left">46.9</Td>
    <Td align="left">47.7</Td>
    <Td align="left">45.1</Td>
    <Td align="left">46.2</Td>
    <Td align="left">45.5</Td>
    <Td align="left">41.2 ± 0.7</Td>
    <Td align="left">41.6</Td>
    <Td align="left">39.9</Td>
    <Td align="left">40.5</Td>
    <Td align="left">38.8</Td>
    <Td align="left">38.6</Td>
  </tr>
  <tr>
    <Td align="left">RTE</Td>
    <Td align="left">5.1 ± 4.0</Td>
    <Td align="left">8.8</Td>
    <Td align="left">7.7</Td>
    <Td align="left">5.1</Td>
    <Td align="left">7.8</Td>
    <Td align="left">10.8</Td>
    <Td align="left">3.9 ± 1.1</Td>
    <Td align="left">2.2</Td>
    <Td align="left">4.3</Td>
    <Td align="left">1.1</Td>
    <Td align="left">3.7</Td>
    <Td align="left">-1.7</Td>
  </tr>
  <tr>
    <Td align="left">SciQ</Td>
    <Td align="left">83.2 ± 0.6</Td>
    <Td align="left">83.3</Td>
    <Td align="left">85.3</Td>
    <Td align="left">84.8</Td>
    <Td align="left">83.2</Td>
    <Td align="left">83.7</Td>
    <Td align="left">83.2 ± 0.6</Td>
    <Td align="left">82.4</Td>
    <Td align="left">83.5</Td>
    <Td align="left">82.8</Td>
    <Td align="left">83.3</Td>
    <Td align="left">83.2</Td>
  </tr>
  <tr>
    <Td align="left">StoryCloze 2016</Td>
    <Td align="left">58.7 ± 0.2</Td>
    <Td align="left">59.3</Td>
    <Td align="left">57.9</Td>
    <Td align="left">56.9</Td>
    <Td align="left">56.5</Td>
    <Td align="left">56.0</Td>
    <Td align="left">52.8 ± 0.3</Td>
    <Td align="left">52.0</Td>
    <Td align="left">52.2</Td>
    <Td align="left">52.0</Td>
    <Td align="left">51.8</Td>
    <Td align="left">50.9</Td>
  </tr>
  <tr>
    <Td align="left">WinoGrande XL</Td>
    <Td align="left">11.6 ± 0.8</Td>
    <Td align="left">13.0</Td>
    <Td align="left">10.7</Td>
    <Td align="left">9.3</Td>
    <Td align="left">8.2</Td>
    <Td align="left">9.6</Td>
    <Td align="left">5.8 ± 0.9</Td>
    <Td align="left">3.2</Td>
    <Td align="left">5.6</Td>
    <Td align="left">5.8</Td>
    <Td align="left">4.6</Td>
    <Td align="left">3.9</Td>
  </tr>
  <tr>
    <Td align="left">E2E NLG</Td>
    <Td align="left">17.0 ± 1.4</Td>
    <Td align="left">19.8</Td>
    <Td align="left">21.1</Td>
    <Td align="left">20.2</Td>
    <Td align="left">22.1</Td>
    <Td align="left">21.0</Td>
    <Td align="left">20.3 ± 0.3</Td>
    <Td align="left">21.9</Td>
    <Td align="left">20.7</Td>
    <Td align="left">20.5</Td>
    <Td align="left">20.7</Td>
    <Td align="left">21.1</Td>
  </tr>
  <tr>
    <Td align="left">XSUM</Td>
    <Td align="left">2.4 ± 0.1</Td>
    <Td align="left">2.7</Td>
    <Td align="left">2.0</Td>
    <Td align="left">2.2</Td>
    <Td align="left">2.0</Td>
    <Td align="left">2.3</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">2.8</Td>
    <Td align="left">3.1</Td>
    <Td align="left">3.4</Td>
    <Td align="left">3.1</Td>
    <Td align="left">2.9</Td>
  </tr>
  <tr>
    <Td align="left">WebNLG EN</Td>
    <Td align="left">5.3 ± 0.1</Td>
    <Td align="left">9.1</Td>
    <Td align="left">8.0</Td>
    <Td align="left">8.5</Td>
    <Td align="left">8.5</Td>
    <Td align="left">9.1</Td>
    <Td align="left">8.8 ± 0.4</Td>
    <Td align="left">8.7</Td>
    <Td align="left">9.6</Td>
    <Td align="left">9.1</Td>
    <Td align="left">8.7</Td>
    <Td align="left">9.4</Td>
  </tr>
  <tr>
    <Td align="left">WikiLingua EN</Td>
    <Td align="left">3.0 ± 0.1</Td>
    <Td align="left">3.2</Td>
    <Td align="left">3.2</Td>
    <Td align="left">3.6</Td>
    <Td align="left">3.3</Td>
    <Td align="left">3.7</Td>
    <Td align="left">2.9 ± 0.1</Td>
    <Td align="left">3.3</Td>
    <Td align="left">3.6</Td>
    <Td align="left">3.5</Td>
    <Td align="left">3.4</Td>
    <Td align="left">3.5</Td>
  </tr>
  <tr>
    <Td align="left">bAbI</Td>
    <Td align="left">0.0 ± 0.0</Td>
    <Td align="left">4.6</Td>
    <Td align="left">14.2</Td>
    <Td align="left">14.2</Td>
    <Td align="left">14.8</Td>
    <Td align="left">15.1</Td>
    <Td align="left">15.5 ± 1.0</Td>
    <Td align="left">16.6</Td>
    <Td align="left">17.2</Td>
    <Td align="left">17.2</Td>
    <Td align="left">17.7</Td>
    <Td align="left">15.9</Td>
  </tr>
  <tr>
    <Td align="left">Average</Td>
    <Td align="left">20.9 ± 0.4</Td>
    <Td align="left">21.6</Td>
    <Td align="left">21.4</Td>
    <Td align="left">21.0</Td>
    <Td align="left">20.7</Td>
    <Td align="left">19.9</Td>
    <Td align="left">19.4 ± 0.5</Td>
    <Td align="left">18.5</Td>
    <Td align="left">19.0</Td>
    <Td align="left">18.8</Td>
    <Td align="left">18.3</Td>
    <Td align="left">17.8</Td>
  </tr>
  <tr>
    <Td align="left">Average (without bAbI)</Td>
    <Td align="left">22.0 ± 0.5</Td>
    <Td align="left">22.5</Td>
    <Td align="left">21.8</Td>
    <Td align="left">21.3</Td>
    <Td align="left">21.1</Td>
    <Td align="left">20.1</Td>
    <Td align="left">19.6 ± 0.5</Td>
    <Td align="left">18.6</Td>
    <Td align="left">19.1</Td>
    <Td align="left">18.9</Td>
    <Td align="left">18.3</Td>
    <Td align="left">17.9</Td>
  </tr>
</Table>
</template>
