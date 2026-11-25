"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Button } from "../ui/Button";
import styles from "./navbar.module.css";

export default function Navbar({ name }: { name: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") { setMenuOpen(false); triggerRef.current?.focus(); }
    }
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target) && !triggerRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function closeOnResize() { if (window.innerWidth > 760) setMenuOpen(false); }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("resize", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const links = (className: string) => navigation.map(item => (
    <li key={item.id}>
      <a href={"#" + item.id} className={className + (active === item.id ? " " + styles.active : "")} aria-current={active === item.id ? "location" : undefined} onClick={close}>
        {item.label}
      </a>
    </li>
  ));

  return (
    <nav className={styles.navbar + (scrolled || menuOpen ? " " + styles.scrolled : "")} aria-label="Ana menü">
      <div className={"container " + styles.container}>
        <a href="#hero" className={styles.brand} onClick={close}>
          <span className={styles.mark} aria-hidden="true" />
          <span>{name}</span>
        </a>
        <ul className={styles.links}>{links(styles.link)}</ul>
        <div className={styles.actions}>
          <Button href="#contact" small variant="primary" className={styles.cta}>Bana yaz</Button>
          <button
            ref={triggerRef}
            className={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div ref={menuRef} id="mobile-navigation" className={styles.mobileMenu}>
          <ul className="container">{links(styles.mobileLink)}</ul>
        </div>
      )}
    </nav>
  );
}
