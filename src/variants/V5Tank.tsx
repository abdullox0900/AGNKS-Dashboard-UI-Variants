import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import { ICONS, MENU } from '../icons'
import { Bars, Gauge } from '../charts'
import { DAYS, MOCK, fmt, short } from '../mock'

const I = ICONS.duotone
const vars = {
  '--bg': '#0a0f16', '--surface': '#101823', '--surface-2': '#152131', '--ink': '#e6edf5', '--ink-2': '#9fb0c3', '--ink-3': '#5b6b80',
  '--border': '#1c2a3b', '--cyan': '#22d3ee', '--lime': '#a3e635', '--amber': '#fbbf24', '--grid': '#172233', '--track': '#172233', '--bad': '#fb7185',
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
} as CSSProperties

/** CNG cylinder filled to `pct` — one per station (share of today's plan). */
function Cylinder({ pct, online }: { pct: number; online: boolean }) {
  const top = 22 + 118 * (1 - pct / 100)
  const id = `cyl-${pct}`
  return (
    <svg viewBox="0 0 64 150" className="h-[128px] w-[54px]">
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0%" stopColor={online ? '#0ea5e9' : '#475569'} />
          <stop offset="100%" stopColor={online ? '#22d3ee' : '#64748b'} />
        </linearGradient>
        <clipPath id={`${id}-c`}><rect x="8" y="22" width="48" height="118" rx="22" /></clipPath>
      </defs>
      <rect x="25" y="4" width="14" height="10" rx="2" fill="#334155" />
      <rect x="20" y="12" width="24" height="7" rx="2" fill="#334155" />
      <rect x="8" y="22" width="48" height="118" rx="22" fill="#172233" />
      <g clipPath={`url(#${id}-c)`}><rect x="8" y={top} width="48" height={140 - top} fill={`url(#${id})`} /></g>
      <rect x="8" y="22" width="48" height="118" rx="22" fill="none" stroke="#2c3c52" strokeWidth="2" />
      <rect x="16" y="34" width="5" height="90" rx="2.5" fill="rgba(255,255,255,.1)" />
    </svg>
  )
}

/** 5 · Tank — industrial dark: stations as CNG cylinders (plan %), pressure gauges, terminal-style log. */
export function V5Tank() {
  return (
    <div style={vars} className="flex min-h-dvh bg-[var(--bg)] text-[var(--ink)]">
      <aside className="sticky top-0 hidden h-dvh w-[230px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] px-3 py-5 lg:flex">
        <div className="mb-6 px-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--lime)]">AGNKS · CNG</p>
          <p className="text-[17px] font-bold">Operatsion panel</p>
        </div>
        {MENU.map((g) => (
          <div key={g.title} className="mb-4">
            <p className="mb-1 px-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[var(--ink-3)]">{g.title}</p>
            {g.items.map((it, i) => {
              const Icon = I[it.icon]
              const active = g.title === "Ko'rish" && i === 0
              return (
                <a key={it.label} className={clsx('flex items-center gap-2.5 rounded-lg border-l-2 px-2.5 py-2 text-[13px] font-medium', active ? 'border-[var(--cyan)] bg-[var(--cyan)]/10 text-[var(--cyan)]' : 'border-transparent text-[var(--ink-2)] hover:bg-white/5')}>
                  <Icon size={18} />
                  <span className="flex-1">{it.label}</span>
                  {it.badge && <span className="font-mono text-[11px] text-[var(--amber)]">{it.badge}</span>}
                </a>
              )
            })}
          </div>
        ))}
      </aside>

      <main className="min-w-0 flex-1 p-5 lg:p-7">
        <header className="flex flex-wrap items-center gap-3">
          <h1 className="flex-1 text-[24px] font-bold">Umumiy holat</h1>
          <span className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-mono text-[12.5px] text-[var(--ink-2)]">
            <span className="h-2 w-2 rounded-full bg-[var(--lime)]" /> Tizim: normal
          </span>
          <button className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[13px] text-[var(--ink-2)]">{MOCK.period} ▾</button>
        </header>

        {/* KPI strip */}
        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-3 xl:grid-cols-6">
          {[
            { l: 'Cheklar', v: fmt(MOCK.kpi.receipts.value), c: 'var(--cyan)' },
            { l: 'Aylanma', v: short(MOCK.kpi.receiptsSum.value), c: 'var(--ink)' },
            { l: 'Metan, m³', v: fmt(MOCK.volumeM3), c: 'var(--lime)' },
            { l: 'Bonus berildi', v: short(MOCK.kpi.bonusIssued.value), c: 'var(--ink)' },
            { l: 'Faol mijoz', v: fmt(MOCK.kpi.activeClients.value), c: 'var(--ink)' },
            { l: 'Tekshiruvda', v: String(MOCK.kpi.pendingReview.value), c: 'var(--amber)' },
          ].map((k) => (
            <div key={k.l} className="bg-[var(--surface)] px-4 py-3.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-3)]">{k.l}</p>
              <p className="tnum mt-1 text-[24px] font-bold" style={{ color: k.c }}>{k.v}</p>
            </div>
          ))}
        </div>

        {/* stations as tanks */}
        <section className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold">Shoxobchalar · kunlik reja bajarilishi</h2>
            <span className="font-mono text-[12px] text-[var(--ink-3)]">bosim · navbat · reja</span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            {MOCK.stations.map((s) => (
              <div key={s.name} className="flex items-center gap-3 rounded-xl bg-[var(--surface-2)] p-3">
                <Cylinder pct={s.planPct} online={s.online} />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-tight">{s.name.split('—')[1]?.trim() ?? s.name}</p>
                  <p className={clsx('mt-0.5 text-[11px] font-bold uppercase', s.online ? 'text-[var(--lime)]' : 'text-[var(--bad)]')}>{s.online ? 'onlayn' : 'oflayn'}</p>
                  <p className="tnum mt-2 text-[22px] font-bold leading-none text-[var(--cyan)]">{s.planPct}%</p>
                  <p className="mt-1 font-mono text-[11px] text-[var(--ink-3)]">{s.pressure} bar · {s.queue} mash.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr_1.1fr]">
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-[15px] font-semibold">Bonus byudjeti</h2>
            <div className="mt-3 flex flex-col items-center">
              <Gauge value={MOCK.kpi.bonusSpent.value / MOCK.kpi.bonusIssued.value} color="#a3e635" />
              <p className="tnum -mt-6 text-[26px] font-bold">{Math.round((MOCK.kpi.bonusSpent.value / MOCK.kpi.bonusIssued.value) * 100)}%</p>
              <p className="text-[12.5px] text-[var(--ink-3)]">berilgan bonusdan yechildi</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[12px]">
              <div className="rounded-lg bg-[var(--surface-2)] px-3 py-2"><span className="text-[var(--ink-3)]">+ berildi</span><p className="text-[15px] font-bold text-[var(--lime)]">{short(MOCK.kpi.bonusIssued.value)}</p></div>
              <div className="rounded-lg bg-[var(--surface-2)] px-3 py-2"><span className="text-[var(--ink-3)]">− yechildi</span><p className="text-[15px] font-bold">{short(MOCK.kpi.bonusSpent.value)}</p></div>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="mb-4 text-[15px] font-semibold">Cheklar, kunlar bo'yicha</h2>
            <Bars data={MOCK.receiptsByDay} labels={DAYS} color="#22d3ee" muted="#1c3346" activeIndex={6} height={200} />
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[#070b10] p-5 font-mono">
            <h2 className="mb-3 flex items-center justify-between font-sans text-[15px] font-semibold">
              Hodisalar jurnali <span className="text-[11px] text-[var(--ink-3)]">tail -f</span>
            </h2>
            <div className="space-y-1.5 text-[12.5px] leading-relaxed">
              {MOCK.alerts.map((a) => (
                <p key={a.text}>
                  <span className="text-[var(--ink-3)]">[{a.time}]</span>{' '}
                  <span className={a.kind === 'station' || a.kind === 'large' ? 'text-[var(--bad)]' : 'text-[var(--amber)]'}>{a.kind === 'station' || a.kind === 'large' ? 'WARN' : 'INFO'}</span>{' '}
                  <span className="text-[var(--ink-2)]">{a.text}</span>
                </p>
              ))}
              {MOCK.recent.slice(0, 3).map((r) => (
                <p key={r.client + r.time}>
                  <span className="text-[var(--ink-3)]">[{r.time}]</span> <span className="text-[var(--lime)]">OK</span>{' '}
                  <span className="text-[var(--ink-2)]">chek {fmt(r.amount)} → +{fmt(r.bonus)} bonus</span>
                </p>
              ))}
              <p className="text-[var(--cyan)]">▋</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
