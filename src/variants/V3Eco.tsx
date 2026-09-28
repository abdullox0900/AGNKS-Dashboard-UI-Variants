import type { CSSProperties } from 'react'
import { clsx } from 'clsx'
import { ICONS, MENU } from '../icons'
import { Bars, Donut } from '../charts'
import { DAYS, MOCK, fmt, short } from '../mock'

const I = ICONS.fill
const vars = {
  '--bg': '#f2f8f4', '--surface': '#ffffff', '--ink': '#0c2a1c', '--ink-2': '#3f5f50', '--ink-3': '#8aa899', '--border': '#dcece3',
  '--primary': '#15803d', '--primary-soft': '#dcfce7', '--teal': '#0d9488', '--grid': '#e3efe8', '--track': '#e7f2ec', '--bad': '#e11d48',
  fontFamily: "'Manrope', system-ui, sans-serif",
} as CSSProperties

/** 3 · Eco — top navigation, green hero with today's results + CO₂ saved, station ranking, payment split. */
export function V3Eco() {
  const top = MENU.flatMap((g) => g.items).slice(0, 7)
  return (
    <div style={vars} className="min-h-dvh bg-[var(--bg)] text-[var(--ink)]">
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center gap-6 px-6">
          <div className="flex items-center gap-2 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-white"><I.leaf size={19} /></span>
            <span className="text-[16px] font-extrabold tracking-tight">AGNKS<span className="text-[var(--primary)]">eco</span></span>
          </div>
          <nav className="no-scrollbar flex flex-1 gap-1 overflow-x-auto">
            {top.map((it, i) => (
              <a key={it.label} className={clsx('relative whitespace-nowrap px-3 py-4 text-[13.5px] font-semibold', i === 0 ? 'text-[var(--primary)]' : 'text-[var(--ink-2)]')}>
                {it.label}
                {it.badge && <span className="ml-1.5 rounded-full bg-[var(--bad)] px-1.5 text-[10.5px] text-white">{it.badge}</span>}
                {i === 0 && <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-[var(--primary)]" />}
              </a>
            ))}
          </nav>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[13px] font-bold text-[var(--primary)]">R</span>
        </div>
      </header>

      <div className="mx-auto max-w-[1320px] space-y-5 px-6 py-6">
        <section className="relative overflow-hidden rounded-[28px] p-7 text-white" style={{ background: 'linear-gradient(120deg, #064e3b 0%, #047857 45%, #10b981 100%)' }}>
          <svg className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 opacity-10" viewBox="0 0 24 24" fill="white">
            <path d="M17 8C8 10 5.9 16.2 3.8 21.3l1.9.7.9-2.3c.5.2 1 .3 1.4.3C19 20 22 3 22 3c-1 2-8 2.3-13 3.3S2 11.5 2 13.5 3.8 17.3 3.8 17.3C7 8 17 8 17 8z" />
          </svg>
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[13px] font-semibold text-white/80">Dushanba, 28 sentyabr · barcha filiallar</p>
              <h1 className="mt-1 text-[30px] font-extrabold leading-tight">Xayrli kun, Root Admin 🌿</h1>
              <p className="mt-1 text-[14px] text-white/85">Bu hafta mijozlar metan tanlab tabiatga katta hissa qo'shdi.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { v: fmt(MOCK.kpi.receipts.value), l: 'chek' },
                { v: short(MOCK.kpi.receiptsSum.value), l: "so'm aylanma" },
                { v: `${fmt(MOCK.volumeM3)} m³`, l: 'metan sotildi' },
                { v: `${fmt(MOCK.co2SavedKg / 1000)} t`, l: 'CO₂ tejaldi' },
              ].map((x) => (
                <div key={x.l} className="min-w-[128px] rounded-2xl bg-white/12 px-4 py-3 backdrop-blur">
                  <p className="tnum text-[22px] font-extrabold leading-none">{x.v}</p>
                  <p className="mt-1 text-[12px] text-white/80">{x.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { l: 'Faol mijozlar', v: fmt(MOCK.kpi.activeClients.value), d: MOCK.kpi.activeClients.delta, icon: 'clients' as const },
            { l: 'Berilgan bonus', v: `${short(MOCK.kpi.bonusIssued.value)} so'm`, d: MOCK.kpi.bonusIssued.delta, icon: 'bonus' as const },
            // fewer receipts waiting for review is good news, so a negative delta is green here
            { l: 'Tekshiruv kutilmoqda', v: fmt(MOCK.kpi.pendingReview.value), d: MOCK.kpi.pendingReview.delta, icon: 'review' as const, invert: true },
          ].map((k) => {
            const Icon = I[k.icon]
            const good = 'invert' in k ? k.d < 0 : k.d > 0
            return (
              <div key={k.l} className="flex items-center gap-4 rounded-3xl bg-[var(--surface)] p-5" style={{ boxShadow: '0 12px 28px -20px rgba(21,128,61,.4)' }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]"><Icon size={24} /></span>
                <div className="flex-1">
                  <p className="text-[13px] text-[var(--ink-3)]">{k.l}</p>
                  <p className="tnum text-[22px] font-extrabold leading-tight">{k.v}</p>
                </div>
                <span className={clsx('rounded-full px-2.5 py-1 text-[12px] font-bold', good ? 'bg-[var(--primary-soft)] text-[var(--primary)]' : 'bg-rose-50 text-[var(--bad)]')}>
                  {k.d > 0 ? '+' : ''}{k.d}%
                </span>
              </div>
            )
          })}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr_1fr]">
          <section className="rounded-3xl bg-[var(--surface)] p-6">
            <h2 className="text-[16px] font-bold">Shoxobchalar reytingi</h2>
            <p className="text-[12.5px] text-[var(--ink-3)]">Cheklar soni va aylanma ulushi</p>
            <div className="mt-4 space-y-3.5">
              {MOCK.stations.map((s, i) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-[13.5px]">
                    <span className="flex items-center gap-2 font-semibold">
                      <span className={clsx('flex h-6 w-6 items-center justify-center rounded-full text-[11.5px] font-bold', i === 0 ? 'bg-[var(--primary)] text-white' : 'bg-[var(--track)] text-[var(--ink-2)]')}>{i + 1}</span>
                      {s.name}
                    </span>
                    <span className="tnum text-[var(--ink-2)]">{fmt(s.receipts)} · {short(s.sum)}</span>
                  </div>
                  <div className="mt-1.5 h-2.5 rounded-full bg-[var(--track)]">
                    <div className="h-full rounded-full" style={{ width: `${s.share * 3}%`, background: 'linear-gradient(90deg,#15803d,#34d399)' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--surface)] p-6">
            <h2 className="text-[16px] font-bold">To'lov turlari</h2>
            <p className="text-[12.5px] text-[var(--ink-3)]">soliq.uz ma'lumotlari bo'yicha</p>
            <div className="mt-4 flex justify-center">
              <Donut parts={[{ value: MOCK.payments.card, color: '#15803d' }, { value: MOCK.payments.cash, color: '#5eead4' }]} size={170}>
                <span className="tnum text-[26px] font-extrabold">{MOCK.payments.card}%</span>
                <span className="text-[12px] text-[var(--ink-3)]">karta</span>
              </Donut>
            </div>
            <div className="mt-4 flex justify-center gap-5 text-[13px]">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#15803d]" /> Karta {MOCK.payments.card}%</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#5eead4]" /> Naqd {MOCK.payments.cash}%</span>
            </div>
          </section>

          <section className="rounded-3xl bg-[var(--surface)] p-6">
            <h2 className="text-[16px] font-bold">Sotilgan metan, ming m³</h2>
            <p className="text-[12.5px] text-[var(--ink-3)]">Kunlar bo'yicha</p>
            <div className="mt-4">
              <Bars data={[12.1, 13.4, 14.2, 13.7, 15.1, 16.2, 14.2]} labels={DAYS} color="#15803d" muted="#bbf7d0" activeIndex={5} height={190} />
            </div>
          </section>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {MOCK.promotions.map((p) => (
            <div key={p.name} className="flex items-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <span className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-[var(--primary)] text-white">
                <span className="text-[18px] font-extrabold leading-none">{p.percent}%</span>
              </span>
              <div className="flex-1">
                <p className="text-[15px] font-bold">{p.name}</p>
                <p className="text-[12.5px] text-[var(--ink-3)]">{p.scope} · {p.until} gacha</p>
                <div className="mt-2 h-1.5 rounded-full bg-[var(--track)]"><div className="h-full rounded-full bg-[var(--teal)]" style={{ width: `${p.progress}%` }} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
