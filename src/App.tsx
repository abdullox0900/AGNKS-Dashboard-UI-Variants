import { useEffect, useState, type ComponentType } from 'react'
import { clsx } from 'clsx'
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'
import { V1Classic } from './variants/V1Classic'
import { V2Command } from './variants/V2Command'
import { V3Eco } from './variants/V3Eco'
import { V4Bento } from './variants/V4Bento'
import { V5Tank } from './variants/V5Tank'

const VARIANTS: { id: number; name: string; tagline: string; swatch: string; Screen: ComponentType }[] = [
  { id: 1, name: 'Classic', tagline: "Hozirgiga yaqin: chap menyu, KPI + kichik grafiklar, jadval. Yorug', ko'k.", swatch: '#2563eb', Screen: V1Classic },
  { id: 2, name: 'Command Center', tagline: "Qorong'u boshqaruv markazi: jonli hisoblagichlar, cheklar oqimi, shoxobchalar holati.", swatch: 'linear-gradient(135deg,#0e1426,#f2b84b)', Screen: V2Command },
  { id: 3, name: 'Eco', tagline: "Tepada menyu, yashil banner: sotilgan m³ metan, tejalgan CO₂, reyting, to'lov turlari.", swatch: 'linear-gradient(135deg,#064e3b,#10b981)', Screen: V3Eco },
  { id: 4, name: 'Bento', tagline: "Turli o'lchamdagi plitkalar, soatlar bo'yicha issiqlik xaritasi, metan narxi.", swatch: 'linear-gradient(135deg,#1c1917,#f59e0b)', Screen: V4Bento },
  { id: 5, name: 'Tank', tagline: "Sanoat uslubi: shoxobchalar metan balloni ko'rinishida, bosim, hodisalar jurnali.", swatch: 'linear-gradient(135deg,#0a0f16,#22d3ee,#a3e635)', Screen: V5Tank },
]

function initial(): number {
  const n = Number(new URLSearchParams(window.location.search).get('v'))
  return n >= 1 && n <= VARIANTS.length ? n : 1
}

/**
 * Dashboard UI-variant showcase — each variant is a full dashboard home page (mock data).
 * A floating switcher at the bottom picks between them; ?v=N makes a variant shareable.
 */
export default function App() {
  const [id, setId] = useState(initial)
  const [info, setInfo] = useState(false)
  const v = VARIANTS[id - 1]

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('v', String(id))
    window.history.replaceState(null, '', url)
    window.scrollTo(0, 0)
  }, [id])

  const step = (d: number) => setId((cur) => ((cur - 1 + d + VARIANTS.length) % VARIANTS.length) + 1)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <v.Screen key={v.id} />

      <div className="fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-3" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {info && (
          <div className="w-full max-w-[520px] rounded-2xl bg-black/85 p-4 text-white shadow-2xl backdrop-blur">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50">AGNKS Dashboard · dizayn variantlari</p>
            <p className="mt-1 text-[16px] font-bold">{v.id}. {v.name}</p>
            <p className="mt-0.5 text-[13.5px] text-white/80">{v.tagline}</p>
            <p className="mt-2 text-[11.5px] text-white/45">Ma'lumotlar namunaviy (mock). ← → tugmalari bilan almashtirish mumkin.</p>
          </div>
        )}
        <div className="flex items-center gap-1 rounded-full bg-black/85 p-1.5 text-white shadow-2xl backdrop-blur">
          <button onClick={() => step(-1)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15" aria-label="Oldingi">
            <ChevronLeft size={18} />
          </button>
          {VARIANTS.map((item) => (
            <button
              key={item.id}
              onClick={() => setId(item.id)}
              className={clsx('flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition', item.id === id ? 'bg-white text-black' : 'text-white/75 hover:bg-white/10')}
            >
              <span className="h-4 w-4 shrink-0 rounded-full border border-white/30" style={{ background: item.swatch }} />
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">{item.id}</span>
            </button>
          ))}
          <button onClick={() => step(1)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15" aria-label="Keyingi">
            <ChevronRight size={18} />
          </button>
          <button onClick={() => setInfo((s) => !s)} className={clsx('flex h-9 w-9 items-center justify-center rounded-full', info ? 'bg-white/20' : 'hover:bg-white/15')} aria-label="Tavsif">
            <Info size={17} />
          </button>
        </div>
      </div>
    </>
  )
}
