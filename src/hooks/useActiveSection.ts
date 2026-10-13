"use client";
import { useEffect,useState } from "react";
import { navigation } from "@/data/navigation";
import type { SectionId } from "@/types/portfolio";
export function useActiveSection():SectionId|null {
  const [active,setActive]=useState<SectionId|null>(null);
  useEffect(()=>{
    let frame=0;
    function update(){
      frame=0;
      const threshold=(document.querySelector("nav")?.getBoundingClientRect().height??64)+2;
      let current:SectionId|null=null;
      for(const item of navigation){
        const element=document.getElementById(item.id);
        if(element&&element.getBoundingClientRect().top<=threshold)current=item.id;
      }
      // The final section may be too short to reach the navbar's edge.
      if(window.scrollY>0&&Math.ceil(window.scrollY+window.innerHeight)>=document.documentElement.scrollHeight-1){
        current=navigation[navigation.length-1].id;
      }
      setActive(current);
    }
    function schedule(){if(!frame)frame=requestAnimationFrame(update);}
    update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);};
  },[]);
  return active;
}
