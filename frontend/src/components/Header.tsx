type Props = {
  onNewProject: () => void;
};

export default function Header({ onNewProject }: Props) {
  return (
    <header className="border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <h1 className="text-2xl font-bold text-indigo-400">
          ASTRA AI
        </h1>

        <button
          onClick={onNewProject}
          className="rounded-lg bg-indigo-600 px-5 py-2 font-medium hover:bg-indigo-500 transition"
        >
          + New Project
        </button>
      </div>
    </header>
  );
}