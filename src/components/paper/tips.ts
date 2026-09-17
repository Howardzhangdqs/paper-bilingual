/**
 * 公式符号悬停释义：<Equation :tips="{ D: '训练 token 数' }" />
 *
 * applyTips 把每个 tip 键（LaTeX 片段）改写为 \htmlData{tip=<id>}{<键>}，
 * KaTeX（trust 允许 \htmlData）会渲染出 <span data-tip="id">。文案本身
 * 不过 LaTeX（中文在 LaTeX 属性值里不合法），存进模块级注册表，由
 * TipLayer 在悬停时按 id 查出展示。
 *
 * 键匹配规则：
 * - 先把 \text{...}、\mathrm{...} 等文本组内容替换为占位符，防止单字符
 *   键误伤正文文字（如 \text{ s.t. } 里的 s）；
 * - 按长度降序单遍替换，组合符号（R_D^*）优先于其前缀（R_D）；
 * - 键前不能是字母或反斜杠（\alpha 不误配 \xalpha 内部），键后不能紧跟
 *   字母；允许后跟 _ ^ ' 等，即键 N 可匹配 N^{\alpha} 中的 N；
 * - 匹配紧跟在 ^ 或 _ 之后时，输出 ^{\htmlData{...}}——KaTeX 不接受
 *   上标符后直接写带参命令。
 */
export interface TipEntry {
  /** 符号的 LaTeX（提示卡内用 KaTeX 渲染） */
  sym: string
  /** 一句话中文释义 */
  text: string
}

const TIP_STORE = new Map<string, TipEntry>()

export function lookupTip(id: string): TipEntry | undefined {
  return TIP_STORE.get(id)
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** 提取 \text/\mathrm/\operatorname 的 {...} 组内容为占位符，防止误伤 */
function maskTextGroups(latex: string): { masked: string; restore: (s: string) => string } {
  const saved: string[] = []
  let out = ''
  let i = 0
  const cmd = /\\(?:text|mathrm|mathit|operatorname|textit|textbf)\s*\{/y
  while (i < latex.length) {
    cmd.lastIndex = i
    const m = cmd.exec(latex)
    if (!m) {
      out += latex[i]
      i++
      continue
    }
    // 配平扫描大括号
    let depth = 0
    let j = m.index + m[0].length - 1
    for (; j < latex.length; j++) {
      if (latex[j] === '\\') {
        j++
        continue
      }
      if (latex[j] === '{') depth++
      else if (latex[j] === '}') {
        depth--
        if (depth === 0) break
      }
    }
    if (depth !== 0) {
      out += latex[i]
      i++
      continue
    }
    const idx = saved.length
    saved.push(latex.slice(m.index, j + 1))
    out += `\u0000${idx}\u0000`
    i = j + 1
  }
  return { masked: out, restore: (s) => s.replace(/\u0000(\d+)\u0000/g, (_, d) => saved[Number(d)] ?? '') }
}

export function applyTips(
  latex: string,
  tips: Record<string, string>,
  ns: string,
): string {
  const keys = Object.keys(tips)
    .filter((k) => k && tips[k] && latex.includes(k))
    .sort((a, b) => b.length - a.length)
  if (!keys.length) return latex

  const { masked, restore } = maskTextGroups(latex)
  // 键前：要么紧跟 ^/_（此时无需检查再前一个字符，^ 已隔开前邻 token），
  // 要么前一个字符不是字母/反斜杠（防 \alpha 误配命令名内部、连写变量）；
  // 键后不能紧跟字母（防 \text 内容与命令名后缀）。
  const pattern = keys
    .map((k) => `(?:[_^]|(?<![A-Za-z\\\\]))(${escapeRegExp(k)})(?![A-Za-z])`)
    .join('|')
  const re = new RegExp(pattern, 'g')

  let i = 0
  const wrapped = masked.replace(re, (...args: string[]) => {
    // args = [match, 各捕获组(未参与分支为 undefined), offset, string]
    const sup = /^[_^]/.test(args[0]) ? args[0][0] : ''
    const key = sup ? args[0].slice(1) : args[0]
    const id = `${ns}t${i++}`
    TIP_STORE.set(id, { sym: key, text: tips[key] })
    const body = `\\htmlData{tip=${id}}{${key}}`
    return sup ? `${sup}{${body}}` : body
  })
  return restore(wrapped)
}
