import type { Metadata, Viewport } from "next";
import { fonts } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: { url: "/terminal-cursor.svg", type: "image/svg+xml", sizes: "any" } },
};

export const viewport: Viewport = { themeColor: "#08090a", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-theme="dark">
      <body className={fonts}>{children}</body>
    </html>
  );
}
