import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "./admin.module.css";

export const metadata = {
  title: "Administración | UnderGym",
};

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminShell}>
      <AdminSidebar />
      <main className={styles.adminContent}>{children}</main>
    </div>
  );
}
