import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import NavbarWrapper from "./components/Navbar/NavbarWrapper";

export const metadata: Metadata = {
  title: "Safa İlhan Duman | Full-Stack Developer",
  description: "Full-Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <ThemeProvider>
          <NavbarWrapper />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
