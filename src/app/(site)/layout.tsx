import type { Metadata } from "next";
import { accentCss } from "@/lib/appearance";
import { getSiteContent } from "@/lib/content/queries";
import { Tracker } from "../components/Analytics/Tracker";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { TerminalFavicon } from "../components/TerminalFavicon";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();
  return {
    title: seo.title,
    description: seo.description,
    openGraph: { title: seo.title, description: seo.description, type: "website", locale: "tr_TR" },
    robots: { index: true, follow: true },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { hero, contact, appearance } = await getSiteContent();
  return (
    <>
      {appearance.accent !== "yellow" && <style>{accentCss(appearance.accent)}</style>}
      <a className="skip-link" href="#main">İçeriğe geç</a>
      <TerminalFavicon />
      <Navbar name={hero.name} />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer name={hero.name} contact={contact} />
      <Tracker />
    </>
  );
}
