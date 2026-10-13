import type { ChangeEvent } from "react";
import styles from "./contact.module.css";
interface FieldProps { name:"name"|"email"|"message";label:string;placeholder:string;value:string;onChange:(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>void;error?:string;multiline?:boolean; }
export function Field({name,label,placeholder,value,onChange,error,multiline=false}:FieldProps) {
  const id="contact-"+name;
  const props={id,name,placeholder,value,onChange,required:true,"aria-invalid":!!error,"aria-describedby":error?id+"-error":undefined,className:styles.input+(error?" "+styles.invalid:"")};
  return <div className={styles.field}><label htmlFor={id}>{label}</label>{multiline?<textarea {...props} rows={6} maxLength={5000}/>:<input {...props} type={name==="email"?"email":"text"} autoComplete={name==="email"?"email":"name"} maxLength={name==="email"?254:100}/ >}{error&&<p className={styles.error} id={id+"-error"}>hata: {error}</p>}</div>;
}
