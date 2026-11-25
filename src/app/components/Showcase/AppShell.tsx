"use client";
import { useEffect, useRef, type ReactNode } from "react";
import {
  Ban, Banknote, BarChart3, Bell, ChevronDown, ChevronRight, CircleCheck, Database, FileText, FolderOpen, Gavel,
  LayoutDashboard, LineChart, ListChecks, Network, Palette, Search, Server, Settings, SlidersHorizontal, Terminal, Upload, UserSearch, Users,
  type LucideIcon,
} from "lucide-react";
import { poolCounts } from "./mock";
import { formatNumber, useScreen } from "./ScreenFrame";
import styles from "./app.module.css";

export type ShellNav = "overview" | "files" | "address" | "operations" | "monitoring" | `pool:${string}`;

/** `indent` maddeler Ödeme Emri'nin altındadır; menü kapalıyken gizlenir. `toggle` açılır kapanır başlıktır. */
interface NavItem { id?: ShellNav; label: string; icon?: LucideIcon; count?: number; chevron?: "right" | "down"; indent?: boolean; toggle?: boolean }
interface NavGroup { heading?: { label: string; icon: LucideIcon }; items: NavItem[] }

/** Ana projenin kenar menüsünün tamamı. Sayılar uydurmadır. */
const groups: NavGroup[] = [
  { items: [{ id: "overview", label: "Genel Bakış", icon: LayoutDashboard }] },
  { heading: { label: "Ana veri", icon: Database }, items: [{ label: "Veri Yükleme", icon: Upload, chevron: "right" }] },
  {
    heading: { label: "İcra takip", icon: Gavel },
    items: [
      { label: "Takip", icon: Network, chevron: "right" },
      { id: "files", label: "Ana Sayfa", icon: FolderOpen },
      { label: "Ödeme Emri", icon: FileText, chevron: "down", toggle: true },
      { label: "Kapalı Dosyalar", icon: Ban, indent: true },
      { id: "address", label: "Adres-Sorgu", icon: Search, indent: true },
      { label: "Tensip Takibi", icon: ListChecks, indent: true },
      { label: "İş Havuzu", icon: FileText, indent: true },
      { label: "Personel İncelemesi", icon: ListChecks, indent: true },
      { label: "İtiraz Türü Sırası", icon: ListChecks, indent: true },
      ...poolCounts.map(pool => ({ id: `pool:${pool.label}` as ShellNav, label: pool.label, count: pool.count, indent: true })),
      { label: "Devam Eden Sorgu", icon: Search, count: 3 },
      { label: "Sorgu Sonuçları", icon: FileText, count: 1482 },
      { label: "Haciz Süreci", icon: CircleCheck, chevron: "right" },
      { id: "operations", label: "İşlemler", icon: ListChecks },
      { label: "Raporlar", icon: BarChart3 },
      { label: "Masraf", icon: Banknote },
    ],
  },
  {
    heading: { label: "Yönetim", icon: Users },
    items: [
      { label: "Ekibim", icon: Users },
      { id: "monitoring", label: "Performans", icon: LineChart },
      { label: "Kullanıcı Takibi", icon: UserSearch },
    ],
  },
  {
    heading: { label: "Sistem", icon: Server },
    items: [
      { label: "Ayarlar", icon: Settings },
      { label: "Sistem Ayarları", icon: SlidersHorizontal },
    ],
  },
];

/** Ana projenin açık temalı arayüz kabuğu; marka, alan adı ve kullanıcı bilgileri nötrdür. */
export function AppShell({ active, children, updatedAt = "12.03.2026 14:20", paymentOrderOpen = true }: {
  active: ShellNav;
  children: ReactNode;
  updatedAt?: string;
  /** Ödeme Emri açık mı; kapalıyken altındaki başlıklar da menüde görünür. */
  paymentOrderOpen?: boolean;
}) {
  const nav = useRef<HTMLElement>(null);
  const { glass } = useScreen();

  // Gerçek uygulamadaki gibi menü, açık olan sayfanın maddesi görünecek şekilde kaydırılmış durur.
  useEffect(() => {
    const container = nav.current;
    const current = container?.querySelector<HTMLElement>("[data-active]");
    if (!container || !current) return;
    container.scrollTop = Math.max(0, current.offsetTop - container.clientHeight * 0.35);
  }, [active, paymentOrderOpen]);

  return (
    <div className={styles.app + (glass ? " " + styles.glass : "")}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}><span className={styles.logoMark} />Operasyon</div>
        <nav ref={nav} className={styles.nav}>
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.navGroup}>
              {group.heading && (
                <span className={styles.navHeading}><group.heading.icon size={15} strokeWidth={1.8} />{group.heading.label}</span>
              )}
              {group.items.filter(item => paymentOrderOpen || !item.indent).map(item => {
                const chevron = item.toggle && !paymentOrderOpen ? "right" : item.chevron;
                const isActive = item.id !== undefined && item.id === active;
                const className = [
                  item.icon ? styles.navItem : styles.navPool,
                  item.indent && item.icon ? styles.navIndent : "",
                  isActive ? styles.navActive : "",
                ].filter(Boolean).join(" ");
                return (
                  <span key={item.label} className={className} data-active={isActive || undefined}>
                    {item.icon && <item.icon size={16} strokeWidth={1.8} />}
                    {item.label}
                    {item.count !== undefined && <em>{formatNumber(item.count)}</em>}
                    {chevron === "right" && <ChevronRight size={15} className={styles.chevron} />}
                    {chevron === "down" && <ChevronDown size={15} className={styles.chevron} />}
                  </span>
                );
              })}
            </div>
          ))}
        </nav>
        <div className={styles.user}>
          <span className={styles.avatar}><Terminal size={17} strokeWidth={2.6} /></span>
          <span><strong>Safa</strong><small>Yazılım</small></span>
        </div>
      </aside>
      <div className={styles.workspace}>
        <header className={styles.topbar}>
          <span className={styles.search}><Search size={15} />Dosya no, borçlu ya da kimlik no ara</span>
          <span className={styles.topRight}>
            <span className={styles.topButton}><FolderOpen size={15} />Tüm projeler</span>
            <span className={styles.updated}>Son güncelleme: <b>{updatedAt}</b></span>
            <span className={styles.bell}><Bell size={17} /><em>4</em></span>
            <span className={styles.topButton}><Palette size={15} />Tema</span>
          </span>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
