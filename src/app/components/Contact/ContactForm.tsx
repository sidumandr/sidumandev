"use client";
import { useRef,useState } from "react";
import type { ChangeEvent,FormEvent } from "react";
import { identity } from "@/data/identity";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Prompt } from "../ui/Prompt";
import { TextLink } from "../ui/TextLink";
import { Window } from "../ui/Window";
import { Field } from "./Field";
import styles from "./contact.module.css";
type Fields={name:string;email:string;message:string};
const empty:Fields={name:"",email:"",message:""};
export function ContactForm() {
  const [form,setForm]=useState<Fields>(empty);
  const [errors,setErrors]=useState<Partial<Fields>>({});
  const [draft,setDraft]=useState<string|null>(null);
  const successRef=useRef<HTMLDivElement>(null);
  function change(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) { const key=event.target.name as keyof Fields;setForm(previous=>({...previous,[key]:event.target.value}));setErrors(previous=>({...previous,[key]:undefined})); }
  function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next:Partial<Fields>={};
    if(!form.name.trim())next.name="Adını yaz.";
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))next.email="Geçerli bir e-posta adresi yaz.";
    if(!form.message.trim())next.message="Mesajını yaz.";
    setErrors(next);
    const first=Object.keys(next)[0];
    if(first){document.getElementById("contact-"+first)?.focus();return;}
    const subject=encodeURIComponent("Portföy üzerinden iletişim · "+form.name.trim());
    const body=encodeURIComponent(form.message.trim()+"\n\n"+form.name.trim()+"\n"+form.email.trim());
    const mailto="mailto:"+identity.email+"?subject="+subject+"&body="+body;
    setDraft(mailto);
    window.location.href=mailto;
    requestAnimationFrame(()=>successRef.current?.focus());
  }
  if(draft)return <Window title="mail" className={styles.formPanel}><div ref={successRef} tabIndex={-1} className={styles.success} role="status"><Prompt command={"mail --to "+identity.email}/><p className={styles.log}><Icon name="check"/>[ tamam ] e-posta taslağı hazır</p><h3>Mesajın hazır!</h3><p>E-posta uygulamanda açılan taslağı göndererek bana ulaşabilirsin.</p><TextLink href={draft} accent>E-posta uygulamasını aç</TextLink><Button variant="ghost" onClick={()=>{setDraft(null);setForm(empty);requestAnimationFrame(()=>document.getElementById("contact-name")?.focus());}}>Yeni mesaj yaz <Icon name="external"/></Button></div></Window>;
  return <Window title="mesaj.sh" className={styles.formPanel}><form className={styles.form} onSubmit={submit} noValidate><div className={styles.formCommand}><Prompt command={"mail --to "+identity.email+" "+String.fromCharCode(92)}/></div><div className={styles.row}><Field name="name" label="--ad-soyad" placeholder="Adın Soyadın" value={form.name} onChange={change} error={errors.name}/><Field name="email" label="--e-posta" placeholder="ornek@mail.com" value={form.email} onChange={change} error={errors.email}/></div><Field name="message" label="--mesaj" placeholder="Projen, fikrin ya da merhaba..." value={form.message} onChange={change} error={errors.message} multiline/><p className={styles.helper} id="contact-help">E-posta uygulamanda bir taslak açılır; mesajı oradan gönderebilirsin.</p><Button type="submit" variant="primary" aria-describedby="contact-help">↵ Gönder</Button></form></Window>;
}
