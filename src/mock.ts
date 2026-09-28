/** Static demo data for the dashboard mockups — nothing here talks to a backend. */

export type RecentStatus = 'applied' | 'review' | 'large'

export const DAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya']

export const MOCK = {
  admin: { name: 'Root Admin', role: 'SEO' },
  period: '7 kun',
  kpi: {
    receipts: { value: 1_284, delta: 12.4, series: [142, 158, 171, 166, 189, 214, 244] },
    receiptsSum: { value: 486_300_000, delta: 9.1, series: [58, 62, 66, 64, 71, 78, 87] },
    activeClients: { value: 932, delta: 6.7, series: [610, 640, 690, 720, 790, 860, 932] },
    pendingReview: { value: 7, delta: -22, series: [12, 11, 9, 10, 8, 9, 7] },
    bonusIssued: { value: 4_863_000, delta: 9.1, series: [580, 620, 660, 640, 710, 780, 870] },
    bonusSpent: { value: 2_140_000, delta: 18.3, series: [210, 260, 280, 300, 320, 360, 410] },
  },
  /** methane-specific */
  volumeM3: 99_240,
  co2SavedKg: 22_400,
  pricePerM3: 4_900,
  payments: { card: 68, cash: 32 },
  receiptsByDay: [142, 158, 171, 166, 189, 214, 244],
  sumByDay: [58.1, 62.4, 66.0, 63.7, 71.2, 78.4, 86.5], // mln so'm
  stations: [
    { name: 'AGNKS №4 — Chilonzor', receipts: 412, sum: 156_200_000, share: 32, queue: 3, pressure: 212, planPct: 86, online: true },
    { name: 'ERA — Quva', receipts: 318, sum: 118_900_000, share: 25, queue: 1, pressure: 205, planPct: 74, online: true },
    { name: 'ERA — Ziyo', receipts: 276, sum: 104_500_000, share: 21, queue: 5, pressure: 198, planPct: 69, online: true },
    { name: 'AGNKS №7 — Yunusobod', receipts: 184, sum: 70_400_000, share: 14, queue: 0, pressure: 188, planPct: 52, online: false },
    { name: 'AGNKS №2 — Sergeli', receipts: 94, sum: 36_300_000, share: 8, queue: 2, pressure: 201, planPct: 41, online: true },
  ],
  /** 7 days × 24 hours receipt counts for the heatmap (peaks morning + evening) */
  heat: Array.from({ length: 7 }, (_, d) =>
    Array.from({ length: 24 }, (_, h) => {
      const morning = Math.exp(-((h - 8.5) ** 2) / 6)
      const evening = Math.exp(-((h - 18.5) ** 2) / 5)
      const night = h < 6 ? 0.05 : 0.15
      return Math.round((morning * 14 + evening * 18 + night * 6) * (d >= 5 ? 0.8 : 1) + ((d * 7 + h * 3) % 4))
    }),
  ),
  alerts: [
    { kind: 'review', text: '7 ta chek tekshiruvni kutmoqda', time: '5 daq oldin' },
    { kind: 'large', text: '1 ta katta chek — 6 000 000 so\'m', time: '18 daq oldin' },
    { kind: 'feedback', text: '3 ta yangi shikoyat', time: '1 soat oldin' },
    { kind: 'station', text: 'AGNKS №7 — Yunusobod oflayn', time: '2 soat oldin' },
  ],
  promotions: [
    { name: 'Hafta oxiri aksiyasi', percent: 3, until: 'Ya 23:59', scope: 'Barcha filiallar', progress: 62 },
    { name: 'Tungi smena bonusi', percent: 2, until: '30 sen', scope: 'Chilonzor, Quva', progress: 35 },
  ],
  recent: [
    { client: 'Sardor Aliyev', station: 'AGNKS №4 — Chilonzor', amount: 147_000, bonus: 1_470, time: '12:41', status: 'applied' },
    { client: 'Dilnoza K.', station: 'ERA — Quva', amount: 205_000, bonus: 2_050, time: '12:38', status: 'applied' },
    { client: 'Jasur T.', station: 'ERA — Ziyo', amount: 6_000_000, bonus: 60_000, time: '12:22', status: 'large' },
    { client: 'Aziz Karimov', station: 'AGNKS №2 — Sergeli', amount: 98_000, bonus: 0, time: '12:15', status: 'review' },
    { client: 'Malika R.', station: 'AGNKS №4 — Chilonzor', amount: 176_500, bonus: 1_765, time: '12:09', status: 'applied' },
    { client: 'Bekzod N.', station: 'ERA — Ziyo', amount: 120_000, bonus: 1_200, time: '11:57', status: 'applied' },
  ] as { client: string; station: string; amount: number; bonus: number; time: string; status: RecentStatus }[],
}

export function fmt(n: number): string {
  return Math.round(n).toLocaleString('ru-RU').replace(/,/g, ' ')
}

/** 486 300 000 → "486.3 mln" */
export function short(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} mlrd`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} mln`
  if (n >= 10_000) return `${(n / 1_000).toFixed(0)} ming`
  return fmt(n)
}
