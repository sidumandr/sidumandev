import type { SkillGroupData } from "@/types/portfolio";
import { TagList } from "../ui/TagList";
import styles from "./about.module.css";
export function SkillGroup({group}:{group:SkillGroupData}) {
  return <div className={styles.skillGroup}><h3><span aria-hidden="true">&gt; </span>{group.title}</h3><TagList items={group.skills}/></div>;
}
