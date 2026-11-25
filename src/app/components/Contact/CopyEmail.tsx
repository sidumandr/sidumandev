"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./contact.module.css";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2400);
    } catch {
      setStatus("failed");
    }
  }
  return (
    <>
      <button type="button" className={styles.copy} onClick={copy} data-track="email_copy">
        {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {status === "copied" ? "Kopyalandı" : "Kopyala"}
      </button>
      <span className="sr-only" role="status">
        {status === "copied" ? "E-posta adresi kopyalandı." : status === "failed" ? "Kopyalanamadı; adresi seçerek kopyalayabilirsin." : ""}
      </span>
    </>
  );
}
