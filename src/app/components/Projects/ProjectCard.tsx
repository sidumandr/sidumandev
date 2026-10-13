import type { Project } from "@/types/portfolio";
import { projectSlug,twoDigits } from "@/lib/format";
import { Badge } from "../ui/Badge";
import { TagList } from "../ui/TagList";
import { TextLink } from "../ui/TextLink";
import styles from "./projects.module.css";
export function ProjectCard({project,index}:{project:Project;index:number}) {
  return <article className={styles.card}><div className={styles.pathRow}><span className={styles.path}><span>{twoDigits(index)}</span> ~/projeler/{projectSlug(project.title)}/</span>{project.featured&&<Badge>popüler</Badge>}</div><h3 className={styles.title}>{project.title}</h3><p className={styles.description}>{project.description}</p><div className={styles.bottom}><TagList items={project.tags} variant="soft"/><div className={styles.links}><TextLink href={project.github} external bracket>kaynak</TextLink>{project.live&&<TextLink href={project.live} external bracket accent>canlı</TextLink>}</div></div></article>;
}
