import { Prompt } from "../ui/Prompt";
import { Icon } from "../ui/Icon";
import styles from "./footer.module.css";
export default function Footer() {
  return <footer className={styles.footer}><div className={"container "+styles.container}><a href="#hero" aria-label="Sayfa başına dön"><Prompt command="exit"/></a><p>© {new Date().getFullYear()} — Tasarlandı ve geliştirildi <Icon name="heart" size={12}/> ile.</p></div></footer>;
}
