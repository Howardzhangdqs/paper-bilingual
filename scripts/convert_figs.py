#!/usr/bin/env python3
"""
convert_figs.py — 把论文 figures 目录下的 PDF 图转换为两种格式：
  - .png：150 DPI 位图版，正文内嵌显示（解码/传输都远轻于复杂 SVG），
    也是灯箱动画期间的替身（GPU 缩放流畅）；
  - .svg：矢量版，灯箱静止时使用（放大不失真）。
PNG/JPG 源文件直接复制。

用法（在 web/ 目录下）:
  python3 scripts/convert_figs.py ../arxiv-translation/<id>/translated/figures --id <id>

依赖 poppler-utils 的 pdftocairo。--force 重转已存在的文件。
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

PNG_DPI = 150


def convert(figs_dir: Path, out_dir: Path, force: bool) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    n_ok = n_skip = 0
    for f in sorted(figs_dir.iterdir()):
        if f.suffix.lower() == '.pdf':
            svg = out_dir / (f.stem + '.svg')
            png = out_dir / (f.stem + '.png')
            if force or not svg.exists():
                r = subprocess.run(
                    ['pdftocairo', '-svg', str(f), str(svg)],
                    capture_output=True, text=True,
                )
                if r.returncode != 0 or not svg.exists():
                    print(f'[FAIL svg] {f.name}: {r.stderr.strip()}', file=sys.stderr)
                    continue
            if force or not png.exists():
                r = subprocess.run(
                    ['pdftocairo', '-png', '-r', str(PNG_DPI), '-singlefile', str(f), str(png.with_suffix(''))],
                    capture_output=True, text=True,
                )
                if r.returncode != 0 or not png.exists():
                    print(f'[FAIL png] {f.name}: {r.stderr.strip()}', file=sys.stderr)
                    continue
            n_ok += 1
        elif f.suffix.lower() in ('.png', '.jpg', '.jpeg'):
            shutil.copy2(f, out_dir / f.name)
            n_ok += 1
        else:
            n_skip += 1
    print(f'转换完成：{n_ok} 个文件 -> {out_dir}（跳过 {n_skip} 个非图片文件）')


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('figs_dir', type=Path)
    ap.add_argument('--id', required=True, help='arXiv ID')
    ap.add_argument('--out', type=Path, default=None)
    ap.add_argument('--force', action='store_true', help='重转已存在的文件')
    args = ap.parse_args()

    if not args.figs_dir.is_dir():
        sys.exit(f'目录不存在: {args.figs_dir}')

    out = args.out or Path(__file__).parent.parent / 'public' / 'figures' / args.id
    convert(args.figs_dir, out, args.force)


if __name__ == '__main__':
    main()
