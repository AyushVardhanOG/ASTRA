import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-slate-800 p-8">
        <h1 className="text-4xl font-bold">
          Project #{id}
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome to your AI CTO workspace.
        </p>
      </div>

      <div className="p-8">
        <div className="rounded-xl bg-slate-900 p-8 border border-slate-800">
          🚀 This is where ASTRA will manage your startup.
        </div>
      </div>
    </div>
  );
}