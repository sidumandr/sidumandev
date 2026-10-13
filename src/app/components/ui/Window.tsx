import type { ReactNode } from "react";
import styles from "./window.module.css";
export function Window({title,meta,children,className=""}:{title:string;meta?:string;children:ReactNode;className?:string}) {
  return <div className={styles.window+" "+className}><div className={styles.titleBar}><span>[ {title} ]</span>{meta&&<span className={styles.meta}>{meta}</span>}</div>{children}</div>;
}
