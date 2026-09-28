import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import { ICONS, MENU } from '../icons'
import { AreaChart, Heatmap, Sparkline } from '../charts'
import { DAYS, MOCK, fmt, short } from '../mock'
import { STATUS } from './V1Classic'

const I = ICONS.lucideBold
const vars = {
  '--bg': '#f4f2ee', '--surface': '#ffffff', '--ink': '#171512', '--ink-2': '#57534e', '--ink-3': '#a8a29e', '--border': '#e7e5e4',
  '--primary': '#0891b2', '--amber': '#f59e0b', '--dark': '#1c1917', '--grid': '#eeeae4', '--track': '#f0ece6', '--bad': '#e11d48',
  fontFamily: "'Outfit', system-ui, sans-serif",
} as CSSProperties

const tile = 'rounded-[26px] p-5'

/** 4 · Bento — floating pill menu, everything as tiles of different sizes, hours heatmap, methane price. */
export function V4Bento() {
  const items = MENU.flatMap((g) => g.items).slice(0, 6)
  return (
    <div style={vars} className="min-h-dvh bg-[var(--bg)] px-5 py-5 text-[var(--ink)] lg:px-8">
      <header className="mx-auto flex max-w-[1360px] flex-wrap items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--dark)] text-[var(--amber)]"><I.flame size={22} /></span>
        <nav className="no-scrollbar flex flex-1 gap-1 overflow-x-auto rounded-full bg-[var(--surface)] p-1.5">
          {items.map((it, i) => (
            <a key={it.label} className={clsx('flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-medium', i === 0 ? 'bg-[var(--dark)] text-white' : 'text-[var(--ink-2)]')}>
              {it.label}
              {it.badge && <span className="rounded-full bg-[var(--bad)] px-1.5 text-[10.5px] font-bold text-white">{it.badge}</span>}
            </a>
          ))}
        </nav>
        <button className="flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2.5 text-[13.5px] font-medium"><I.calendar size={16} /> {MOCK.period}</button>
      </header>

      <div className="mx-auto mt-5 grid max-w-[1360px] auto-rows-[minmax(120px,auto)] grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        {/* big revenue */}
        <section className={`${tile} col-span-2 row-span-2 flex flex-col bg-[var(--dark)] text-white md:col-span-4 xl:col-span-3`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] text-white/60">Cheklar summasi · 7 kun</p>
              <p className="tnum mt-1 text-[40px] font-bold leading-none tracking-tight">{short(MOCK.kpi.receiptsSum.value)} <span className="text-[18px] text-white/50">so'm</span></p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-[var(--amber)] px-3 py-1 text-[12.5px] font-bold text-[var(--dark)]"><I.up size={14} /> {MOCK.kpi.receiptsSum.delta}%</span>
          </div>
          <div className="mt-4 min-h-[180px] flex-1">
            <AreaChart data={MOCK.sumByDay} labels={DAYS} color="#f59e0b" grid="rgba(255,255,255,.08)" label="rgba(255,255,255,.45)" />
          </div>
        </section>

        {/* receipts */}
        <section className={`${tile} bg-[var(--surface)] xl:col-span-1`}>
          <I.receipt size={22} className="text-[var(--primary)]" />
          <p className="mt-3 text-[12.5px] text-[var(--ink-3)]">Cheklar</p>
          <p className="tnum text-[28px] font-bold leading-tight">{fmt(MOCK.kpi.receipts.value)}</p>
          <div className="mt-1 h-8"><Sparkline data={MOCK.kpi.receipts.series} color="var(--primary)" /></div>
        </section>

        {/* price */}
        <section className={`${tile} bg-[var(--amber)] text-[var(--dark)] xl:col-span-2`}>
          <div className="flex items-center justify-between">
            <I.fuel size={24} />
            <span className="rounded-full bg-black/10 px-2.5 py-1 text-[11.5px] font-bold">bugun</span>
          </div>
          <p className="mt-3 text-[13px] font-medium opacity-70">Metan narxi</p>
          <p className="tnum text-[32px] font-bold leading-none">{fmt(MOCK.pricePerM3)} <span className="text-[15px] font-semibold opacity-60">so'm/m³</span></p>
          <p className="mt-1 text-[12.5px] opacity-70">{fmt(MOCK.volumeM3)} m³ sotildi · 7 kun</p>
        </section>

        {/* clients */}
        <section className={`${tile} bg-[var(--surface)]`}>
          <I.clients size={22} className="text-[var(--primary)]" />
          <p className="mt-3 text-[12.5px] text-[var(--ink-3)]">Faol mijozlar</p>
          <p className="tnum text-[28px] font-bold leading-tight">{fmt(MOCK.kpi.activeClients.value)}</p>
          <p className="text-[12px] font-semibold text-emerald-600">+{MOCK.kpi.activeClients.delta}%</p>
        </section>

        {/* review */}
        <section className={`${tile} bg-[var(--primary)] text-white`}>
          <I.review size={22} />
          <p className="mt-3 text-[12.5px] text-white/75">Tekshiruv</p>
          <p className="tnum text-[28px] font-bold leading-tight">{MOCK.kpi.pendingReview.value}</p>
          <p className="text-[12px] text-white/80">chek kutmoqda →</p>
        </section>

        {/* bonus */}
        <section className={`${tile} bg-[var(--surface)] xl:col-span-2`}>
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold">Bonus oqimi</p>
            <I.bonus size={20} className="text-[var(--ink-3)]" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[var(--track)] p-3">
              <p className="text-[12px] text-[var(--ink-3)]">Berildi</p>
              <p className="tnum text-[19px] font-bold text-emerald-600">+{short(MOCK.kpi.bonusIssued.value)}</p>
            </div>
            <div className="rounded-2xl bg-[var(--track)] p-3">
              <p className="text-[12px] text-[var(--ink-3)]">Yechildi</p>
              <p className="tnum text-[19px] font-bold">−{short(MOCK.kpi.bonusSpent.value)}</p>
            </div>
          </div>
        </section>

        {/* heatmap */}
        <section className={`${tile} col-span-2 bg-[var(--surface)] md:col-span-4 xl:col-span-4`}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[15px] font-semibold">Qaysi soatlarda ko'p quyishadi</p>
              <p className="text-[12.5px] text-[var(--ink-3)]">Cheklar soni · hafta kunlari × soatlar</p>
            </div>
            <span className="rounded-full bg-[var(--track)] px-3 py-1 text-[12px] font-semibold text-[var(--ink-2)]">Cho'qqi: 18:00–19:00</span>
          </div>
          <Heatmap rows={MOCK.heat} rowLabels={DAYS} color="#0891b2" />
        </section>

        {/* promotions */}
        <section className={`${tile} col-span-2 bg-[var(--surface)]`}>
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold">Aksiyalar</p>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--dark)] text-white"><I.plus size={16} /></button>
          </div>
          <div className="mt-3 space-y-2.5">
            {MOCK.promotions.map((p) => (
              <div key={p.name} className="flex items-center gap-3 rounded-2xl bg-[var(--track)] px-3 py-2.5">
                <span className="text-[20px] font-bold text-[var(--amber)]">{p.percent}%</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold">{p.name}</p>
                  <p className="truncate text-[11.5px] text-[var(--ink-3)]">{p.until} gacha</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* recent */}
        <section className={`${tile} col-span-2 bg-[var(--surface)] md:col-span-4 xl:col-span-6`}>
          <p className="mb-3 text-[15px] font-semibold">So'nggi cheklar</p>
          <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {MOCK.recent.map((r) => (
              <div key={r.client + r.time} className="flex items-center gap-3 rounded-2xl border border-[var(--border)] px-3.5 py-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--track)] text-[13px] font-bold">{r.client[0]}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold">{r.client}</p>
                  <p className="truncate text-[11.5px] text-[var(--ink-3)]">{r.station}</p>
                </div>
                <div className="text-right">
                  <p className="tnum text-[13.5px] font-bold">{short(r.amount)}</p>
                  <span className={clsx('rounded-full px-2 py-0.5 text-[10.5px] font-semibold', STATUS[r.status].cls)}>{STATUS[r.status].label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
