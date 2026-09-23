import Link from "next/link";
import styles from "./AdminStatCard.module.css";

export default function AdminStatCard({ label, value, href }) {
  const content = (
    <>
      <span className={styles.label}>{label}</span>
      <strong className={styles.value}>{value}</strong>
      {href && <span className={styles.action}>Ver detalle →</span>}
    </>
  );

  if (href) {
    return (
      <Link className={styles.card} href={href}>
        {content}
      </Link>
    );
  }

  return <article className={styles.card}>{content}</article>;
}
