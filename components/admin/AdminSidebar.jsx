import Link from "next/link";
import styles from "./AdminSidebar.module.css";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/profesores", label: "Profesores" },
  { href: "/admin/calificaciones", label: "Calificaciones" },
];

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <Link className={styles.brand} href="/admin">
        UnderGym Admin
      </Link>
      <nav aria-label="Navegación de administración">
        <ul className={styles.navigation}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link className={styles.backLink} href="/">
        Volver al sitio
      </Link>
    </aside>
  );
}
