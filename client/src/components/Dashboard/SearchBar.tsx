import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20 blur-xl" />

      <div className="relative flex items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/30">
        <Search size={20} className="ml-5 text-gray-400" />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search snippets..."
          className="h-14 flex-1 bg-transparent px-4 text-white placeholder:text-gray-500 focus:outline-none"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="mr-4 rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        )}

        <div className="mr-4 hidden rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-500 md:block">
          Ctrl K
        </div>
      </div>
    </motion.div>
  );
}
