import localFont from "next/font/local";
const sans=localFont({src:"../../public/fonts/geist.ttf",variable:"--font-sans",weight:"100 900",display:"swap"});
const mono=localFont({src:"../../public/fonts/geist-mono.ttf",variable:"--font-mono",weight:"100 900",display:"swap"});
export const fonts=sans.variable+" "+mono.variable;
