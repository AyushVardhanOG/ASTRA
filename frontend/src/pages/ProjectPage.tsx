import { useParams } from "react-router-dom";

import ProjectHeader from "../components/ProjectHeader";
import ProjectTabs from "../components/ProjectTabs";
import ProgressCard from "../components/ProgressCard";
import SuggestionCard from "../components/SuggestionCard";
import ActivityCard from "../components/ActivityCard";

export default function ProjectPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ProjectHeader title={`Project #${id}`} />

      <main className="mx-auto max-w-7xl p-8">
        <ProjectTabs />

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <ProgressCard />

          <SuggestionCard />
        </div>

        <div className="mt-8">
          <ActivityCard />
        </div>
      </main>
    </div>
  );
}