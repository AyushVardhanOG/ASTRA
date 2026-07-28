import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProjectOverview from "../components/ProjectOverview";
import AIOutputPanel from "../components/AIOutputPanel";

import { getProject } from "../services/projectService";
import { generatePlan } from "../services/astraService";

import type { Project } from "../types/project";

export default function ProjectPage() {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);

  const [idea, setIdea] = useState("");
  const [problem, setProblem] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  useEffect(() => {
    async function loadProject() {
      if (!id) return;

      try {
        const data = await getProject(Number(id));

        setProject(data);

        // Restore the complete workspace
        setIdea(data.idea ?? "");
        setProblem(data.problem ?? "");
        setAudience(data.audience ?? "");
        setGoal(data.goal ?? "");
        setBudget(data.budget ?? "");
        setTimeline(data.timeline ?? "");
        setPlan(data.ai_report ?? "");
      } catch (err) {
        console.error(err);
      }
    }

    loadProject();
  }, [id]);

  async function handleGenerate() {
    if (
      !idea ||
      !problem ||
      !audience ||
      !goal ||
      !budget ||
      !timeline
    ) {
      alert("Please complete all fields before generating the AI plan.");
      return;
    }

    setLoading(true);

    try {
      const response = await generatePlan({
        project_id: Number(id),
        idea,
        problem,
        audience,
        goal,
        budget,
        timeline,
      });

      setPlan(response.plan);
    } catch (err) {
      console.error(err);
      alert("Failed to generate AI plan.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!plan) return;

    try {
      await navigator.clipboard.writeText(plan);
    } catch (err) {
      console.error(err);
      alert("Failed to copy report.");
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">{project.name}</h1>

            <p className="mt-2 text-slate-400">
              Status: {project.status}
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7">
              <ProjectOverview
                idea={idea}
                problem={problem}
                audience={audience}
                goal={goal}
                budget={budget}
                timeline={timeline}
                setIdea={setIdea}
                setProblem={setProblem}
                setAudience={setAudience}
                setGoal={setGoal}
                setBudget={setBudget}
                setTimeline={setTimeline}
                onGenerate={handleGenerate}
                loading={loading}
              />
            </div>

            <div className="col-span-5">
              <AIOutputPanel
                plan={plan}
                loading={loading}
                onCopy={handleCopy}
                onRegenerate={handleGenerate}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}