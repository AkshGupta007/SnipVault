// import { useNavigate } from "react-router-dom";
// import { Snippet } from "../types";
// import api from "../api/axios";

// interface Props {
//   snippet: Snippet;
//   onStarToggle: (id: string) => void;
//   onDelete: (id: string) => void;
// }

// const LANG_COLORS: Record<string, string> = {
//   javascript: "bg-yellow-500/20 text-yellow-400",
//   typescript: "bg-blue-500/20 text-blue-400",
//   python: "bg-green-500/20 text-green-400",
//   css: "bg-pink-500/20 text-pink-400",
//   html: "bg-orange-500/20 text-orange-400",
//   java: "bg-red-500/20 text-red-400",
//   default: "bg-gray-500/20 text-gray-400",
// };

// const SnippetCard = ({ snippet, onStarToggle, onDelete }: Props) => {
//   const navigate = useNavigate();
//   const langColor = LANG_COLORS[snippet.language] || LANG_COLORS.default;

//   const handleCopy = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     navigator.clipboard.writeText(snippet.code);
//   };

//   const handleStar = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     await api.patch(`/snippets/${snippet._id}/star`);
//     onStarToggle(snippet._id);
//   };

//   const handleDelete = async (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!confirm("Delete this snippet?")) return;
//     await api.delete(`/snippets/${snippet._id}`);
//     onDelete(snippet._id);
//   };

//   return (
//     <div
//       onClick={() => navigate(`/snippet/${snippet._id}`)}
//       className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer hover:border-indigo-500/50 transition group"
//     >
//       {/* Top row */}
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           <h3 className="text-white font-medium text-sm">{snippet.title}</h3>
//           {snippet.description && (
//             <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
//               {snippet.description}
//             </p>
//           )}
//         </div>
//         <span
//           className={`text-xs px-2 py-0.5 rounded-full font-mono ${langColor}`}
//         >
//           {snippet.language}
//         </span>
//       </div>

//       {/* Code preview */}
//       <pre className="bg-gray-950 rounded-lg p-3 text-xs text-gray-400 font-mono overflow-hidden line-clamp-3 mb-3">
//         {snippet.code}
//       </pre>

//       {/* Tags */}
//       {snippet.tags?.length > 0 && (
//         <div className="flex gap-1 flex-wrap mb-3">
//           {snippet.tags.map((tag) => (
//             <span
//               key={tag}
//               className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* Actions */}
//       <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition">
//         <button
//           onClick={handleStar}
//           className={`text-xs ${snippet.isStarred ? "text-yellow-400" : "text-gray-500 hover:text-yellow-400"} transition`}
//         >
//           {snippet.isStarred ? "⭐ Starred" : "☆ Star"}
//         </button>
//         <button
//           onClick={handleCopy}
//           className="text-xs text-gray-500 hover:text-white transition"
//         >
//           Copy
//         </button>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             navigate(`/snippet/${snippet._id}/edit`);
//           }}
//           className="text-xs text-gray-500 hover:text-indigo-400 transition"
//         >
//           Edit
//         </button>
//         <button
//           onClick={handleDelete}
//           className="text-xs text-gray-500 hover:text-red-400 transition"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SnippetCard;

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Copy,
  Check,
  Star,
  Pencil,
  Trash2,
  Calendar,
} from "lucide-react";

import api from "../api/axios";
import { Snippet } from "../types";

interface Props {
  snippet: Snippet;
  onStarToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const languageStyles: Record<
  string,
  {
    bg: string;
    icon: string;
  }
> = {
  javascript: {
    bg: "from-yellow-500 to-orange-500",
    icon: "🟨",
  },
  typescript: {
    bg: "from-blue-500 to-cyan-500",
    icon: "🔷",
  },
  python: {
    bg: "from-green-500 to-emerald-500",
    icon: "🐍",
  },
  java: {
    bg: "from-red-500 to-orange-500",
    icon: "☕",
  },
  html: {
    bg: "from-orange-500 to-red-500",
    icon: "🌐",
  },
  css: {
    bg: "from-cyan-500 to-blue-500",
    icon: "🎨",
  },
  other: {
    bg: "from-slate-500 to-gray-600",
    icon: "💻",
  },
};

export default function SnippetCard({
  snippet,
  onStarToggle,
  onDelete,
}: Props) {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  const lang = languageStyles[snippet.language] ?? languageStyles.other;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await navigator.clipboard.writeText(snippet.code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  const handleStar = async (e: React.MouseEvent) => {
    e.stopPropagation();

    await api.patch(`/snippets/${snippet._id}/star`);

    onStarToggle(snippet._id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!window.confirm("Delete this snippet?")) return;

    await api.delete(`/snippets/${snippet._id}`);

    onDelete(snippet._id);
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={() => navigate(`/snippet/${snippet._id}`)}
      className="
      group
      relative
      cursor-pointer
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      transition-all
      hover:border-indigo-500/40
      hover:shadow-[0_20px_50px_rgba(79,70,229,.25)]
      "
    >
      {/* Glow */}
      <div
        className="
        absolute
        inset-0
        opacity-0
        transition
        duration-500
        group-hover:opacity-100
        bg-gradient-to-br
        from-indigo-500/10
        via-transparent
        to-cyan-500/10
        "
      />

      <div className="relative p-6">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div
              className={`
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-gradient-to-r
              ${lang.bg}
              px-3
              py-1
              text-xs
              font-semibold
              text-white
              `}
            >
              <span>{lang.icon}</span>

              {snippet.language}
            </div>

            <h2 className="mt-4 line-clamp-1 text-xl font-bold text-white">
              {snippet.title}
            </h2>

            {snippet.description && (
              <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                {snippet.description}
              </p>
            )}
          </div>

          <motion.button
            whileTap={{
              scale: 0.85,
            }}
            onClick={handleStar}
            className="ml-4 rounded-xl p-2 hover:bg-white/10"
          >
            <Star
              size={20}
              className={
                snippet.isStarred
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-500"
              }
            />
          </motion.button>
        </div>

        {/* Code Preview */}

        <div
          className="
          mt-6
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#050816]
          "
        >
          <pre className="max-h-44 overflow-hidden p-4 text-xs leading-6 text-gray-300">
            <code>{snippet.code}</code>
          </pre>
        </div>
        {/* Tags */}
        {snippet.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 transition hover:bg-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          {/* Created Date */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            {new Date(snippet.createdAt).toLocaleDateString()}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Copy */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition hover:bg-indigo-500/20 hover:text-indigo-300"
              title="Copy"
            >
              {copied ? (
                <Check size={18} className="text-green-400" />
              ) : (
                <Copy size={18} />
              )}
            </motion.button>

            {/* Edit */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/snippet/${snippet._id}/edit`);
              }}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition hover:bg-cyan-500/20 hover:text-cyan-300"
              title="Edit"
            >
              <Pencil size={18} />
            </motion.button>

            {/* Delete */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-400 transition hover:bg-red-500/20 hover:text-red-400"
              title="Delete"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
