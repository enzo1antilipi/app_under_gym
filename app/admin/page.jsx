import AdminStatCard from "@/components/admin/AdminStatCard";
import { getFirebaseConnectionStatus } from "@/lib/firebase/status";
import { getProfessors } from "@/lib/repositories/professors";
import { getRatings } from "@/lib/repositories/ratings";
import styles from "./admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [connection, professorsResult, ratingsResult] = await Promise.all([
    getFirebaseConnectionStatus(),
    getProfessors(),
    getRatings(),
  ].map(async (operation) => {
    try {
      return { ok: true, value: await operation };
    } catch {
      return { ok: false, value: [] };
    }
  }));

  const firebaseStatus = connection.ok
    ? connection.value
    : { connected: false, message: "No se pudo comprobar la conexión." };
  const professors = professorsResult.value;
  const ratings = ratingsResult.value;
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

      <section
        className={`${styles.connectionBanner} ${
          firebaseStatus.connected
            ? styles.connectionOnline
            : styles.connectionOffline
        }`}
        role="status"
      >
        <span className={styles.connectionDot} aria-hidden="true" />
        <div>
          <strong>
            Base de datos: {firebaseStatus.connected ? "conectada" : "sin conexión"}
          </strong>
          <p>{firebaseStatus.message}</p>
        </div>
      </section>

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
