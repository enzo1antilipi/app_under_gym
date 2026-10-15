import { getRatings } from "@/lib/repositories/ratings";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminRatingsPage() {
  const ratings = await getRatings();

  return (
    <>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Administración</p>
        <h1>Calificaciones</h1>
        <p>Revisión y moderación de las calificaciones recibidas.</p>
      </header>

      <section className={styles.placeholder}>
        <h2>{ratings.length} calificaciones cargadas</h2>
        <div className={styles.mockList}>
          {ratings.map((rating) => (
            <article className={styles.mockRow} key={rating.id}>
              <div>
                <strong>{rating.professorName}</strong>
                <p>{rating.comment}</p>
              </div>
              <div className={styles.ratingMeta}>
                <strong>{rating.score}/5</strong>
                <span data-status={rating.status}>{rating.status}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
