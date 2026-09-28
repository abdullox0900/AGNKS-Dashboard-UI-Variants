# AGNKS Dashboard — UI variantlar

Faqat ko'rsatish uchun: rahbarlar panelining **Bosh sahifasi**, 5 xil dizaynda (rang **va** tuzilma farqli, metanga oid elementlar bilan), mock ma'lumot.
Backendga ulanmagan, asosiy loyihaga (`AGNKS-Dashboard`) ta'sir qilmaydi.

1. Classic — hozirgiga yaqin, yorug' ko'k
2. Command Center — qorong'u, jonli oqim, shoxobchalar holati
3. Eco — tepada menyu, yashil banner (m³ metan, CO₂), reyting, to'lov turlari
4. Bento — plitkalar, soatlar issiqlik xaritasi, metan narxi
5. Tank — sanoat uslubi, shoxobchalar metan balloni ko'rinishida, hodisalar jurnali

- Variantlar: `src/variants/V1Classic.tsx` … `V5Tank.tsx`; grafiklar: `src/charts.tsx` (SVG, kutubxonasiz); mock: `src/mock.ts`
- Havola: `?v=1` … `?v=5`; pastdagi panel yoki ← → bilan almashtiriladi

```bash
npm install
npm run dev
npm run build    # dist/ — statik hostingga joylash
```
