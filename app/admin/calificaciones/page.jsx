import { getRatings } from "@/lib/repositories/ratings";
import styles from "../admin.module.css";
// Si creas un componente cliente para la interactividad, puedes importarlo aquí, 
// o estructurar la tabla directamente si prefieres manejarlo de forma local.

export const dynamic = "force-dynamic";

export default async function AdminRatingsPage() {
  const ratings = await getRatings();

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Administración</p>
        <h1>Calificaciones</h1>
        <p>Revisión y moderación de las calificaciones recibidas.</p>
      </header>

      <section className={styles.placeholder}>
        <h2>{ratings.length} calificaciones cargadas</h2>

        {/* Aquí puedes incorporar la estructura de tabla o los elementos que pide tu consigna */}
        <div className={styles.mockList}>
          {ratings.map((rating) => (
            <article className={styles.mockRow} key={rating.id}>
              <div>
                <strong>{rating.professorName}</strong>
                <p>{rating.comment}</p>
                {/* Agregando autor y fecha como pide la actividad */}
                <small style={{ color: '#888' }}>Por {rating.author} el {rating.date || "Fecha no especificada"}</small>
              </div>
              <div className={styles.ratingMeta}>
                <strong>{rating.score}/5</strong>
                <span data-status={rating.status}>{rating.status}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}