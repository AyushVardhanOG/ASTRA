import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface AIOutputPanelProps {
  plan: string;
  loading: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

export default function AIOutputPanel({
  plan,
  loading,
  onCopy,
  onRegenerate,
}: AIOutputPanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyClick() {
    await onCopy();

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 h-[80vh] flex flex-col">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          AI CTO Output
        </h2>

        <div className="flex gap-3">

          <button
            onClick={handleCopyClick}
            disabled={!plan}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 disabled:bg-slate-700"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>

          <button
            onClick={onRegenerate}
            disabled={loading}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 disabled:bg-slate-700"
          >
            {loading ? "Generating..." : "🔄 Regenerate"}
          </button>

        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {!plan ? (
          <p className="text-slate-400 leading-8">
            Your AI-generated startup strategy will appear here after clicking
            <strong> Generate AI CTO Plan</strong>.
          </p>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{plan}</ReactMarkdown>
          </div>
        )}
      </div>

    </div>
  );
}