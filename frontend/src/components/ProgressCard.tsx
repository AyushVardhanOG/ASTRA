export default function ProgressCard() {
  const stages = [
    "Idea",
    "Market Research",
    "MVP",
    "Beta Launch",
    "Funding",
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-semibold">
        Startup Progress
      </h2>

      <div className="mt-6 space-y-3">
        {stages.map((stage, index) => (
          <div
            key={stage}
            className="flex items-center gap-3"
          >
            <div
              className={`h-3 w-3 rounded-full ${
                index < 2
                  ? "bg-green-500"
                  : "bg-slate-600"
              }`}
            />

            <span>{stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}