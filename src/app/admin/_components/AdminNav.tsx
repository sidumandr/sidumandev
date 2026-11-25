"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, FolderKanban, Palette, Star } from "lucide-react";
import styles from "../admin.module.css";

const items = [
  { href: "/admin", label: "Genel bakış", icon: BarChart3 },
  { href: "/admin/projeler", label: "Projeler", icon: FolderKanban },
  { href: "/admin/ana-proje", label: "Ana proje", icon: Star },
  { href: "/admin/icerik", label: "Sayfa içeriği", icon: FileText },
  { href: "/admin/gorunum", label: "Görünüm", icon: Palette },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav} aria-label="Admin menüsü">
      {items.map(item => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={styles.navLink + (active ? " " + styles.navActive : "")} aria-current={active ? "page" : undefined}>
            <item.icon size={16} aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
