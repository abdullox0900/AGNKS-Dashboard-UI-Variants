import type { ComponentType } from 'react'
import * as L from 'lucide-react'
import * as P from '@phosphor-icons/react'

export type IconName =
  | 'overview' | 'analytics' | 'review' | 'feedback' | 'cashiers' | 'stations' | 'bonus' | 'broadcast' | 'admins' | 'clients'
  | 'settings' | 'search' | 'bell' | 'calendar' | 'pin' | 'flame' | 'fuel' | 'receipt' | 'up' | 'down' | 'alert' | 'check'
  | 'clock' | 'leaf' | 'arrow' | 'download' | 'filter' | 'chevronDown' | 'more' | 'gauge' | 'sparkle' | 'wallet' | 'car' | 'plus'

export type IconProps = { size?: number; className?: string }
export type IconSet = Record<IconName, ComponentType<IconProps>>

const LUCIDE: Record<IconName, L.LucideIcon> = {
  overview: L.LayoutDashboard, analytics: L.ChartLine, review: L.ClipboardCheck, feedback: L.MessageSquareWarning,
  cashiers: L.UsersRound, stations: L.Store, bonus: L.Percent, broadcast: L.Megaphone, admins: L.ShieldCheck, clients: L.Contact,
  settings: L.Settings, search: L.Search, bell: L.Bell, calendar: L.CalendarDays, pin: L.MapPin, flame: L.Flame, fuel: L.Fuel,
  receipt: L.ReceiptText, up: L.TrendingUp, down: L.TrendingDown, alert: L.TriangleAlert, check: L.CircleCheck, clock: L.Clock,
  leaf: L.Leaf, arrow: L.ArrowUpRight, download: L.Download, filter: L.SlidersHorizontal, chevronDown: L.ChevronDown,
  more: L.Ellipsis, gauge: L.Gauge, sparkle: L.Sparkles, wallet: L.Wallet, car: L.Car, plus: L.Plus,
}

const PHOSPHOR: Record<IconName, P.Icon> = {
  overview: P.SquaresFour, analytics: P.ChartLineUp, review: P.ClipboardText, feedback: P.ChatCircleText, cashiers: P.UsersThree,
  stations: P.Storefront, bonus: P.Percent, broadcast: P.Megaphone, admins: P.ShieldCheck, clients: P.AddressBook, settings: P.GearSix,
  search: P.MagnifyingGlass, bell: P.BellSimple, calendar: P.CalendarBlank, pin: P.MapPin, flame: P.Flame, fuel: P.GasPump,
  receipt: P.Receipt, up: P.TrendUp, down: P.TrendDown, alert: P.Warning, check: P.CheckCircle, clock: P.Clock, leaf: P.Leaf,
  arrow: P.ArrowUpRight, download: P.DownloadSimple, filter: P.SlidersHorizontal, chevronDown: P.CaretDown, more: P.DotsThree,
  gauge: P.Gauge, sparkle: P.Sparkle, wallet: P.Wallet, car: P.Car, plus: P.Plus,
}

function lucide(strokeWidth: number): IconSet {
  return Object.fromEntries(
    Object.entries(LUCIDE).map(([k, Icon]) => [k, ({ size = 18, className }: IconProps) => <Icon size={size} strokeWidth={strokeWidth} className={className} />]),
  ) as IconSet
}

function phosphor(weight: P.IconWeight): IconSet {
  return Object.fromEntries(
    Object.entries(PHOSPHOR).map(([k, Icon]) => [k, ({ size = 18, className }: IconProps) => <Icon size={size} weight={weight} className={className} />]),
  ) as IconSet
}

export const ICONS = {
  lucide: lucide(1.8),
  lucideBold: lucide(2.3),
  light: phosphor('light'),
  duotone: phosphor('duotone'),
  fill: phosphor('fill'),
}

/** The dashboard's real menu, grouped like the production sidebar. */
export const MENU: { title: string; items: { icon: IconName; label: string; badge?: number }[] }[] = [
  { title: "Ko'rish", items: [{ icon: 'overview', label: 'Bosh sahifa' }, { icon: 'analytics', label: 'Analitika' }] },
  { title: 'Nazorat', items: [{ icon: 'review', label: 'Tekshiruv', badge: 7 }, { icon: 'feedback', label: 'Taklif va shikoyat', badge: 3 }] },
  {
    title: 'Boshqaruv',
    items: [
      { icon: 'cashiers', label: 'Kassirlar' },
      { icon: 'stations', label: 'Filiallar' },
      { icon: 'bonus', label: 'Bonus' },
      { icon: 'broadcast', label: 'Xabarnomalar' },
      { icon: 'admins', label: 'Adminlar' },
      { icon: 'clients', label: 'Mijozlar' },
    ],
  },
]
