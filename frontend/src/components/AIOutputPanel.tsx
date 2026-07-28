import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

import {
  exportPDF,
  exportMarkdown,
  exportText,
} from "../utils/exportUtils";

interface AIOutputPanelProps {
  projectName: string;
  plan: string;
  loading: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}

export default function AIOutputPanel({
  projectName,
  plan,
  loading,
  onCopy,
  onRegenerate,
}: AIOutputPanelProps) {
  const [copied, setCopied] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

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

        <div className="flex gap-3 items-center">

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

          <div className="relative">

            <button
              disabled={!plan}
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium hover:bg-amber-500 disabled:bg-slate-700"
            >
              ⬇️ Export
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-700 bg-slate-800 shadow-xl z-50">

                <button
                  onClick={() => {
                    exportPDF(projectName, plan);
                    setShowExportMenu(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-700"
                >
                  📄 Export PDF
                </button>

                <button
                  onClick={() => {
                    exportMarkdown(projectName, plan);
                    setShowExportMenu(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-700"
                >
                  📝 Export Markdown
                </button>

                <button
                  onClick={() => {
                    exportText(projectName, plan);
                    setShowExportMenu(false);
                  }}
                  className="block w-full text-left px-4 py-3 hover:bg-slate-700"
                >
                  📃 Export Text
                </button>

              </div>
            )}

          </div>

        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">

        {!plan ? (
          <p className="text-slate-400 leading-8">
            Your AI-generated startup strategy will appear here after clicking
            <strong> Generate AI CTO Plan</strong>.
          </p>
        ) : (
          <MarkdownRenderer
            content={plan}
          />
        )}

      </div>

    </div>
  );
}