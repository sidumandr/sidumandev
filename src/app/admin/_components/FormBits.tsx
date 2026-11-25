"use client";
import { useId, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import type { ActionState } from "../actions";
import styles from "../admin.module.css";

export function SubmitButton({ children = "Kaydet" }: { children?: ReactNode }) {
  const { pending } = useFormStatus();
  return <button type="submit" className={styles.button + " " + styles.primary} disabled={pending}>{pending ? "Kaydediliyor…" : children}</button>;
}

export function FormStatus({ state }: { state: ActionState }) {
  if (!state.message) return <span className={styles.status} />;
  return (
    <div className={styles.status} role={state.ok ? "status" : "alert"}>
      <span className={state.ok ? styles.statusOk : styles.statusError}>{state.message}</span>
      {state.issues && state.issues.length > 0 && <ul className={styles.issues}>{state.issues.map(issue => <li key={issue}>{issue}</li>)}</ul>}
    </div>
  );
}

interface TextProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  type?: string;
  placeholder?: string;
}

/** Kontrollü metin alanı; içerik formları JSON olarak gönderildiği için `name` gerekmez. */
export function TextField({ label, value, onChange, hint, multiline, rows = 3, maxLength, type = "text", placeholder }: TextProps) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea id={id} className={styles.textarea} rows={rows} value={value} maxLength={maxLength} placeholder={placeholder} onChange={event => onChange(event.target.value)} />
      ) : (
        <input id={id} className={styles.input} type={type} value={value} maxLength={maxLength} placeholder={placeholder} onChange={event => onChange(event.target.value)} />
      )}
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}

export function SelectField<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (value: T) => void; options: { value: T; label: string }[] }) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <select id={id} className={styles.select} value={value} onChange={event => onChange(event.target.value as T)}>
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  );
}

/** Virgülle ayrılmış liste; boş öğeler atılır. */
export function ListField({ label, value, onChange, hint }: { label: string; value: string[]; onChange: (value: string[]) => void; hint?: string }) {
  return (
    <TextField
      label={label}
      value={value.join(", ")}
      onChange={text => onChange(text.split(",").map(item => item.trimStart()).filter((item, index, all) => item !== "" || index === all.length - 1))}
      hint={hint ?? "Virgülle ayır."}
    />
  );
}

/** Her satıra bir öğe; içinde virgül geçebilen metinler (ör. tur maddeleri) için. */
export function LinesField({ label, value, onChange, hint }: { label: string; value: string[]; onChange: (value: string[]) => void; hint?: string }) {
  return (
    <TextField
      label={label}
      value={value.join("\n")}
      onChange={text => onChange(text.split("\n"))}
      multiline
      rows={Math.max(3, value.length + 1)}
      hint={hint ?? "Her satıra bir madde yaz."}
    />
  );
}

export function cleanList(list: string[]) {
  return list.map(item => item.trim()).filter(Boolean);
}

/** Satır ekleme, silme ve sıralama yapılabilen liste düzenleyici. */
export function Repeater<T>({ items, onChange, create, render, addLabel, itemLabel, max }: {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  render: (item: T, update: (item: T) => void, index: number) => ReactNode;
  addLabel: string;
  itemLabel: (item: T, index: number) => string;
  max?: number;
}) {
  const move = (from: number, to: number) => {
    const next = [...items];
    [next[from], next[to]] = [next[to], next[from]];
    onChange(next);
  };
  return (
    <div className={styles.repeater}>
      {items.map((item, index) => (
        <div key={index} className={styles.repeaterRow}>
          <div className={styles.repeaterHead}>
            <span>{itemLabel(item, index)}</span>
            <div className={styles.repeaterTools}>
              <button type="button" className={styles.iconButton} disabled={index === 0} onClick={() => move(index, index - 1)} aria-label="Yukarı taşı"><ArrowUp size={14} /></button>
              <button type="button" className={styles.iconButton} disabled={index === items.length - 1} onClick={() => move(index, index + 1)} aria-label="Aşağı taşı"><ArrowDown size={14} /></button>
              <button type="button" className={styles.iconButton + " " + styles.danger} onClick={() => onChange(items.filter((_, i) => i !== index))} aria-label="Kaldır"><X size={14} /></button>
            </div>
          </div>
          {render(item, next => onChange(items.map((current, i) => (i === index ? next : current))), index)}
        </div>
      ))}
      {(max === undefined || items.length < max) && (
        <button type="button" className={styles.button} style={{ alignSelf: "flex-start" }} onClick={() => onChange([...items, create()])}>
          <Plus size={15} aria-hidden="true" />{addLabel}
        </button>
      )}
    </div>
  );
}
