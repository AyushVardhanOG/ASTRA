import { useEffect, useRef, useState } from "react";

import { streamMessage } from "../services/chatService";
import MarkdownRenderer from "./MarkdownRenderer";

import type { ChatMessage } from "../types/chat";

interface AIChatProps {
  projectId: number;
}

const quickActions = [
  "💰 Funding Strategy",
  "📈 Marketing Strategy",
  "🎯 Go-To-Market",
  "💵 Pricing Strategy",
  "📊 SWOT Analysis",
  "⚠ Risk Assessment",
];

export default function AIChat({
  projectId,
}: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function ask(question: string) {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
      {
        role: "assistant",
        content: "",
      },
    ]);

    setLoading(true);

    try {
      await streamMessage(
        {
          project_id: projectId,
          message: question,
        },
        (chunk) => {
          setMessages((prev) => {
            const updated = [...prev];

            const last = updated.length - 1;

            updated[last] = {
              ...updated[last],
              content: updated[last].content + chunk,
            };

            return updated;
          });
        }
      );
    } catch (err) {
      console.error(err);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Sorry, something went wrong while generating a response.",
        };

        return updated;
      });
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  function handleSend() {
    ask(input);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-5 text-2xl font-bold">
        🤖 AI Startup Advisor
      </h2>

      <div className="mb-5 flex flex-wrap gap-2">
        {quickActions.map((action) => (
          <button
            key={action}
            onClick={() => ask(action)}
            className="rounded-lg bg-slate-800 px-3 py-2 text-sm transition hover:bg-indigo-600"
          >
            {action}
          </button>
        ))}
      </div>

      <div className="mb-5 h-[500px] overflow-y-auto rounded-xl border border-slate-700 bg-slate-950 p-5">

        {messages.length === 0 && (
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <h3 className="mb-3 text-xl font-semibold">
              👋 Welcome to ASTRA
            </h3>

            <p className="mb-3 text-slate-300">
              I'm your AI Startup Advisor.
            </p>

            <p className="mb-4 text-slate-400">
              I already understand:
            </p>

            <ul className="space-y-2 text-slate-300">
              <li>✅ Your startup idea</li>
              <li>✅ Business goals</li>
              <li>✅ Target audience</li>
              <li>✅ Budget & timeline</li>
              <li>✅ AI CTO report</li>
            </ul>

            <p className="mt-6 text-slate-400">
              Ask me anything about your startup.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-6 flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-5 py-4 ${
                message.role === "user"
                  ? "bg-indigo-600"
                  : "border border-slate-700 bg-slate-900"
              }`}
            >
              <div className="mb-2 text-sm font-semibold">
                {message.role === "user"
                  ? "🧑 You"
                  : "🤖 ASTRA"}
              </div>

              {message.role === "assistant" ? (
                <>
                  <MarkdownRenderer
                    content={message.content}
                  />

                  {loading &&
                    index === messages.length - 1 && (
                      <span className="animate-pulse text-indigo-400">
                        ▌
                      </span>
                    )}
                </>
              ) : (
                <p className="whitespace-pre-wrap">
                  {message.content}
                </p>
              )}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />

      </div>

      <div className="flex gap-3">

        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your startup..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 p-3 outline-none focus:border-indigo-500"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-6 font-semibold transition hover:bg-indigo-700 disabled:opacity-50"
        >
          Send
        </button>

      </div>

    </div>
  );
}