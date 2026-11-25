import type { Metadata } from "next";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
