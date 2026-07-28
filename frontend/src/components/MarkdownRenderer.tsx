import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-200 prose-li:text-slate-200 prose-strong:text-white prose-code:text-emerald-400">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}