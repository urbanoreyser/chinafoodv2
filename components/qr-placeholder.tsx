// Decorative QR-like placeholder (deterministic pattern from a seed string)
// Useful for demos and mockups — not a scannable code.

function hashString(input: string) {
  let h = 5381
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function QrPlaceholder({
  seed = "fuyao",
  className,
  fg = "#0F172A",
  bg = "#FFFFFF",
}: {
  seed?: string
  className?: string
  fg?: string
  bg?: string
}) {
  const SIZE = 25
  const rng = mulberry32(hashString(seed))
  const cells: boolean[][] = []
  for (let r = 0; r < SIZE; r++) {
    const row: boolean[] = []
    for (let c = 0; c < SIZE; c++) {
      row.push(rng() > 0.5)
    }
    cells.push(row)
  }

  // Force the three locator squares (top-left, top-right, bottom-left)
  const isLocator = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7
    return inBox(0, 0) || inBox(0, SIZE - 7) || inBox(SIZE - 7, 0)
  }

  const isLocatorRing = (r: number, c: number) => {
    const inOuter = (br: number, bc: number) => {
      if (r === br || r === br + 6) return c >= bc && c <= bc + 6
      if (c === bc || c === bc + 6) return r >= br && r <= br + 6
      return false
    }
    const inInner = (br: number, bc: number) =>
      r >= br + 2 && r <= br + 4 && c >= bc + 2 && c <= bc + 4

    const positions: [number, number][] = [
      [0, 0],
      [0, SIZE - 7],
      [SIZE - 7, 0],
    ]
    return positions.some(([br, bc]) => inOuter(br, bc) || inInner(br, bc))
  }

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Código QR demo"
      shapeRendering="crispEdges"
    >
      <rect width={SIZE} height={SIZE} fill={bg} />
      {cells.map((row, r) =>
        row.map((on, c) => {
          if (isLocator(r, c)) {
            return isLocatorRing(r, c) ? (
              <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={fg} />
            ) : null
          }
          return on ? (
            <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={fg} />
          ) : null
        }),
      )}
    </svg>
  )
}
