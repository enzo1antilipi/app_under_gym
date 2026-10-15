import RatingPanel from "@/components/RatingPanel";
import { getProfessorById } from "@/lib/repositories/professors";
import { notFound } from "next/navigation";

export default async function RatingPage({ params }) {
  const { id } = await params;
  const professor = await getProfessorById(id);

  if (!professor) notFound();

  return <RatingPanel professor={professor} />;
}
