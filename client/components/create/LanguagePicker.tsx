import { motion } from "framer-motion";
import {
  FileCode2,
  Braces,
  Database,
  Terminal,
  Globe,
  Coffee,
} from "lucide-react";

interface Props {
  languages: string[];
  value: string;
  onChange: (language: string) => void;
}

const ICONS: Record<string, React.ReactNode> = {
  javascript: <span>🟨</span>,
  typescript: <span>🔷</span>,
  python: <span>🐍</span>,
  java: <Coffee size={16} />,
  html: <Globe size={16} />,
  css: <FileCode2 size={16} />,
  sql: <Database size={16} />,
  bash: <Terminal size={16} />,
  json: <Braces size={16} />,
  other: <FileCode2 size={16} />,
};

export default function LanguagePicker({ languages, value, onChange }: Props) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-300">
        Language
      </label>

      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => {
          const active = value === lang;

          return (
            <motion.button
              key={lang}
              type="button"
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() => onChange(lang)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium capitalize transition-all ${
                active
                  ? "border-indigo-500 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-indigo-400 hover:bg-white/10"
              }`}
            >
              {ICONS[lang]}
              {lang}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
