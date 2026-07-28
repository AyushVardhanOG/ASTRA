import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block w-full rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "hover:bg-slate-800 text-slate-200"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold text-indigo-400 mb-10">
        ASTRA
      </h1>

      <nav className="space-y-3">
        <NavLink to="/" className={linkClass}>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/projects" className={linkClass}>
          📁 Projects
        </NavLink>

        <NavLink to="/agents" className={linkClass}>
          🤖 AI Agents
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          ⚙️ Settings
        </NavLink>
      </nav>
    </aside>
  );
}