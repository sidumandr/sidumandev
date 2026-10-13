import { identity } from "@/data/identity";
import { projects } from "@/data/projects";
import { Button } from "../ui/Button";
import { Prompt } from "../ui/Prompt";
import { SectionHeader } from "../ui/SectionHeader";
import { ProjectCard } from "./ProjectCard";
import styles from "./projects.module.css";
export default function Projects() {
  return <section className="section" id="projects" aria-labelledby="projects-title"><div className="container"><SectionHeader index={2} command="cd projeler" title="Geliştirdiğim işler" subtitle="Gerçek problemlere odaklanan, üretim kalitesinde projeler." id="projects-title"/><div className={styles.grid}>{projects.map((project,index)=><ProjectCard key={project.title} project={project} index={index+1}/>)}<div className={styles.more}><Prompt command="ls ~/projeler --all"/><p>Tüm repolarım GitHub&apos;da.</p><Button href={identity.github+"?tab=repositories"} target="_blank" rel="noopener noreferrer" small>github&apos;da gör ↗<span className="sr-only"> (yeni sekmede açılır)</span></Button></div></div></div></section>;
}
