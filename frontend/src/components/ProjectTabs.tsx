export default function ProjectTabs() {
  const tabs = [
    "Overview",
    "Roadmap",
    "Tasks",
    "Chat",
    "Documents",
  ];

  return (
    <div className="flex gap-4 border-b border-slate-800 py-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className="rounded-lg px-4 py-2 hover:bg-slate-800 transition"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}