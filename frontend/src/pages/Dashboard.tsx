import { useEffect, useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";
import NewProjectModal from "../components/NewProjectModal";

import {
  getProjects,
} from "../services/projectService";

import type { Project } from "../types/project";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1">
        <Header onNewProject={() => setOpen(true)} />

        <main className="p-10">
          <h2 className="text-4xl font-bold">
            Welcome back 👋
          </h2>

          <p className="mt-2 text-slate-400">
            Manage all your startup projects with ASTRA AI.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.name}
                  status={project.status}
                />
              ))
            ) : (
              <div className="text-slate-400">
                No projects found. Create your first project 🚀
              </div>
            )}
          </div>
        </main>
      </div>

      <NewProjectModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={loadProjects}
      />
    </div>
  );
}