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
