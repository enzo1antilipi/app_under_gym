import RatingPanel from "@/components/RatingPanel";
import { professors } from "@/data/professors";
import { notFound } from "next/navigation";

export default async function RatingPage({ params }) {
  const { id } = await params;
  const professor = professors.find((item) => String(item.id) === id);

  if (!professor) notFound();

  return <RatingPanel professor={professor} />;
}
