import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import { ICONS, MENU, type IconName } from '../icons'
import { AreaChart, Bars, Sparkline } from '../charts'
import { DAYS, MOCK, fmt, short, type RecentStatus } from '../mock'

const I = ICONS.lucide
const vars = {
  '--bg': '#f4f6fb', '--surface': '#ffffff', '--ink': '#0f172a', '--ink-2': '#475569', '--ink-3': '#94a3b8', '--border': '#e6eaf1',
  '--primary': '#2563eb', '--primary-soft': '#eaf0ff', '--grid': '#e8edf4', '--track': '#e8edf4', '--good': '#059669', '--bad': '#dc2626',
  fontFamily: "'Inter', system-ui, sans-serif",
} as CSSProperties

const KPIS: { key: keyof typeof MOCK.kpi; label: string; icon: IconName; money?: boolean; invert?: boolean }[] = [
  { key: 'receipts', label: 'Cheklar', icon: 'receipt' },
  { key: 'receiptsSum', label: 'Cheklar summasi', icon: 'wallet', money: true },
  { key: 'activeClients', label: 'Faol mijozlar', icon: 'clients' },
  { key: 'pendingReview', label: 'Tekshiruv kutilmoqda', icon: 'review', invert: true },
  { key: 'bonusIssued', label: 'Berilgan bonus', icon: 'bonus', money: true },
  { key: 'bonusSpent', label: 'Yechilgan bonus', icon: 'flame', money: true },
]

export const STATUS: Record<RecentStatus, { label: string; cls: string }> = {
  applied: { label: 'Tushdi', cls: 'bg-emerald-50 text-emerald-700' },
  review: { label: 'Tekshiruvda', cls: 'bg-amber-50 text-amber-700' },
  large: { label: 'Katta chek', cls: 'bg-rose-50 text-rose-700' },
}

/** 1 · Classic — close to today's dashboard, refined: grouped sidebar, KPI cards with sparklines, area + bars, table. */
export function V1Classic() {
  return (
    <div style={vars} className="flex min-h-dvh bg-[var(--bg)] text-[var(--ink)]">
      <aside className="sticky top-0 hidden h-dvh w-[248px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] px-3 py-5 lg:flex">
        <div className="mb-6 flex items-center gap-2.5 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
            <I.flame size={19} />
          </span>
          <div>
            <p className="text-[15px] font-bold leading-tight">AGNKS</p>
            <p className="text-[11.5px] text-[var(--ink-3)]">Rahbarlar paneli</p>
          </div>
        </div>
        <nav className="flex-1 space-y-5 overflow-y-auto">
          {MENU.map((g) => (
            <div key={g.title}>
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-3)]">{g.title}</p>
              {g.items.map((it, idx) => {
                const Icon = I[it.icon]
                const active = g.title === "Ko'rish" && idx === 0
                return (
                  <a key={it.label} className={clsx('flex items-center gap-3 rounded-xl px-3 py-2 text-[13.5px] font-medium', active ? 'bg-[var(--primary-soft)] text-[var(--primary)]' : 'text-[var(--ink-2)] hover:bg-slate-50')}>
                    <Icon size={18} />
                    <span className="flex-1">{it.label}</span>
                    {it.badge && <span className="rounded-full bg-[var(--bad)] px-1.5 text-[11px] font-bold text-white">{it.badge}</span>}
                  </a>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)]/90 px-6 py-3 backdrop-blur">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-xl bg-[var(--bg)] px-3 text-[13.5px] text-[var(--ink-3)] md:max-w-[340px]">
            <I.search size={17} /> Mijoz, chek yoki kassir qidirish…
          </div>
          <button className="hidden items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-[13px] font-medium md:flex">
            <I.pin size={16} /> Barcha filiallar <I.chevronDown size={15} />
          </button>
          <button className="hidden items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-[13px] font-medium md:flex">
            <I.calendar size={16} /> {MOCK.period} <I.chevronDown size={15} />
          </button>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)]">
            <I.bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--bad)]" />
          </button>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-[14px] font-bold text-white">R</span>
        </header>

        <div className="space-y-5 p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-bold">Bosh sahifa</h1>
              <p className="text-[13.5px] text-[var(--ink-3)]">Oxirgi 7 kun bo'yicha umumiy ko'rinish</p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-[13.5px] font-semibold text-white">
              <I.download size={16} /> Hisobot
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {KPIS.map((k) => {
              const d = MOCK.kpi[k.key]
              const Icon = I[k.icon]
              const good = k.invert ? d.delta < 0 : d.delta > 0
              return (
                <div key={k.key} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] font-medium text-[var(--ink-2)]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-[var(--primary)]">
                        <Icon size={17} />
                      </span>
                      {k.label}
                    </span>
                    <span className={clsx('flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[12px] font-semibold', good ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700')}>
                      {d.delta > 0 ? <I.up size={13} /> : <I.down size={13} />} {Math.abs(d.delta)}%
                    </span>
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="tnum text-[26px] font-bold leading-none">{k.money ? short(d.value) : fmt(d.value)}{k.money && <span className="ml-1 text-[13px] font-medium text-[var(--ink-3)]">so'm</span>}</p>
                    <div className="h-9 w-24">
                      <Sparkline data={d.series} color={good ? 'var(--primary)' : 'var(--bad)'} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 xl:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-[15px] font-semibold">Kunlik cheklar</h2>
                  <p className="text-[12.5px] text-[var(--ink-3)]">Cheklar soni, oxirgi 7 kun</p>
                </div>
                <div className="flex rounded-lg bg-[var(--bg)] p-0.5 text-[12px] font-medium">
                  {['Kun', 'Hafta', 'Oy'].map((t, i) => (
                    <span key={t} className={clsx('rounded-md px-2.5 py-1', i === 0 ? 'bg-[var(--surface)] shadow-sm' : 'text-[var(--ink-3)]')}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="h-[230px]">
                <AreaChart data={MOCK.receiptsByDay} labels={DAYS} />
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="text-[15px] font-semibold">Diqqat talab qiladi</h2>
              <div className="mt-3 divide-y divide-[var(--border)]">
                {MOCK.alerts.map((a) => (
                  <div key={a.text} className="flex items-center gap-3 py-2.5">
                    <span className={clsx('flex h-8 w-8 items-center justify-center rounded-lg', a.kind === 'large' || a.kind === 'station' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600')}>
                      <I.alert size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">{a.text}</p>
                      <p className="text-[11.5px] text-[var(--ink-3)]">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="mt-4 text-[13px] font-semibold text-[var(--ink-2)]">Faol aksiyalar</h3>
              {MOCK.promotions.map((p) => (
                <div key={p.name} className="mt-2 rounded-xl bg-[var(--bg)] px-3 py-2.5">
                  <div className="flex justify-between text-[13px] font-medium">
                    <span>{p.name}</span>
                    <span className="text-[var(--primary)]">{p.percent}%</span>
                  </div>
                  <p className="text-[11.5px] text-[var(--ink-3)]">{p.scope} · {p.until} gacha</p>
                </div>
              ))}
            </section>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="mb-4 text-[15px] font-semibold">Filiallar bo'yicha cheklar</h2>
              <Bars data={MOCK.stations.map((s) => s.receipts)} labels={MOCK.stations.map((s) => s.name.split('—')[1]?.trim() ?? s.name)} activeIndex={0} />
            </section>
            <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] xl:col-span-2">
              <div className="flex items-center justify-between px-5 pt-5">
                <h2 className="text-[15px] font-semibold">So'nggi cheklar</h2>
                <span className="text-[13px] font-medium text-[var(--primary)]">Barchasi</span>
              </div>
              <table className="mt-3 w-full text-[13px]">
                <thead className="bg-[var(--bg)] text-left text-[11.5px] uppercase tracking-wide text-[var(--ink-3)]">
                  <tr>
                    <th className="px-5 py-2 font-semibold">Mijoz</th>
                    <th className="hidden px-3 py-2 font-semibold md:table-cell">Filial</th>
                    <th className="px-3 py-2 text-right font-semibold">Summa</th>
                    <th className="px-3 py-2 text-right font-semibold">Bonus</th>
                    <th className="px-5 py-2 text-right font-semibold">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {MOCK.recent.map((r) => (
                    <tr key={r.client + r.time}>
                      <td className="px-5 py-2.5 font-medium">{r.client}<span className="block text-[11.5px] font-normal text-[var(--ink-3)]">{r.time}</span></td>
                      <td className="hidden px-3 py-2.5 text-[var(--ink-2)] md:table-cell">{r.station}</td>
                      <td className="tnum px-3 py-2.5 text-right">{fmt(r.amount)}</td>
                      <td className="tnum px-3 py-2.5 text-right text-[var(--good)]">+{fmt(r.bonus)}</td>
                      <td className="px-5 py-2.5 text-right"><span className={clsx('rounded-full px-2 py-0.5 text-[11.5px] font-semibold', STATUS[r.status].cls)}>{STATUS[r.status].label}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
