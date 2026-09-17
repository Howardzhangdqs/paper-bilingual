/**
 * 同名 .png 位图替身的全局探测/解码缓存：
 * Figure 缩略图进入视口后预热（加载并解码），Lightbox 打开时同步查询
 * 是否就绪——就绪则飞入动画直接用位图（GPU 缩放），避免合成层里对
 * 复杂 SVG 反复重光栅化造成的掉帧。
 */
const inflight = new Map<string, Promise<boolean>>()
const ready = new Map<string, boolean>()

function pngOf(src: string): string {
  return src.replace(/\.svg$/, '.png')
}

/** 探测并解码位图替身；同一 src 全局只探测一次 */
export function prewarmRaster(src: string): Promise<boolean> {
  const png = pngOf(src)
  if (!inflight.has(png)) {
    inflight.set(
      png,
      new Promise((resolve) => {
        const img = new Image()
        img.onload = () =>
          img.decode().then(
            () => {
              ready.set(png, true)
              resolve(true)
            },
            () => resolve(false),
          )
        img.onerror = () => resolve(false)
        img.src = png
      }),
    )
  }
  return inflight.get(png)!
}

/** 同步查询位图是否已完成解码（仅探测成功后为 true） */
export function isRasterReady(src: string): boolean {
  return ready.get(pngOf(src)) === true
}
