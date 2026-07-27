export default function ActivityCard() {
  const activity = [
    "Project created",
    "Roadmap generated",
    "AI analysis completed",
    "Tasks updated",
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-semibold">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-4">
        {activity.map((item) => (
          <div
            key={item}
            className="rounded-lg bg-slate-800 p-4"
          >
            ✅ {item}
          </div>
        ))}
      </div>
    </div>
  );
}