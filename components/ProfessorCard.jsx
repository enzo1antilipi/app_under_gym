import Link from "next/link";

export default function ProfessorCard({ professor }) {
  return (
    <article>
      <h2>{professor.name}</h2>
      <Link href={`/calificar/${professor.id}`}>Calificar</Link>
    </article>
  );
}
