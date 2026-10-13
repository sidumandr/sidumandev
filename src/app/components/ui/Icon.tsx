import { ArrowDown, ArrowUpRight, ArrowUp, Check, Download, Heart, Mail, MapPin, Menu, Moon, Send, Sun, Terminal, X } from "lucide-react";
const icons = { down:ArrowDown, external:ArrowUpRight, up:ArrowUp, check:Check, download:Download, heart:Heart, mail:Mail, pin:MapPin, menu:Menu, moon:Moon, send:Send, sun:Sun, terminal:Terminal, close:X };
export type IconName = keyof typeof icons;
export function Icon({name,size=16,label}:{name:IconName;size?:number;label?:string}) {
  const Glyph=icons[name];
  return <Glyph size={size} strokeWidth={1.75} strokeLinecap="square" strokeLinejoin="miter" aria-hidden={label?undefined:true} role={label?"img":undefined} aria-label={label} />;
}
