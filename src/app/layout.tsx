import type { Metadata } from "next";
import { fonts } from "@/lib/fonts";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import NavbarWrapper from "./components/Navbar/NavbarWrapper";
import { StatusBar } from "./components/StatusBar/StatusBar";
export const metadata:Metadata={title:"Safa İlhan Duman | Full-Stack Developer",description:"Safa İlhan Duman — Full-Stack geliştirici. NestJS ve Next.js ile web, Electron ile masaüstü, Expo ile mobil uygulamalar; LangChain ve RAG ile yapay zekâ entegrasyonları.",openGraph:{title:"Safa İlhan Duman | Full-Stack Developer",description:"Web, masaüstü ve mobil uygulamalar; NestJS, Next.js, Electron, Expo ve yapay zekâ entegrasyonları.",type:"website",locale:"tr_TR"},robots:{index:true,follow:true}};
const themeScript='try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch{document.documentElement.dataset.theme="dark";}';
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="tr" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body className={fonts}><a className="skip-link" href="#main">İçeriğe geç</a><ThemeProvider><NavbarWrapper/><main id="main" tabIndex={-1}>{children}</main><StatusBar/></ThemeProvider></body></html>;
}
