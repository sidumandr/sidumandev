import type { CSSProperties } from "react";
import Image from "next/image";
import type { ProjectView } from "@/lib/content/schema";
import { TagList } from "../ui/TagList";
import { TextLink } from "../ui/TextLink";
import styles from "./projects.module.css";

/** Her projeye başlığından türeyen sabit bir renk tonu; kartlar birbirinden ayrışır. */
function hueOf(text: string) {
  let hash = 0;
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

export function ProjectCard({ project }: { project: ProjectView }) {
  const tint = { "--hue": hueOf(project.title) } as CSSProperties;
  return (
    <article className={styles.card + " reveal"} style={tint}>
      <div className={styles.media}>
        <div className={styles.screen}>
          {project.imageUrl ? (
            <Image src={project.imageUrl} alt={project.title + " projesinin görseli"} fill sizes="(max-width: 760px) 92vw, 540px" className={styles.image} />
          ) : (
            <div className={styles.cover} aria-hidden="true">
              <span className={styles.coverTitle}>{project.title}</span>
              <span className={styles.coverTags}>{project.tags.slice(0, 3).join(", ")}</span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          {project.year && <span>{project.year}</span>}
          {project.featured && <span className={styles.featured}>Öne çıkan</span>}
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
        <TagList items={project.tags.slice(0, 4)} />
        {(project.liveUrl || project.githubUrl) && (
          <div className={styles.links}>
            {project.liveUrl && <TextLink href={project.liveUrl} external accent track="project_live" trackLabel={project.title}>Canlı site</TextLink>}
            {project.githubUrl && <TextLink href={project.githubUrl} external track="project_source" trackLabel={project.title}>Kaynak kod</TextLink>}
          </div>
        )}
      </div>
    </article>
  );
}
