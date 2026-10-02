import ProfessorCard from "./ProfessorCard";
import styles from "./ProfessorGrid.module.css";

export default function ProfessorGrid({ professors }) {
  return (
    <section className={styles.grid}>
      <h1>PROFESORES</h1>

      {professors.map((professor) => (
        <ProfessorCard
          key={professor.id}
          professor={professor}
        />
      ))}
    </section>
  );
}