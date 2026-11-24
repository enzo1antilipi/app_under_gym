import { getRatings } from "@/lib/repositories/ratings";
import AdminRatingsClient from "@/components/admin/calificaciones/AdminRatingsClient";
import styles from "../admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminRatingsPage() {
  let ratings = [];
  let error = null;

  // Estado de carga y error manejado en el servidor
  try {
    ratings = await getRatings();
  } catch (err) {
    error = "Ocurrió un error al cargar las calificaciones.";
  }

  // Estado de Error
  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Administración</p>
        <h1>Calificaciones</h1>
        <p>Revisión y moderación de las calificaciones recibidas.</p>
      </header>

      <section className={styles.placeholder}>
        <h2>{ratings.length} calificaciones cargadas</h2>
        
        {/* Renderiza el componente interactivo con la tabla, filtros y acciones */}
        <AdminRatingsClient initialRatings={ratings} />
      </section>
    </div>
  );
}