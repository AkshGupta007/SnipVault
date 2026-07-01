import { motion } from "framer-motion";
import {
  Braces,
  FileCode2,
  FileJson,
  Coffee,
  Palette,
  Globe,
  Code2,
} from "lucide-react";

interface LanguageFilterProps {
  selected: string;
  onSelect: (language: string) => void;
}

const languages = [
  {
    id: "all",
    label: "All",
    icon: Code2,
    color: "from-violet-500 to-indigo-500",
  },
  {
    id: "javascript",
    label: "JavaScript",
    icon: FileJson,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "typescript",
    label: "TypeScript",
    icon: Braces,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "python",
    label: "Python",
    icon: FileCode2,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "java",
    label: "Java",
    icon: Coffee,
    color: "from-red-500 to-orange-500",
  },
  {
    id: "html",
    label: "HTML",
    icon: Globe,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "css",
    label: "CSS",
    icon: Palette,
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "other",
    label: "Other",
    icon: Code2,
    color: "from-gray-500 to-slate-500",
  },
];

export default function LanguageFilter({
  selected,
  onSelect,
}: LanguageFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {languages.map((lang) => {
        const Icon = lang.icon;
        const active = selected === lang.id;

        return (
          <motion.button
            key={lang.id}
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => onSelect(lang.id)}
            className={`
              group
              relative
              overflow-hidden
              rounded-full
              border
              px-5
              py-2.5
              transition-all
              duration-300
              ${
                active
                  ? "border-transparent text-white"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
              }
            `}
          >
            {active && (
              <motion.div
                layoutId="language-pill"
                className={`absolute inset-0 bg-gradient-to-r ${lang.color}`}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 28,
                }}
              />
            )}

            <div className="relative flex items-center gap-2">
              <Icon
                size={16}
                className={active ? "text-white" : "text-gray-400"}
              />

              <span className="text-sm font-medium">{lang.label}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
