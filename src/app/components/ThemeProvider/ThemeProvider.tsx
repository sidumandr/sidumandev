"use client";
import { useSyncExternalStore,createContext,useContext,useCallback } from "react";
import type { ReactNode } from "react";
import type { Theme } from "@/types/portfolio";
interface ThemeContextType {theme:Theme;toggleTheme:()=>void;mounted:boolean;}
const ThemeContext=createContext<ThemeContextType>({theme:"dark",toggleTheme:()=>{},mounted:false});
function subscribe(callback:()=>void){window.addEventListener("siduman-theme",callback);window.addEventListener("storage",callback);return()=>{window.removeEventListener("siduman-theme",callback);window.removeEventListener("storage",callback);};}
function getSnapshot():Theme{return document.documentElement.dataset.theme==="light"?"light":"dark";}
export const useTheme=()=>useContext(ThemeContext);
export function ThemeProvider({children}:{children:ReactNode}) {
  const theme=useSyncExternalStore(subscribe,getSnapshot,()=>"dark");
  const toggleTheme=useCallback(()=>{const next:Theme=getSnapshot()==="dark"?"light":"dark";document.documentElement.dataset.theme=next;try{localStorage.setItem("theme",next);}catch{}window.dispatchEvent(new Event("siduman-theme"));},[]);
  return <ThemeContext.Provider value={{theme,toggleTheme,mounted:true}}>{children}</ThemeContext.Provider>;
}
