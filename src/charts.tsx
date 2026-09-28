import { useId } from 'react'

/** Small, dependency-free SVG charts. Colours come from CSS vars / props so every variant can theme them. */

export function Sparkline({ data, color = 'var(--primary)', height = 36, fill = true }: { data: number[]; color?: string; height?: number; fill?: boolean }) {
  const id = useId()
  const w = 120
  const min = Math.min(...data)
  const max = Math.max(...data)
  const pts = data.map((d, i) => [(i / (data.length - 1)) * w, height - 3 - ((d - min) / (max - min || 1)) * (height - 6)])
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={`${line} L${w} ${height} L0 ${height}Z`} fill={`url(#${id})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** Smooth area chart with gridlines and x labels. */
export function AreaChart({
  data,
  labels,
  color = 'var(--primary)',
  height = 220,
  grid = 'var(--grid)',
  label = 'var(--ink-3)',
  highlightLast = true,
}: {
  data: number[]
  labels: string[]
  color?: string
  height?: number
  grid?: string
  label?: string
  highlightLast?: boolean
}) {
  const id = useId()
  const w = 600
  const pad = { t: 12, b: 26, l: 8, r: 8 }
  const max = Math.max(...data) * 1.15
  const x = (i: number) => pad.l + (i / (data.length - 1)) * (w - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - v / max) * (height - pad.t - pad.b)
  const pts = data.map((d, i) => [x(i), y(d)])
  // Catmull-Rom → cubic bezier for a smooth line
  let line = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    line += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6}, ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6}, ${p2[0]} ${p2[1]}`
  }
  const last = pts[pts.length - 1]
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-full w-full" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={pad.l} x2={w - pad.r} y1={pad.t + g * (height - pad.t - pad.b)} y2={pad.t + g * (height - pad.t - pad.b)} stroke={grid} strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${line} L${last[0]} ${height - pad.b} L${pts[0][0]} ${height - pad.b}Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {highlightLast && <circle cx={last[0]} cy={last[1]} r="5" fill={color} stroke="var(--surface)" strokeWidth="3" vectorEffect="non-scaling-stroke" />}
      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={height - 6} textAnchor="middle" fontSize="12" fill={label}>
          {l}
        </text>
      ))}
    </svg>
  )
}

/** Vertical bars with labels under them. */
export function Bars({ data, labels, color = 'var(--primary)', muted = 'var(--track)', height = 180, activeIndex }: { data: number[]; labels: string[]; color?: string; muted?: string; height?: number; activeIndex?: number }) {
  const max = Math.max(...data)
  return (
    <div className="flex h-full items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
          <div className="w-full rounded-t-lg transition-all" style={{ height: `${(d / max) * 82}%`, background: activeIndex === undefined || activeIndex === i ? color : muted }} />
          <span className="text-[11px] text-[var(--ink-3)]">{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}

/** Donut with slices; centre content supplied by the caller. */
export function Donut({ parts, size = 150, thickness = 18, children }: { parts: { value: number; color: string }[]; size?: number; thickness?: number; children?: React.ReactNode }) {
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const total = parts.reduce((s, p) => s + p.value, 0)
  let offset = 0
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--track)" strokeWidth={thickness} />
        {parts.map((p, i) => {
          const len = (p.value / total) * c
          const el = (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={p.color} strokeWidth={thickness} strokeDasharray={`${len - 3} ${c}`} strokeDashoffset={-offset} strokeLinecap="round" />
          )
          offset += len
          return el
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

/** 7 × 24 heatmap. */
export function Heatmap({ rows, rowLabels, color }: { rows: number[][]; rowLabels: string[]; color: string }) {
  const max = Math.max(...rows.flat())
  return (
    <div className="space-y-1">
      {rows.map((row, r) => (
        <div key={r} className="flex items-center gap-1">
          <span className="w-6 shrink-0 text-[10.5px] text-[var(--ink-3)]">{rowLabels[r]}</span>
          {row.map((v, h) => (
            <span key={h} className="h-4 flex-1 rounded-[3px]" style={{ background: color, opacity: 0.08 + (v / max) * 0.92 }} title={`${rowLabels[r]} ${h}:00 — ${v} chek`} />
          ))}
        </div>
      ))}
      <div className="flex gap-1 pl-7 text-[10px] text-[var(--ink-3)]">
        {Array.from({ length: 24 }).map((_, h) => (
          <span key={h} className="flex-1 text-center">{h % 6 === 0 ? h : ''}</span>
        ))}
      </div>
    </div>
  )
}

/** Semicircle gauge (0–1). */
export function Gauge({ value, color, track = 'var(--track)', size = 160 }: { value: number; color: string; track?: string; size?: number }) {
  const r = 70
  const len = Math.PI * r
  return (
    <svg viewBox="0 0 160 90" style={{ width: size }}>
      <path d="M10 80 A70 70 0 0 1 150 80" fill="none" stroke={track} strokeWidth="12" strokeLinecap="round" />
      <path d="M10 80 A70 70 0 0 1 150 80" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${len * value} ${len}`} />
    </svg>
  )
}
