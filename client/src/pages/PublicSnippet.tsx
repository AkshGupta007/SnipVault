import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CodeViewer from "../components/CodeViewer";
import api from "../api/axios";
import { Snippet } from "../types";

const LANG_COLORS: Record<string, string> = {
  javascript: "bg-yellow-500/20 text-yellow-400",
  typescript: "bg-blue-500/20 text-blue-400",
  python: "bg-green-500/20 text-green-400",
  css: "bg-pink-500/20 text-pink-400",
  html: "bg-orange-500/20 text-orange-400",
  java: "bg-red-500/20 text-red-400",
  default: "bg-gray-500/20 text-gray-400",
};

const PublicSnippet = () => {
  const { slug } = useParams();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/snippets/public/${slug}`);
        setSnippet(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleCopy = () => {
    if (!snippet) return;
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  // Not found
  if (notFound || !snippet) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
        <p className="text-white text-lg font-semibold">Snippet not found</p>
        <p className="text-gray-500 text-sm">
          This link may be invalid or the snippet was made private.
        </p>
        <Link
          to="/dashboard"
          className="text-indigo-400 hover:underline text-sm"
        >
          Go to SnipVault
        </Link>
      </div>
    );
  }

  const langColor = LANG_COLORS[snippet.language] || LANG_COLORS.default;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Minimal top bar */}
      <div className="border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-white font-bold text-lg tracking-tight"
        >
          Snip<span className="text-indigo-400">Vault</span>
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-lg transition"
        >
          Save your own snippets →
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-white text-2xl font-semibold">
              {snippet.title}
            </h1>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-mono ${langColor}`}
            >
              {snippet.language}
            </span>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              public
            </span>
          </div>
          {snippet.description && (
            <p className="text-gray-400 text-sm">{snippet.description}</p>
          )}
        </div>

        {/* Tags */}
        {snippet.tags?.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-5">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Copy button */}
        <div className="mb-4">
          <button
            onClick={handleCopy}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            {copied ? "✓ Copied!" : "Copy Code"}
          </button>
        </div>

        {/* Code */}
        <div className="rounded-xl overflow-hidden border border-gray-800">
          <CodeViewer code={snippet.code} language={snippet.language} />
        </div>

        {/* Meta */}
        <p className="text-gray-600 text-xs mt-4">
          Shared via SnipVault ·{" "}
          {new Date(snippet.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default PublicSnippet;
