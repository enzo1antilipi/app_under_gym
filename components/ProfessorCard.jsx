import Link from "next/link";
import styles from "./ProfessorCard.module.css";

export default function ProfessorCard({ professor }) {
  return (
    <Link
      href={`/calificar/${professor.id}`}
      className={styles.card}
    >
      {professor.imageUrl ? (
        <img
          src={professor.imageUrl}
          alt={professor.name}
          className={styles.image}
        />
      ) : (
        <div className={styles.initial}>
          {professor.name.charAt(0)}
        </div>
      )}

      <div className={styles.info}>
        <h2>{professor.name}</h2>
        <p>{professor.area}</p>
      </div>
    </Link>
  );
}