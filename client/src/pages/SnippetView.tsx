// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import CodeViewer from "../components/CodeViewer";
// import api from "../api/axios";
// import { Snippet } from "../types";

// const LANG_COLORS: Record<string, string> = {
//   javascript: "bg-yellow-500/20 text-yellow-400",
//   typescript: "bg-blue-500/20 text-blue-400",
//   python: "bg-green-500/20 text-green-400",
//   css: "bg-pink-500/20 text-pink-400",
//   html: "bg-orange-500/20 text-orange-400",
//   java: "bg-red-500/20 text-red-400",
//   default: "bg-gray-500/20 text-gray-400",
// };

// const SnippetView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [snippet, setSnippet] = useState<Snippet | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const [shareMsg, setShareMsg] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const { data } = await api.get(`/snippets/${id}`);
//         setSnippet(data);
//       } catch {
//         navigate("/dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [id]);

//   const handleCopy = () => {
//     if (!snippet) return;
//     navigator.clipboard.writeText(snippet.code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleShare = () => {
//     if (!snippet?.slug) return;
//     const url = `${window.location.origin}/s/${snippet.slug}`;
//     navigator.clipboard.writeText(url);
//     setShareMsg("Link copied!");
//     setTimeout(() => setShareMsg(""), 2000);
//   };

//   const handleStar = async () => {
//     if (!snippet) return;
//     await api.patch(`/snippets/${snippet._id}/star`);
//     setSnippet({ ...snippet, isStarred: !snippet.isStarred });
//   };

//   const handleDelete = async () => {
//     if (!confirm("Delete this snippet?")) return;
//     await api.delete(`/snippets/${id}`);
//     navigate("/dashboard");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-950">
//         <Navbar />
//         <div className="text-gray-500 text-sm p-8">Loading...</div>
//       </div>
//     );
//   }

//   if (!snippet) return null;

//   const langColor = LANG_COLORS[snippet.language] || LANG_COLORS.default;

//   return (
//     <div className="min-h-screen bg-gray-950">
//       <Navbar />

//       <div className="max-w-4xl mx-auto px-6 py-8">
//         {/* Back */}
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="text-gray-500 hover:text-white text-sm mb-6 transition"
//         >
//           ← Back
//         </button>

//         {/* Header */}
//         <div className="flex items-start justify-between mb-4">
//           <div>
//             <div className="flex items-center gap-3 mb-1">
//               <h1 className="text-white text-2xl font-semibold">
//                 {snippet.title}
//               </h1>
//               <span
//                 className={`text-xs px-2 py-0.5 rounded-full font-mono ${langColor}`}
//               >
//                 {snippet.language}
//               </span>
//               {snippet.isPublic && (
//                 <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
//                   public
//                 </span>
//               )}
//             </div>
//             {snippet.description && (
//               <p className="text-gray-400 text-sm">{snippet.description}</p>
//             )}
//           </div>
//         </div>

//         {/* Tags */}
//         {snippet.tags?.length > 0 && (
//           <div className="flex gap-2 flex-wrap mb-5">
//             {snippet.tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full"
//               >
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Action bar */}
//         <div className="flex items-center gap-3 mb-4">
//           <button
//             onClick={handleCopy}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
//           >
//             {copied ? "✓ Copied!" : "Copy Code"}
//           </button>

//           <button
//             onClick={handleStar}
//             className={`text-sm px-4 py-2 rounded-lg border transition ${
//               snippet.isStarred
//                 ? "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
//                 : "border-gray-700 text-gray-400 hover:border-gray-500"
//             }`}
//           >
//             {snippet.isStarred ? "⭐ Starred" : "☆ Star"}
//           </button>

//           <button
//             onClick={() => navigate(`/snippet/${id}/edit`)}
//             className="text-sm px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400 transition"
//           >
//             Edit
//           </button>

//           {snippet.isPublic && snippet.slug && (
//             <button
//               onClick={handleShare}
//               className="text-sm px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-400 transition"
//             >
//               {shareMsg || "🔗 Share"}
//             </button>
//           )}

//           <button
//             onClick={handleDelete}
//             className="text-sm px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-400 transition ml-auto"
//           >
//             Delete
//           </button>
//         </div>

//         {/* Code */}
//         <div className="rounded-xl overflow-hidden border border-gray-800">
//           <CodeViewer code={snippet.code} language={snippet.language} />
//         </div>

//         {/* Meta */}
//         <p className="text-gray-600 text-xs mt-4">
//           Created{" "}
//           {new Date(snippet.createdAt).toLocaleDateString("en-IN", {
//             day: "numeric",
//             month: "short",
//             year: "numeric",
//           })}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SnippetView;
import { useEffect, useMemo, useState, FormEvent, ReactNode, } from "react";
import {
  ArrowLeft,
  Copy,
  Check,
  Star,
  Pencil,
  Share2,
  Trash2,
  Lock,
  Globe2,
  Tag as TagIcon,
  Plus,
  X,
  Calendar,
  Clock,
  Eye,
  GitFork,
  Flame,
  TerminalSquare,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";
import api from "../api/axios";
type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "css"
  | "html"
  | "java"
  | string;

interface Snippet {
  _id: string;
  title: string;
  description?: string;
  language: Language;
  isPublic: boolean;
  isStarred: boolean;
  slug?: string;
  tags: string[];
  views: number;
  forks: number;
  createdAt: string;
  code: string;
}

interface LangMeta {
  color: string;
  label: string;
}

interface ChecklistItem {
  id: "title" | "lang" | "tags" | "visibility";
  label: string;
}

/* ----------------------------------------------------------------
   Design tokens — "Terminal glass" identity for a code-snippet tool
   Palette:  void #0A0B10, ink #11131A, glass white/5-10,
             signal indigo #6366F1, signal cyan #22D3EE, ember #F97316
   Type:     JetBrains-style mono for code/labels, system sans for body
   Signature: drifting aurora mesh behind frosted glass, a live
              "uptime" pulse dot, animated completion ring
------------------------------------------------------------------*/

const LANG_META: Record<string, LangMeta> = {
  javascript: { color: "#F7DF1E", label: "JavaScript" },
  typescript: { color: "#3B82F6", label: "TypeScript" },
  python: { color: "#34D399", label: "Python" },
  css: { color: "#F472B6", label: "CSS" },
  html: { color: "#FB923C", label: "HTML" },
  java: { color: "#F87171", label: "Java" },
  default: { color: "#A1A1AA", label: "Code" },
};

const MOCK_SNIPPET: Snippet = {
  _id: "snip_8841",
  title: "Debounced search hook",
  description: "Lightweight debounce wrapper for live search inputs, no deps.",
  language: "typescript",
  isPublic: true,
  isStarred: true,
  slug: "debounced-search-hook",
  tags: ["react", "hooks", "performance"],
  views: 1342,
  forks: 18,
  createdAt: "2026-04-12T10:30:00Z",
  code: `function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default useDebouncedValue;`,
};

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: "title", label: "Title set" },
  { id: "lang", label: "Language detected" },
  { id: "tags", label: "Tags added" },
  { id: "visibility", label: "Visibility chosen" },
];

type GlassButtonTone = "default" | "accent" | "warn" | "danger" | "success";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  tone?: GlassButtonTone;
  className?: string;
}


function GlassButton({
  children,
  onClick,
  tone = "default",
  className = "",
}: GlassButtonProps) {
  const tones: Record<GlassButtonTone, string> = {
    default:
      "border-white/10 text-zinc-300 hover:text-white hover:border-white/25 hover:bg-white/[0.06]",
    accent:
      "border-indigo-400/30 text-indigo-200 bg-indigo-500/10 hover:bg-indigo-500/20 hover:border-indigo-400/50",
    warn: "border-amber-400/30 text-amber-200 bg-amber-500/10 hover:bg-amber-500/20",
    danger:
      "border-white/10 text-zinc-400 hover:text-red-300 hover:border-red-400/40 hover:bg-red-500/10",
    success: "border-emerald-400/30 text-emerald-200 bg-emerald-500/10",
  };
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-[13px] font-medium
        backdrop-blur-md transition-all duration-200 active:scale-[0.97] ${tones[tone]} ${className}`}
    >
      {children}
    </button>
  );
}

export default function SnippetView() {
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [tagDraft, setTagDraft] = useState("");
  const [mounted, setMounted] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // useEffect(async () => {
  //   const t = setTimeout(() => {
  //       const { data } = await api.get(`/snippets/${id}`);
  //     setSnippet(data);
  //     setLoading(false);
  //     requestAnimationFrame(() => setMounted(true));
  //   }, 550);
  //   return () => clearTimeout(t);
  // }, []);
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/snippets/${id}`);
        console.log("snippet",data);
        setSnippet(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load snippet:", error);
      }
    };

    if (id) {
      load();
    }
  }, [id]); // dependency array

  const lang = LANG_META[snippet?.language ?? "default"] ?? LANG_META.default;

  const checklistDone = useMemo<Record<string, boolean>>(() => {
    if (!snippet) {
      return {
        title: false,
        lang: false,
        tags: false,
        visibility: false,
      };
    }
    return {
      title: Boolean(snippet.title),
      lang: Boolean(snippet.language),
      tags: snippet.tags?.length > 0,
      visibility: true,
    };
  }, [snippet]);

  const completion = useMemo(() => {
    const vals = Object.values(checklistDone);
    if (!vals.length) return 0;
    return Math.round((vals.filter(Boolean).length / vals.length) * 100);
  }, [checklistDone]);

  const handleCopy = () => {
    if (!snippet) return;
    navigator.clipboard?.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleShare = () => {
   
     if (!snippet?.slug) return;
   const shareUrl = `${window.location.origin}/s/${snippet.slug}`;
   console.log(shareUrl);

   navigator.clipboard.writeText(shareUrl);
    setShareMsg("Link copied");
    setTimeout(() => setShareMsg(""), 1800);
  };

  const toggleStar = () =>
    setSnippet((s) => (s ? { ...s, isStarred: !s.isStarred } : s));
  const toggleVisibility = () =>
    setSnippet((s) => (s ? { ...s, isPublic: !s.isPublic } : s));

  const addTag = (e: FormEvent) => {
  const handleShare = () => {
    if (!snippet?.slug) return;
   const shareUrl = `${window.location.origin}/s/${snippet.slug}`;
   console.log(shareUrl);

   navigator.clipboard.writeText(shareUrl);
    setShareMsg("Link copied");
    setTimeout(() => setShareMsg(""), 1800);
  };
  e.preventDefault();
    if (!snippet) return;
    const v = tagDraft.trim().replace(/^#/, "");
    if (!v || snippet.tags.includes(v)) return setTagDraft("");
    setSnippet((s) => (s ? { ...s, tags: [...s.tags, v] } : s));
    setTagDraft("");
  };

  const removeTag = (tag: string) =>
    setSnippet((s) =>
      s ? { ...s, tags: s.tags.filter((t) => t !== tag) } : s,
    );

    

  const codeLines = snippet?.code.split("\n") || [];

  const extension =
    snippet?.language === "typescript"
      ? "ts"
      : snippet?.language === "python"
        ? "py"
        : "js";





        const toggle = async () => {
          try {

            const { data } = await api.patch(
              `/snippets/${id}/visibility`,
            );

            setSnippet((prev) =>
              prev
                ? {
                    ...prev,
                    isPublic: data.isPublic,
                  }
                : prev,
            );
          } catch {
            alert("Failed to update visibility");
          }
        };
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#08090D] font-sans text-zinc-200">
      <style>{`
        @keyframes drift1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.08); } }
        @keyframes drift2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,40px) scale(1.12); } }
        @keyframes drift3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,50px) scale(0.95); } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: translateY(0); } }
        @keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.55);} 70% { box-shadow: 0 0 0 8px rgba(34,211,238,0);} }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes ringGrow { from { stroke-dashoffset: 226; } to { stroke-dashoffset: var(--ring-offset); } }
        .fade-up { animation: fadeUp .55s cubic-bezier(.22,.9,.32,1) both; }
        .skel { background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 37%, rgba(255,255,255,0.04) 63%); background-size: 400% 100%; animation: shimmer 1.4s ease infinite; }
      `}</style>

      {/* Animated aurora mesh background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -left-32 -top-40 h-[480px] w-[480px] rounded-full opacity-40 blur-[110px]"
          style={{
            background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
            animation: "drift1 16s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-[-120px] top-10 h-[420px] w-[420px] rounded-full opacity-30 blur-[110px]"
          style={{
            background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
            animation: "drift2 19s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-160px] left-1/3 h-[520px] w-[520px] rounded-full opacity-25 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #F97316 0%, transparent 70%)",
            animation: "drift3 22s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#08090D_75%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#08090D]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400">
              <TerminalSquare size={17} className="text-white" />
            </div>
            <span className="font-mono text-[15px] font-semibold tracking-tight text-white">
              SnipVault
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-cyan-400"
                style={{ animation: "pulseDot 1.8s ease-out infinite" }}
              />
            </span>
            synced just now
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Link to="/dashboard">
          <button className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-white">
            <ArrowLeft size={15} /> Back to dashboard
          </button>
        </Link>

        {loading || !snippet ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
            <div className="space-y-4">
              <div className="skel h-9 w-2/3 rounded-lg" />
              <div className="skel h-4 w-1/2 rounded-lg" />
              <div className="skel h-64 w-full rounded-2xl" />
            </div>
            <div className="skel h-80 w-full rounded-2xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
            {/* Main column */}
            <div className="min-w-0 space-y-5">
              {/* Header card */}
              <div className="fade-up rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
                <div className="mb-3 flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-semibold tracking-tight text-white">
                    {snippet.title}
                  </h1>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium"
                    style={{
                      color: lang.color,
                      borderColor: `${lang.color}33`,
                      background: `${lang.color}14`,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: lang.color }}
                    />
                    {lang.label}
                  </span>
                  <button
                    onClick={toggleVisibility}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                      snippet.isPublic
                        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                        : "border-white/10 bg-white/5 text-zinc-400"
                    }`}
                  >
                    {snippet.isPublic ? (
                      <Globe2 size={12} />
                    ) : (
                      <Lock size={12} />
                    )}
                    {snippet.isPublic ? "Public" : "Private"}
                  </button>
                </div>
                {snippet.description && (
                  <p className="mb-4 max-w-2xl text-[14px] leading-relaxed text-zinc-400">
                    {snippet.description}
                  </p>
                )}

                {/* Tag input */}
                <div className="flex flex-wrap items-center gap-2">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="group inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] text-zinc-400"
                    >
                      <TagIcon size={11} className="text-zinc-600" />
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-0.5 text-zinc-600 opacity-0 transition group-hover:opacity-100 hover:text-red-300"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                  <form
                    onSubmit={addTag}
                    className="inline-flex items-center gap-1 rounded-full border border-dashed border-white/15 px-2.5 py-1 focus-within:border-indigo-400/50"
                  >
                    <Plus size={11} className="text-zinc-600" />
                    <input
                      value={tagDraft}
                      onChange={(e) => setTagDraft(e.target.value)}
                      placeholder="add tag"
                      className="w-20 bg-transparent text-[12px] text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
                    />
                  </form>
                </div>
              </div>

              {/* Action bar */}
              <div
                className="fade-up flex flex-wrap items-center gap-2"
                style={{ animationDelay: "60ms" }}
              >
                <GlassButton onClick={handleCopy} tone="accent">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy code"}
                </GlassButton>
                <GlassButton
                  onClick={toggleStar}
                  tone={snippet.isStarred ? "warn" : "default"}
                >
                  <Star
                    size={14}
                    fill={snippet.isStarred ? "currentColor" : "none"}
                  />
                  {snippet.isStarred ? "Starred" : "Star"}
                </GlassButton>
                <GlassButton
                  tone="default"
                  onClick={() => navigate(`/snippet/${id}/edit`)}
                >
                  <Pencil size={14} /> Edit
                </GlassButton>
                {snippet.isPublic && (
                  <GlassButton
                    onClick={handleShare}
                    tone={shareMsg ? "success" : "default"}
                  >
                    {shareMsg ? <Check size={14} /> : <Share2 size={14} />}
                    {shareMsg || "Share"}
                  </GlassButton>
                )}
                <GlassButton tone="danger" className="ml-auto">
                  <Trash2 size={14} /> Delete
                </GlassButton>
              </div>

              {/* Code editor */}

              <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="font-mono text-[11px] text-zinc-500">
                  {snippet?.title.toLowerCase().replace(/\s+/g, "-")}.
                  {extension}
                </span>
                <span className="text-[11px] text-zinc-600">
                  {codeLines.length} lines
                </span>
              </div>
              <div className="overflow-x-auto px-2 py-4">
                <pre className="font-mono text-[13px] leading-[1.7]">
                  {codeLines.map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-10 shrink-0 select-none pr-3 text-right text-zinc-700">
                        {i + 1}
                      </span>
                      <code className="whitespace-pre text-zinc-300">
                        {line || " "}
                      </code>
                    </div>
                  ))}
                </pre>
              </div>

              <p
                className="fade-up flex items-center gap-1.5 text-xs text-zinc-600"
                style={{ animationDelay: "160ms" }}
              >
                <Calendar size={12} />
                Created{" "}
                {new Date(snippet.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <button
                // onClick={toggle}
                className={`rounded-xl px-4 py-2 transition ${
                  snippet.isPublic
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {snippet.isPublic ? "🌍 Public" : "🔒 Private"}
              </button>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Live stats */}
              <div
                className="fade-up rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
                style={{ animationDelay: "80ms" }}
              >
                <h3 className="mb-4 flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wider text-zinc-500">
                  <Flame size={13} className="text-orange-400" /> Live stats
                </h3>
                <div className="space-y-3.5">
                  {/* <StatRow
                    icon={<Eye size={14} />}
                    label="Views"
                    value={snippet?.views.toLocaleString()}
                  /> */}
                  <StatRow
                    icon={<GitFork size={14} />}
                    label="Forks"
                    value={snippet.forks}
                  />
                  <StatRow
                    icon={<Clock size={14} />}
                    label="Last edited"
                    value="3 days ago"
                  />
                  <StatRow
                    icon={<TagIcon size={14} />}
                    label="Tags"
                    value={snippet.tags.length}
                  />
                </div>
              </div>

              {/* Completion checklist */}
              <div
                className="fade-up rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
                style={{ animationDelay: "140ms" }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[12px] font-medium uppercase tracking-wider text-zinc-500">
                    Snippet health
                  </h3>
                  <CompletionRing percent={completion} mounted={mounted} />
                </div>
                <ul className="space-y-2.5">
                  {CHECKLIST_ITEMS.map((item) => {
                    const done = checklistDone[item.id];
                    return (
                      <li
                        key={item.id}
                        className="flex items-center gap-2 text-[13px]"
                      >
                        {done ? (
                          <CheckCircle2
                            size={15}
                            className="text-emerald-400"
                          />
                        ) : (
                          <Circle size={15} className="text-zinc-700" />
                        )}
                        <span
                          className={done ? "text-zinc-300" : "text-zinc-600"}
                        >
                          {item.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

interface StatRowProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

function StatRow({ icon, label, value }: StatRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-[13px] text-zinc-500">
        <span className="text-zinc-600">{icon}</span>
        {label}
      </span>
      <span className="font-mono text-[13px] font-medium text-zinc-200">
        {value}
      </span>
    </div>
  );
}

interface CompletionRingProps {
  percent: number;
  mounted: boolean;
}

function CompletionRing({ percent, mounted }: CompletionRingProps) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const offset = c - ((mounted ? percent : 0) / 100) * c;
  return (
    <div className="relative h-10 w-10">
      <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3.5"
        />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={c}
          style={{
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 1s cubic-bezier(.22,.9,.32,1)",
          }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-semibold text-zinc-200">
        {percent}%
      </span>
    </div>
  );
}