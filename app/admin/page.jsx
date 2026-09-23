import AdminStatCard from "@/components/admin/AdminStatCard";
import { professors } from "@/data/professors";
import { ratings } from "@/data/ratings";
import styles from "./admin.module.css";

export default function AdminPage() {
  const average = ratings.length
    ? (ratings.reduce((total, rating) => total + rating.score, 0) / ratings.length).toFixed(1)
    : "—";
  const ratingCountByProfessor = ratings.reduce((counts, rating) => {
    counts[rating.professorName] = (counts[rating.professorName] ?? 0) + 1;
    return counts;
  }, {});
  const mostRated = Object.entries(ratingCountByProfessor).sort(
    ([, firstCount], [, secondCount]) => secondCount - firstCount,
  )[0]?.[0] ?? "—";
  const bestProfessor = professors
    .map((professor) => {
      const professorRatings = ratings.filter((rating) => rating.professorId === professor.id);
      const score = professorRatings.length
        ? professorRatings.reduce((total, rating) => total + rating.score, 0) / professorRatings.length
        : 0;
      return { name: professor.name, score };
    })
    .sort((first, second) => second.score - first.score)[0]?.name ?? "—";

  return (
    <>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Administración</p>
        <h1>Resumen general</h1>
        <p>Desde acá vas a poder administrar profesores y calificaciones.</p>
      </header>

      <section className={styles.statsGrid} aria-label="Resumen del sistema">
        <AdminStatCard
          label="Votos"
          value={ratings.length}
          href="/admin/calificaciones"
        />
        <AdminStatCard
          label="Promedio general"
          value={average}
        />
        <AdminStatCard label="Mejor profesor" value={bestProfessor} />
        <AdminStatCard label="Más votado" value={mostRated} href="/admin/profesores" />
      </section>

      <section className={styles.notice}>
        <h2>Panel inicial listo</h2>
        <p>
          Los módulos de profesores y calificaciones están separados para que
          el equipo pueda desarrollarlos en paralelo.
        </p>
      </section>
    </>
  );
}
