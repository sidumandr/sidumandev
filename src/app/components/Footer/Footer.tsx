import { Code2, Heart } from "lucide-react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Code2 size={18} strokeWidth={2.5} />
          <span>siduman</span>
        </div>
        <p className={styles.copy}>
          © {new Date().getFullYear()} — Tasarlandı ve geliştirildi{" "}
          <Heart size={13} className={styles.heart} /> ile.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
