import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

interface Shared { children: ReactNode; variant?: "primary" | "secondary" | "ghost"; small?: boolean; className?: string; }
type Props = Shared & (({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) | ({ href?: never } & ButtonHTMLAttributes<HTMLButtonElement>));

export function Button(props: Props) {
  const { children, variant = "secondary", small = false, className = "", ...rest } = props;
  const classes = [styles.button, styles[variant], small ? styles.small : "", className].filter(Boolean).join(" ");
  if ("href" in rest && rest.href) return <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>{children}</a>;
  return <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>{children}</button>;
}
