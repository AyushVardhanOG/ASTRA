import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};

export default function ProjectHeader({ title }: Props) {
  const navigate = useNavigate();

  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <div>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            ← Back to Dashboard
          </button>

          <h1 className="mt-3 text-4xl font-bold">
            {title}
          </h1>

          <p className="mt-2 text-slate-400">
            Your AI CTO workspace.
          </p>
        </div>

        <button className="rounded-lg bg-indigo-600 px-5 py-2 font-medium hover:bg-indigo-500">
          Generate AI Plan
        </button>
      </div>
    </header>
  );
}