import HomeIntro from "@/components/HomeIntro";
import ProfessorGrid from "@/components/ProfessorGrid";
import SiteHeader from "@/components/SiteHeader";
import { professors } from "@/data/professors";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeIntro />
        <ProfessorGrid professors={professors} />
      </main>
    </>
  );
}
