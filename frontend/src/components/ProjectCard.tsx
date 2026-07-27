type Props = {
  title: string;
  status: string;
};

export default function ProjectCard({
  title,
  status,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-400">
        Status: {status}
      </p>
    </div>
  );
}