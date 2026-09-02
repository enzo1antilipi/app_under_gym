import ProfessorCard from "./ProfessorCard";

export default function ProfessorGrid({ professors }) {
  if (professors.length === 0) return <p>Todavía no hay profesores cargados.</p>;

  return (
    <section>
      {professors.map((professor) => (
        <ProfessorCard key={professor.id} professor={professor} />
      ))}
    </section>
  );
}
