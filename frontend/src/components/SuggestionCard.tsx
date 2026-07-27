export default function SuggestionCard() {
  const suggestions = [
    "Validate customer problem before adding features.",
    "Focus on completing MVP in the next sprint.",
    "Reduce infrastructure costs by caching AI responses.",
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-semibold">
        🤖 AI CTO Suggestions
      </h2>

      <ul className="mt-6 space-y-4">
        {suggestions.map((item) => (
          <li
            key={item}
            className="rounded-lg bg-slate-800 p-4"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}