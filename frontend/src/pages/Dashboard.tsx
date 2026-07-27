export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold text-indigo-400 mb-10">
        ASTRA
      </h1>

      <nav className="space-y-3">
        <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-800">
          🏠 Dashboard
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-800">
          📁 Projects
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-800">
          🤖 AI Agents
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left hover:bg-slate-800">
          ⚙️ Settings
        </button>
      </nav>
    </aside>
  );
}