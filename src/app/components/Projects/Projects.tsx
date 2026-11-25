import { ArrowUpRight } from "lucide-react";
import type { FlagshipContent, ProjectView } from "@/lib/content/schema";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";
import { FlagshipProject } from "./FlagshipProject";
import { ProjectCard } from "./ProjectCard";
import styles from "./projects.module.css";

export default function Projects({ flagship, projects, github }: { flagship: FlagshipContent; projects: ProjectView[]; github: string }) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          title="Yaptığım işler"
          subtitle="Önce şu an üzerinde çalıştığım büyük proje, ardından kendi geliştirdiğim uygulamalar."
          id="projects-title"
        />
        <FlagshipProject flagship={flagship} />
        {projects.length > 0 && (
          <div className={styles.grid}>
            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
        )}
        <div className={styles.more + " reveal"}>
          <p>Diğer repolarım GitHub&apos;da.</p>
          <Button href={github + "?tab=repositories"} target="_blank" rel="noopener noreferrer" small data-track="github" data-track-label="projeler">
            GitHub profilim <ArrowUpRight size={15} aria-hidden="true" />
            <span className="sr-only"> (yeni sekmede açılır)</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
