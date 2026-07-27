import { Link } from "react-router-dom";

type Props = {
  title: string;
  status: string;
  id?: number;
};

export default function ProjectCard({
  title,
  status,
  id,
}: Props) {
  return (
    <Link to={`/project/${id}`}>
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500 hover:scale-[1.02] cursor-pointer">
        <h3 className="text-2xl font-semibold">
          {title}
        </h3>

        <p className="mt-4 text-slate-400">
          Status: {status}
        </p>
      </div>
    </Link>
  );
}