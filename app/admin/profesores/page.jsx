import { getProfessors } from "@/lib/repositories/professors";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminProfessorsPage() {
  const professors = await getProfessors();

  return (
    <>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Administración</p>
        <h1>Profesores</h1>
        <p>Alta, edición, búsqueda y baja de profesores.</p>
      </header>

      <section className={styles.placeholder}>
        <h2>{professors.length} profesores cargados</h2>
        <div className={styles.mockList}>
          {professors.map((professor) => (
            <article className={styles.mockRow} key={professor.id}>
              <div>
                <strong>{professor.name}</strong>
                <p>{professor.subject}</p>
              </div>
              <span data-status={professor.status}>
                {professor.status === "active" ? "Activo" : "Inactivo"}
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
