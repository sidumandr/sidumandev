import { getPublicProjects, getSiteContent } from "@/lib/content/queries";
import About from "../components/About/About";
import Certificates from "../components/Certificates/Certificates";
import Contact from "../components/Contact/Contact";
import Hero from "../components/Hero/Hero";
import { StackStrip } from "../components/Hero/StackStrip";
import Projects from "../components/Projects/Projects";

export default async function Home() {
  const [content, projects] = await Promise.all([getSiteContent(), getPublicProjects()]);
  return (
    <>
      <Hero
        hero={content.hero}
        flagship={content.flagship}
        contact={content.contact}
        appearance={content.appearance}
        images={projects.flatMap(project => (project.imageUrl ? [project.imageUrl] : []))}
      />
      <StackStrip items={content.hero.stack} />
      <Projects flagship={content.flagship} projects={projects} github={content.contact.github} />
      <About about={content.about} />
      <Certificates />
      <Contact contact={content.contact} hero={content.hero} />
    </>
  );
}
