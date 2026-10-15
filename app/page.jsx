import HomeIntro from "@/components/HomeIntro";
import ProfessorGrid from "@/components/ProfessorGrid";
import SiteHeader from "@/components/SiteHeader";
import { getProfessors } from "@/lib/repositories/professors";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const professors = await getProfessors();

  return (
    <>
      <SiteHeader />
      <main>
        <HomeIntro/>
        <ProfessorGrid professors={professors} />
      </main>
    </>
  );
}
