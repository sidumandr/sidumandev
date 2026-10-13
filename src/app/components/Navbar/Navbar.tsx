"use client";
import { useEffect,useRef,useState } from "react";
import { navigation } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { Theme } from "@/types/portfolio";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Prompt } from "../ui/Prompt";
import styles from "./navbar.module.css";
interface NavbarProps {theme:Theme;toggleTheme:()=>void;}
export default function Navbar({theme,toggleTheme}:NavbarProps) {
  const [menuOpen,setMenuOpen]=useState(false);
  const active=useActiveSection();
  const menuRef=useRef<HTMLDivElement>(null);
  const triggerRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!menuOpen)return;
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function closeOnEscape(event:KeyboardEvent){if(event.key==="Escape"){setMenuOpen(false);triggerRef.current?.focus();}}
    function closeOutside(event:PointerEvent){if(event.target instanceof Node&&!menuRef.current?.contains(event.target)&&!triggerRef.current?.contains(event.target))setMenuOpen(false);}
    function closeOnResize(){if(window.innerWidth>720)setMenuOpen(false);}
    document.addEventListener("keydown",closeOnEscape);document.addEventListener("pointerdown",closeOutside);window.addEventListener("resize",closeOnResize);
    return()=>{document.removeEventListener("keydown",closeOnEscape);document.removeEventListener("pointerdown",closeOutside);window.removeEventListener("resize",closeOnResize);};
  },[menuOpen]);
  function select(){setMenuOpen(false);}
  return <nav className={styles.navbar} aria-label="Ana menü"><div className={"container "+styles.container}><a href="#hero" className={styles.logo} aria-label="Safa İlhan Duman — sayfa başı" onClick={select}><Prompt cursor/></a><ul className={styles.links}>{navigation.map((item,i)=><li key={item.id}><a href={"#"+item.id} className={styles.link+(active===item.id?" "+styles.active:"")} aria-current={active===item.id?"location":undefined}>{i+1}:{item.label}{active===item.id&&<span aria-hidden="true">*</span>}</a></li>)}</ul><div className={styles.actions}><Button href="/cv.pdf" download small className={styles.cv}>cv.pdf <Icon name="download" size={13}/></Button><button className={styles.iconButton} onClick={toggleTheme} aria-label={theme==="dark"?"Açık temaya geç":"Koyu temaya geç"} title={theme==="dark"?"Açık temaya geç":"Koyu temaya geç"}><Icon name={theme==="dark"?"sun":"moon"}/></button><button ref={triggerRef} className={styles.iconButton+" "+styles.menuButton} onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?"Menüyü kapat":"Menüyü aç"} aria-expanded={menuOpen} aria-controls="mobile-navigation"><Icon name={menuOpen?"close":"menu"}/></button></div></div>{menuOpen&&<div ref={menuRef} id="mobile-navigation" className={styles.mobileMenu}><div className="container"><Prompt command="ls ~/"/><ul>{navigation.map((item,i)=><li key={item.id}><a href={"#"+item.id} className={styles.mobileLink+(active===item.id?" "+styles.active:"")} aria-current={active===item.id?"location":undefined} onClick={select}>{i+1}:{item.label}{active===item.id&&<span aria-hidden="true">*</span>}</a></li>)}</ul><Button href="/cv.pdf" download variant="primary" className={styles.mobileCv} onClick={select}><Icon name="download"/>cv.pdf indir</Button></div></div>}</nav>;
}
