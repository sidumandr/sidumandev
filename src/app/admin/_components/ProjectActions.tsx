"use client";
import { useTransition } from "react";
import Link from "next/link";
import { Archive, ArchiveRestore, ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import { deleteProject, moveProject, setProjectArchived } from "../actions";
import styles from "../admin.module.css";

export function ProjectActions({ id, title, archived, first, last }: { id: string; title: string; archived: boolean; first: boolean; last: boolean }) {
  const [pending, startTransition] = useTransition();
  const run = (action: () => Promise<void>) => startTransition(async () => { await action(); });

  return (
    <div className={styles.rowActions} aria-busy={pending}>
      <button type="button" className={styles.iconButton} disabled={pending || first} onClick={() => run(() => moveProject(id, "up"))} aria-label={`${title} projesini yukarı taşı`} title="Yukarı taşı">
        <ArrowUp size={15} />
      </button>
      <button type="button" className={styles.iconButton} disabled={pending || last} onClick={() => run(() => moveProject(id, "down"))} aria-label={`${title} projesini aşağı taşı`} title="Aşağı taşı">
        <ArrowDown size={15} />
      </button>
      <Link className={styles.iconButton} href={`/admin/projeler/${id}`} aria-label={`${title} projesini düzenle`} title="Düzenle">
        <Pencil size={15} />
      </Link>
      <button
        type="button"
        className={styles.button}
        disabled={pending}
        onClick={() => run(() => setProjectArchived(id, !archived))}
      >
        {archived ? <ArchiveRestore size={15} aria-hidden="true" /> : <Archive size={15} aria-hidden="true" />}
        {archived ? "Yayına al" : "Arşivle"}
      </button>
      {archived && (
        <button
          type="button"
          className={styles.iconButton + " " + styles.danger}
          disabled={pending}
          onClick={() => {
            if (window.confirm(`"${title}" kalıcı olarak silinsin mi? Bu işlem geri alınamaz.`)) run(() => deleteProject(id));
          }}
          aria-label={`${title} projesini kalıcı olarak sil`}
          title="Kalıcı olarak sil"
        >
          <Trash2 size={15} />
        </button>
      )}
    </div>
  );
}
