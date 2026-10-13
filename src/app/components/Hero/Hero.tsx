import { identity } from "@/data/identity";
import { profile } from "@/data/profile";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { JsonBlock } from "../ui/JsonBlock";
import { Prompt } from "../ui/Prompt";
import { TextLink } from "../ui/TextLink";
import { Window } from "../ui/Window";
import { TerminalBackground } from "./TerminalBackground";
import styles from "./hero.module.css";
export default function Hero() {
  return <section className={styles.hero} id="hero" aria-labelledby="hero-title"><TerminalBackground/><div className={"container "+styles.container}><div className={styles.layout}><div className={styles.session}><div className={styles.whoami}><Prompt command="whoami"/></div><h1 id="hero-title" className={styles.name}>Safa İlhan<br/>Duman<span className={styles.cursor} aria-hidden="true"/></h1><div className={styles.role}><Prompt command="cat rol.txt"/><p><span aria-hidden="true">&gt; </span>{identity.role}</p></div><p className={styles.slogan}>Kod yazıyorum, <mark>deneyim</mark> inşa ediyorum.</p><p className={styles.description}>Frontend&apos;den backend&apos;e uzanan bir yelpazede modern, hızlı ve kullanıcı odaklı uygulamalar geliştiriyorum.</p><div className={styles.actions}><Button href="#projects" variant="primary">Projeleri gör <Icon name="down"/></Button><Button href="#contact">İletişime geç</Button></div><div className={styles.socials}><TextLink href={identity.github} external bracket>github</TextLink><TextLink href={identity.linkedin} external bracket>linkedin</TextLink><TextLink href={"mailto:"+identity.email} bracket>e-posta</TextLink></div></div><Window title="profil.json" meta="json" className={styles.profile}><JsonBlock entries={profile}/></Window></div><a href="#about" className={styles.scrollHint}><span aria-hidden="true">↓ </span>aşağı kaydır <span aria-hidden="true">↓</span></a></div></section>;
}
