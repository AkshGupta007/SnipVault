import { useMemo } from "react";
import { motion } from "framer-motion";
import { Code2, Copy } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: Props) {
  const lineCount = useMemo(() => {
    return Math.max(value.split("\n").length, 12);
  }, [value]);

  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-300">
        Code
      </label>

      <motion.div
        whileFocus={{ scale: 1.01 }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#111827] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <Code2 size={16} />
              <span className="text-sm">snippet.ts</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 transition hover:bg-white/10"
          >
            <Copy size={15} />
            Copy
          </button>
        </div>

        {/* Editor */}
        <div className="flex h-[500px] overflow-hidden">
          {/* Line Numbers */}
          <div className="select-none overflow-hidden border-r border-white/10 bg-black/30 px-4 py-4 text-right text-sm leading-7 text-gray-500">
            {lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            placeholder="// Start writing your awesome code..."
            className="h-full w-full resize-none bg-transparent px-5 py-4 font-mono text-[15px] leading-7 text-white outline-none placeholder:text-gray-600"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#111827] px-4 py-2 text-xs text-gray-400">
          <span>{lineCount} lines</span>

          <span>{value.length} characters</span>
        </div>
      </motion.div>
    </div>
  );
}
