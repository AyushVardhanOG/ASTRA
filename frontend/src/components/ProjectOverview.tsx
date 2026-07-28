type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

type ProjectOverviewProps = {
  idea: string;
  problem: string;
  audience: string;
  goal: string;
  budget: string;
  timeline: string;

  setIdea: (value: string) => void;
  setProblem: (value: string) => void;
  setAudience: (value: string) => void;
  setGoal: (value: string) => void;
  setBudget: (value: string) => void;
  setTimeline: (value: string) => void;

  onGenerate: () => void;
  loading: boolean;
};

function Field({
  label,
  value,
  onChange,
  placeholder,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="font-medium">{label}</label>

      <textarea
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 outline-none focus:border-indigo-500 resize-none"
      />
    </div>
  );
}

export default function ProjectOverview({
  idea,
  problem,
  audience,
  goal,
  budget,
  timeline,

  setIdea,
  setProblem,
  setAudience,
  setGoal,
  setBudget,
  setTimeline,

  onGenerate,
  loading,
}: ProjectOverviewProps) {
  return (
    <div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold">
        Startup Overview
      </h2>

      <Field
        label="Startup Idea"
        value={idea}
        onChange={setIdea}
        placeholder="Describe your startup idea..."
      />

      <Field
        label="Problem Statement"
        value={problem}
        onChange={setProblem}
        placeholder="What problem are you solving?"
      />

      <Field
        label="Target Audience"
        value={audience}
        onChange={setAudience}
        placeholder="Who will use this?"
      />

      <Field
        label="Business Goal"
        value={goal}
        onChange={setGoal}
        placeholder="Main business objective..."
      />

      <Field
        label="Budget"
        value={budget}
        onChange={setBudget}
        placeholder="Example: £5,000"
      />

      <Field
        label="Timeline"
        value={timeline}
        onChange={setTimeline}
        placeholder="Example: 3 months"
      />

      <button
        onClick={onGenerate}
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Generating AI Plan..." : "Generate AI CTO Plan"}
      </button>

    </div>
  );
}