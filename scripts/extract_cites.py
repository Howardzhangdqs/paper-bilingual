#!/usr/bin/env python3
"""
extract_cites.py — 从 .bbl 文件生成两个 JSON：

  cites.json       {"cite key": 序号}      供 \\cite 上标编号
  references.json  {"cite key": 条目文本}  供文末 References 列表
                                          （\\cite 点击跳转的落点）

用法（在 web/ 目录下）:
  python3 scripts/extract_cites.py ../arxiv-translation/<id>/translated/main.bbl \
      --out-dir src/papers/<id>

论文 index.vue 中：
  import cites from './cites.json'
  import references from './references.json'
  const paper: Paper = { ..., cites, references }
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


# ---- LaTeX 重音/特殊字母 → Unicode，避免前端残留裸标记 ----
_COMBINING = {"'": '\u0301', '`': '\u0300', '"': '\u0308', '~': '\u0303', '=': '\u0304',
              '.': '\u0307', 'u': '\u0306', 'v': '\u030C', 'H': '\u030B', 'c': '\u0327',
              'r': '\u030A', 'b': '\u0331', 'd': '\u0323'}
_SPECIAL = {'oe': 'œ', 'OE': 'Œ', 'ae': 'æ', 'AE': 'Æ', 'aa': 'å', 'AA': 'Å',
            'ss': 'ß', 'L': 'Ł', 'l': 'ł', 'i': 'ı', 'j': 'ȷ', 'o': 'ø', 'O': 'Ø'}
_ACCENT_RE = re.compile(r"\\(['`\"~=uvHcdrbdu])\{([^{}]*)\}|\\(['`\"~=uvHcdrbdu])([a-zA-Z])")


def _strip_bare_groups(text: str) -> str:
    """循环剥掉裸保护花括号（{P}、{{State}}），不碰 \\ 开头的命令组"""
    prev = None
    while prev != text:
        prev = text
        text = re.sub(r'\{([^{}\\][^{}]*)\}', r'\1', text)
    return text


def _read_group(text: str, start: int) -> tuple[str, int]:
    """读取 text[start:] 起始的 {...} 组，返回（内容, 结束位置）"""
    depth = 0
    k = start
    while k < len(text):
        c = text[k]
        if c == '\\':
            k += 2
            continue
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return text[start + 1:k], k + 1
        k += 1
    return text[start + 1:], len(text)


def _flatten_groups(text: str) -> str:
    """递归扁平化：裸花括号组剥掉花括号（保护花括号），
    \\命令{...} 保留自身的花括号，只扁平化其内容。"""
    out: list[str] = []
    i, n = 0, len(text)
    while i < n:
        c = text[i]
        if c == '\\':
            m = re.match(r'\\[a-zA-Z]+', text[i:])
            if m:  # \命令：保留，紧跟的组保留花括号、内容递归处理
                cmd = m.group(0)
                j = i + len(cmd)
                k = j
                while k < n and text[k] in ' \t':
                    k += 1
                if k < n and text[k] == '{':
                    inner, end = _read_group(text, k)
                    out.append(cmd + '{' + _flatten_groups(inner) + '}')
                    i = end
                else:
                    out.append(cmd)
                    i = j
                continue
            out.append(text[i:i + 2])  # \' \" \\ 等单字符命令原样保留
            i += 2
            continue
        if c == '{':
            inner, end = _read_group(text, i)
            out.append(_flatten_groups(inner))  # 裸组：剥花括号
            i = end
            continue
        out.append(c)
        i += 1
    return ''.join(out)


def _normalize_entry(body: str) -> str:
    """把 bbl 常见标记规整为 RichText 可直接渲染的形式：
    重音命令转 Unicode、\\href 参数紧跟、剥掉 BibTeX 保护花括号。"""
    # {\natexlab{a}} -> a（年份后缀 a/b/c 有意义，保留）
    body = re.sub(r'\{\\natexlab\{(\w)\}\}', r'\1', body)
    # \href {url} {text} -> \href{url}{text}（RichText 要求参数紧跟命令）
    body = re.sub(r'(\\href)\s+(?=\{)', r'\1', body)
    # 无点 i 上的重音：\"{\i} / \"\i -> ï 等
    body = re.sub(r"\\(['`\"~^=v])\{?\\i\}?", lambda m: 'ı' + _COMBINING[m.group(1)], body)
    # 重音命令 → Unicode（\'a、\"{o}、\v{s}、\~n 及其包装花括号形态）
    body = _ACCENT_RE.sub(
        lambda m: (m.group(2) or m.group(4) or '') + _COMBINING[m.group(1) or m.group(3)],
        body)
    # 特殊字母命令 → Unicode（\L \ss \oe ...，后面不能紧跟字母以防误吃长命令）
    body = re.sub(r'\\(' + '|'.join(_SPECIAL) + r')(?![a-zA-Z])',
                  lambda m: _SPECIAL[m.group(1)], body)
    return _flatten_groups(body)


def parse_bbl(text: str) -> tuple[dict[str, int], dict[str, str]]:
    """返回（key->序号, key->条目文本）。条目文本保留常见行内标记
    （\\emph、\\url 等）交给前端 RichText 渲染。"""
    entries = re.findall(
        r'\\bibitem(?:\[[^\]]*\])?\{([^}]+)\}([\s\S]*?)(?=\\bibitem|\\end\{thebibliography\}|$)',
        text,
    )
    cites: dict[str, int] = {}
    refs: dict[str, str] = {}
    for key, body in entries:
        key = key.strip()
        if key in cites:
            continue
        body = re.sub(r'\\newblock\b', ' ', body)
        body = re.sub(r'\\(?:penalty|hline|strut|relax|small|em\b)\b', ' ', body)
        body = _normalize_entry(body)
        body = body.replace('~', ' ')
        body = re.sub(r'\s+', ' ', body).strip(' ,')
        cites[key] = len(cites) + 1
        refs[key] = body
    return cites, refs


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('bbl', type=Path)
    ap.add_argument('--out-dir', type=Path, required=True)
    args = ap.parse_args()

    text = args.bbl.read_text(encoding='utf-8', errors='ignore')
    cites, refs = parse_bbl(text)
    if not cites:
        sys.exit(f'未在 {args.bbl} 中找到 \\bibitem')

    args.out_dir.mkdir(parents=True, exist_ok=True)
    (args.out_dir / 'cites.json').write_text(
        json.dumps(cites, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    (args.out_dir / 'references.json').write_text(
        json.dumps(refs, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'已生成 cites.json（{len(cites)} 条编号）与 references.json（{len(refs)} 条文献）')


if __name__ == '__main__':
    main()
