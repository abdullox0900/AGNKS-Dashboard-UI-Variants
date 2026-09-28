import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import { ICONS, MENU } from '../icons'
import { AreaChart, Sparkline } from '../charts'
import { DAYS, MOCK, fmt, short } from '../mock'

const I = ICONS.light
const vars = {
  '--bg': '#070b16', '--surface': '#0e1426', '--surface-2': '#131b33', '--ink': '#eef2ff', '--ink-2': '#a9b3cf', '--ink-3': '#5f6a8a',
  '--border': '#1c2542', '--primary': '#f2b84b', '--cyan': '#22d3ee', '--grid': '#1a2340', '--track': '#1a2340', '--good': '#34d399', '--bad': '#fb7185',
  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
} as CSSProperties

/** 2 · Command Center — dark ops room: icon rail, LIVE counters, big chart, live receipt feed, station status. */
export function V2Command() {
  const items = MENU.flatMap((g) => g.items)
  const counters = [
    { label: 'Bugun cheklar', value: fmt(244), sub: '+14% kechagiga', color: 'var(--cyan)', series: MOCK.kpi.receipts.series },
    { label: 'Bugun summa', value: `${short(86_500_000)}`, sub: "so'm", color: 'var(--primary)', series: MOCK.kpi.receiptsSum.series },
    { label: 'Sotilgan metan', value: `${fmt(14_180)} m³`, sub: 'bugun', color: 'var(--good)', series: [11, 12, 13, 12, 14, 13, 14] },
    { label: 'Tekshiruvda', value: '7', sub: 'chek', color: 'var(--bad)', series: MOCK.kpi.pendingReview.series },
  ]

  return (
    <div style={vars} className="flex min-h-dvh bg-[var(--bg)] text-[var(--ink)]">
      <aside className="sticky top-0 hidden h-dvh w-[72px] shrink-0 flex-col items-center gap-1.5 border-r border-[var(--border)] bg-[var(--surface)] py-4 md:flex">
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-[#1a1406]" style={{ background: 'linear-gradient(135deg,#f2b84b,#f59e0b)' }}>
          <I.flame size={24} />
        </span>
        {items.map((it, i) => {
          const Icon = I[it.icon]
          return (
            <a key={it.label} title={it.label} className={clsx('relative flex h-11 w-11 items-center justify-center rounded-xl', i === 0 ? 'bg-[var(--primary)]/15 text-[var(--primary)]' : 'text-[var(--ink-3)] hover:bg-white/5 hover:text-[var(--ink)]')}>
              <Icon size={22} />
              {it.badge && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--bad)]" />}
            </a>
          )
        })}
      </aside>

      <main className="min-w-0 flex-1 p-5 lg:p-7">
        <header className="flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-3)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--good)] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--good)]" />
              </span>
              Jonli · 12:41
            </p>
            <h1 className="mt-1 text-[26px] font-bold">Boshqaruv markazi</h1>
          </div>
          {['Barcha filiallar', MOCK.period].map((f) => (
            <button key={f} className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[13px] font-medium text-[var(--ink-2)]">
              {f} <I.chevronDown size={15} />
            </button>
          ))}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-2)] text-[14px] font-bold text-[var(--primary)]">R</span>
        </header>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {counters.map((c) => (
            <div key={c.label} className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-[12.5px] text-[var(--ink-3)]">{c.label}</p>
              <p className="tnum mt-1 text-[28px] font-bold leading-none" style={{ color: c.color }}>{c.value}</p>
              <p className="mt-1 text-[12px] text-[var(--ink-2)]">{c.sub}</p>
              <div className="absolute inset-x-0 bottom-0 h-12 opacity-80">
                <Sparkline data={c.series} color={c.color} height={48} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[15px] font-semibold">Cheklar summasi, mln so'm</h2>
                <span className="rounded-lg bg-[var(--surface-2)] px-2.5 py-1 text-[12px] text-[var(--ink-2)]">Jami {short(MOCK.kpi.receiptsSum.value)}</span>
              </div>
              <div className="h-[260px]">
                <AreaChart data={MOCK.sumByDay} labels={DAYS} color="var(--primary)" />
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="mb-3 text-[15px] font-semibold">Shoxobchalar holati</h2>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {MOCK.stations.map((s) => (
                  <div key={s.name} className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3.5">
                    <div className="flex items-center justify-between">
                      <span className={clsx('flex items-center gap-1.5 text-[11.5px] font-semibold', s.online ? 'text-[var(--good)]' : 'text-[var(--bad)]')}>
                        <span className={clsx('h-1.5 w-1.5 rounded-full', s.online ? 'bg-[var(--good)]' : 'bg-[var(--bad)]')} />
                        {s.online ? 'Onlayn' : 'Oflayn'}
                      </span>
                      <span className="flex items-center gap-1 text-[11.5px] text-[var(--ink-3)]"><I.car size={14} /> {s.queue}</span>
                    </div>
                    <p className="mt-2 truncate text-[13.5px] font-semibold">{s.name}</p>
                    <div className="mt-2 flex items-center justify-between text-[12px] text-[var(--ink-2)]">
                      <span>{fmt(s.receipts)} chek</span>
                      <span className="text-[var(--cyan)]">{s.pressure} bar</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="flex items-center justify-between text-[15px] font-semibold">
                Jonli cheklar <span className="text-[11.5px] font-medium text-[var(--ink-3)]">oxirgi 20 daq</span>
              </h2>
              <div className="mt-3 space-y-2.5">
                {MOCK.recent.map((r) => (
                  <div key={r.client + r.time} className="flex items-center gap-3">
                    <span className={clsx('flex h-9 w-9 items-center justify-center rounded-xl', r.status === 'large' ? 'bg-[var(--bad)]/15 text-[var(--bad)]' : r.status === 'review' ? 'bg-[var(--primary)]/15 text-[var(--primary)]' : 'bg-[var(--cyan)]/12 text-[var(--cyan)]')}>
                      <I.flame size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">{r.client}</p>
                      <p className="truncate text-[11.5px] text-[var(--ink-3)]">{r.station} · {r.time}</p>
                    </div>
                    <span className="tnum text-[13px] font-semibold">{short(r.amount)}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--bad)]/30 bg-[var(--bad)]/5 p-5">
              <h2 className="flex items-center gap-2 text-[15px] font-semibold text-[var(--bad)]"><I.alert size={18} /> Diqqat</h2>
              <ul className="mt-2 space-y-1.5 text-[13px] text-[var(--ink-2)]">
                {MOCK.alerts.map((a) => (
                  <li key={a.text} className="flex justify-between gap-3">
                    <span>{a.text}</span>
                    <span className="shrink-0 text-[11.5px] text-[var(--ink-3)]">{a.time}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}
