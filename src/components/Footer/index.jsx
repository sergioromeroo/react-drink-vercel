import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`py-4 ${styles.footer}`}>
      <small>Drinks app</small>
    </footer>
  );
}
