<!-- Summary of Power Laws -->
<script setup lang="ts">
import { Heading, Para, En, Zh, Table, Td, Th } from '../../../components/paper'
</script>

<template>
<Heading :level="1" appendix en="Summary of Power Laws" zh="幂律总结" />

<Para>
  <En>For easier reference, we provide a summary below of the key trends described throughout the paper.</En>
  <Zh>为便于查阅，我们在下面总结全文所述的关键趋势。</Zh>
</Para>

<Table caption-en="Key trend equations" caption-zh="关键趋势方程">
  <tr>
    <Th align="center">\textbf{Parameters}</Th>
    <Th align="center">\textbf{Data}</Th>
    <Th align="center">\textbf{Compute}</Th>
    <Th align="center">\textbf{Batch Size}</Th>
    <Th align="center">\textbf{Equation}</Th>
  </tr>
  <tr>
    <Td align="center">$N$</Td>
    <Td align="center">$\infty$</Td>
    <Td align="center">$\infty$</Td>
    <Td align="center">Fixed</Td>
    <Td align="left">$L\left(N\right)=\left(N_{\rm c}}/N\right)^{\alpha_{N}}$</Td>
  </tr>
  <tr>
    <Td align="center">$\infty$</Td>
    <Td align="center">$D$</Td>
    <Td align="center">Early Stop</Td>
    <Td align="center">Fixed</Td>
    <Td align="left">$L\left(D\right)=\left(D_{\rm c}}/D\right)^{\alpha_{D}}$</Td>
  </tr>
  <tr>
    <Td align="center">Optimal</Td>
    <Td align="center">$\infty$</Td>
    <Td align="center">$C$</Td>
    <Td align="center">Fixed</Td>
    <Td align="left">$L\left(C\right)=\left(C_{\rm c}}/C\right)^{\alpha_{C}}$ (naive)</Td>
  </tr>
  <tr>
    <Td align="center">$N_{\rm opt}}$</Td>
    <Td align="center">$D_{\rm opt}}$</Td>
    <Td align="center">$C_{\rm min}}$</Td>
    <Td align="center">$B\ll B_{\rm crit}}$</Td>
    <Td align="left">$L\left(C_{\rm min}}\right)=\left(C_{\rm c}}^{\rm min}}/C_{\rm min}}\right)^{\alpha_{C}^{\rm min}}}$</Td>
  </tr>
  <tr>
    <Td align="center">$N$</Td>
    <Td align="center">$D$</Td>
    <Td align="center">Early Stop</Td>
    <Td align="center">Fixed</Td>
    <Td align="left">$L\left(N,D\right)=\left[\left(\frac{N_{\rm c}}}{N}\right)^{\frac{\alpha_{N}}{\alpha_{D}}}+\frac{D_{c}}{D}\right]^{\alpha_{D}}$</Td>
  </tr>
  <tr>
    <Td align="center">$N$</Td>
    <Td align="center">$\infty$</Td>
    <Td align="center">$S$ steps</Td>
    <Td align="center">$B$</Td>
    <Td align="left">$L\left(N,S\right)=\left(\frac{N_{\rm c}}}{N}\right)^{\alpha_{N}}+\left(\frac{S_{\rm c}}}{S_{\rm min}}\left(S,B\right)}\right)^{\alpha_{S}}$</Td>
  </tr>
</Table>

<Para>
  <En>The empirical fitted values for these trends are:</En>
  <Zh>这些趋势的经验拟合值为：</Zh>
</Para>

<Table caption-en="Key parameters to trend fits" caption-zh="趋势拟合的关键参数">
  <tr>
    <Th align="left">\textbf{Power Law}</Th>
    <Th align="left">\textbf{Scale (tokenization-dependent)}</Th>
  </tr>
  <tr>
    <Td align="left">$\alpha_{N}=0.076$</Td>
    <Td align="left">$N_{\rm c}}=8.8\times10^{13}$ params (non-embed)</Td>
  </tr>
  <tr>
    <Td align="left">$\alpha_{D}=0.095$</Td>
    <Td align="left">$D_{\rm c}}=5.4\times10^{13}$ tokens</Td>
  </tr>
  <tr>
    <Td align="left">$\alpha_{C}=0.057$</Td>
    <Td align="left">$C_{\rm c}}=1.6\times10^{7}$ PF-days</Td>
  </tr>
  <tr>
    <Td align="left">$\alpha_{C}^{\rm min}}=0.050$</Td>
    <Td align="left">$C_{\rm c}}^{\rm min}}=3.1\times10^{8}$ PF-days</Td>
  </tr>
  <tr>
    <Td align="left">$\alpha_{B}=0.21$</Td>
    <Td align="left">$B_{\ast}=2.1\times10^{8}$ tokens</Td>
  </tr>
  <tr>
    <Td align="left">$\alpha_{S}=0.76$</Td>
    <Td align="left">$S_{\rm c}}=2.1\times10^{3}$ steps</Td>
  </tr>
</Table>

<Para>
  <En>The optimal parameters for compute efficient training are given by:</En>
  <Zh>算力高效训练的最优参数由下表给出：</Zh>
</Para>

<Table caption-en="Trends for compute-efficient training" caption-zh="算力高效训练的趋势">
  <tr>
    <Th align="left">\textbf{Compute-Efficient Value}</Th>
    <Th align="left">\textbf{Power Law}</Th>
    <Th align="left">\textbf{Scale}</Th>
  </tr>
  <tr>
    <Td align="left">$N_{\rm opt}}=N_{e}\cdot C_{\rm min}}^{p_{N}}$</Td>
    <Td align="left">$p_{N}=0.73$</Td>
    <Td align="left">$N_{e}=1.3\cdot10^{9}$ params</Td>
  </tr>
  <tr>
    <Td align="left">$B \ll B_{\rm crit}}=\frac{B_{\ast}}{L^{1/\alpha_{B}}}=B_{e}C_{\rm min}}^{p_{B}}$</Td>
    <Td align="left">$p_{B}=0.24$</Td>
    <Td align="left">$B_{e}=2.0\cdot10^{6}$ tokens</Td>
  </tr>
  <tr>
    <Td align="left">$S_{\rm min}}=S_{e}\cdot C_{\rm min}}^{p_{S}}$ (lower bound)</Td>
    <Td align="left">$p_{S}=0.03$</Td>
    <Td align="left">$S_{e}=5.4\cdot10^{3}$ steps</Td>
  </tr>
  <tr>
    <Td align="left">$D_{\rm opt}}=D_{e}\cdot C_{\rm min}}^{p_{D}}$ (1 epoch)</Td>
    <Td align="left">$p_{D}=0.27$</Td>
    <Td align="left">$D_{e}=2\cdot10^{10}$ tokens</Td>
  </tr>
</Table>
</template>
