import type { ReactNode } from "react";
import styles from "./text-link.module.css";
export function TextLink({href,children,external=false,bracket=false,accent=false,className=""}:{href:string;children:ReactNode;external?:boolean;bracket?:boolean;accent?:boolean;className?:string}) {
  return <a href={href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined} className={[styles.link,accent?styles.accent:"",className].join(" ")}>{bracket&&<span aria-hidden="true">[ </span>}<span className={styles.label}>{children}{external&&<span aria-hidden="true"> ↗</span>}</span>{bracket&&<span aria-hidden="true"> ]</span>}{external&&<span className="sr-only"> (yeni sekmede açılır)</span>}</a>;
}
