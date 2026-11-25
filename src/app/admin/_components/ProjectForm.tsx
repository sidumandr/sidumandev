"use client";
import { useActionState, useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectView } from "@/lib/content/schema";
import { projectSlug } from "@/lib/format";
import { saveProject, type ActionState } from "../actions";
import { FormStatus, SubmitButton } from "./FormBits";
import styles from "../admin.module.css";

const initial: ActionState = { ok: false, message: "" };

function Field({ label, name, error, hint, children }: { label: string; name: string; error?: string; hint?: string; children: (id: string, describedBy?: string) => React.ReactNode }) {
  const id = useId();
  const describedBy = [hint && id + "-hint", error && id + "-error"].filter(Boolean).join(" ") || undefined;
  return (
    <div className={styles.field} data-field={name}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      {children(id, describedBy)}
      {hint && <p id={id + "-hint"} className={styles.hint}>{hint}</p>}
      {error && <p id={id + "-error"} className={styles.error}>{error}</p>}
    </div>
  );
}

export function ProjectForm({ project }: { project?: ProjectView }) {
  const [state, formAction] = useActionState(saveProject, initial);
  const [values, setValues] = useState({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    summary: project?.summary ?? "",
    description: project?.description ?? "",
    tags: project?.tags.join(", ") ?? "",
    githubUrl: project?.githubUrl ?? "",
    liveUrl: project?.liveUrl ?? "",
    year: project?.year ? String(project.year) : "",
    featured: project?.featured ?? false,
    removeImage: false,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const errors = state.fieldErrors ?? {};
  const set = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues(current => ({ ...current, [key]: event.target.type === "checkbox" ? (event.target as HTMLInputElement).checked : event.target.value }));
  const invalid = (name: string) => styles.input + (errors[name] ? " " + styles.invalid : "");

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const currentImage = values.removeImage ? null : preview ?? project?.imageUrl ?? null;

  return (
    <form action={formAction} className={styles.form} noValidate>
      {project && <input type="hidden" name="id" value={project.id} />}
      <input type="hidden" name="imageUrl" value={project?.imageUrl ?? ""} />

      <section className={styles.card + " " + styles.form}>
        <div className={styles.grid2}>
          <Field label="Proje adı" name="title" error={errors.title}>
            {(id, describedBy) => <input id={id} name="title" className={invalid("title")} value={values.title} onChange={set("title")} maxLength={80} required aria-describedby={describedBy} aria-invalid={Boolean(errors.title)} />}
          </Field>
          <Field label="Kısa ad (adres)" name="slug" error={errors.slug} hint={"Boş bırakırsan addan üretilir: " + (projectSlug(values.title) || "proje-adi")}>
            {(id, describedBy) => <input id={id} name="slug" className={invalid("slug")} value={values.slug} onChange={set("slug")} maxLength={80} placeholder={projectSlug(values.title)} aria-describedby={describedBy} aria-invalid={Boolean(errors.slug)} />}
          </Field>
        </div>
        <Field label="Tek cümlelik özet" name="summary" error={errors.summary} hint="Kartta görünen metin. Projenin ne işe yaradığını anlat; teknolojileri etiketlere bırak.">
          {(id, describedBy) => <textarea id={id} name="summary" className={styles.textarea + (errors.summary ? " " + styles.invalid : "")} rows={2} value={values.summary} onChange={set("summary")} maxLength={180} required aria-describedby={describedBy} aria-invalid={Boolean(errors.summary)} />}
        </Field>
        <Field label="Ayrıntılı açıklama (isteğe bağlı)" name="description" error={errors.description} hint="Şimdilik sitede gösterilmiyor; ileride proje detay sayfası için saklanır.">
          {(id, describedBy) => <textarea id={id} name="description" className={styles.textarea} rows={3} value={values.description} onChange={set("description")} maxLength={1200} aria-describedby={describedBy} />}
        </Field>
        <div className={styles.grid2}>
          <Field label="Etiketler" name="tags" error={errors.tags} hint="Virgülle ayır, en fazla 6. Kartta ilk 4'ü görünür.">
            {(id, describedBy) => <input id={id} name="tags" className={invalid("tags")} value={values.tags} onChange={set("tags")} placeholder="Next.js, NestJS, PostgreSQL" aria-describedby={describedBy} aria-invalid={Boolean(errors.tags)} />}
          </Field>
          <Field label="Yıl" name="year" error={errors.year}>
            {(id, describedBy) => <input id={id} name="year" className={invalid("year")} value={values.year} onChange={set("year")} inputMode="numeric" placeholder="2026" aria-describedby={describedBy} aria-invalid={Boolean(errors.year)} />}
          </Field>
          <Field label="Canlı site adresi" name="liveUrl" error={errors.liveUrl}>
            {(id, describedBy) => <input id={id} name="liveUrl" type="url" className={invalid("liveUrl")} value={values.liveUrl} onChange={set("liveUrl")} placeholder="https://" aria-describedby={describedBy} aria-invalid={Boolean(errors.liveUrl)} />}
          </Field>
          <Field label="Kaynak kod adresi" name="githubUrl" error={errors.githubUrl}>
            {(id, describedBy) => <input id={id} name="githubUrl" type="url" className={invalid("githubUrl")} value={values.githubUrl} onChange={set("githubUrl")} placeholder="https://github.com/…" aria-describedby={describedBy} aria-invalid={Boolean(errors.githubUrl)} />}
          </Field>
        </div>
        <label className={styles.check}>
          <input type="checkbox" name="featured" checked={values.featured} onChange={set("featured")} />
          Öne çıkan olarak işaretle
        </label>
      </section>

      <section className={styles.card + " " + styles.form} aria-labelledby="image-title">
        <h2 id="image-title" className={styles.cardTitle}>Görsel <small>16:10 oranında ekran görüntüsü önerilir</small></h2>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div className={styles.imagePreview}>
            {currentImage ? <Image src={currentImage} alt="Seçili görselin önizlemesi" fill sizes="220px" unoptimized={Boolean(preview)} /> : <span className={styles.hint} style={{ display: "grid", placeItems: "center", height: "100%" }}>Görsel yok, otomatik kapak kullanılır</span>}
          </div>
          <div className={styles.form} style={{ flex: 1, minWidth: 220 }}>
            <Field label="Yeni görsel yükle" name="image" error={errors.image} hint="PNG, JPEG, WebP veya AVIF, en fazla 4 MB.">
              {(id, describedBy) => (
                <input
                  id={id}
                  name="image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  aria-describedby={describedBy}
                  onChange={event => {
                    const file = event.target.files?.[0];
                    setPreview(file ? URL.createObjectURL(file) : null);
                    if (file) setValues(current => ({ ...current, removeImage: false }));
                  }}
                />
              )}
            </Field>
            {project?.imageUrl && (
              <label className={styles.check}>
                <input type="checkbox" name="removeImage" checked={values.removeImage} onChange={set("removeImage")} />
                Mevcut görseli kaldır
              </label>
            )}
          </div>
        </div>
      </section>

      <div className={styles.formActions}>
        <FormStatus state={state} />
        <Link href="/admin/projeler" className={styles.button}>Vazgeç</Link>
        <SubmitButton>{project ? "Değişiklikleri kaydet" : "Projeyi ekle"}</SubmitButton>
      </div>
    </form>
  );
}
