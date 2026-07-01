import { KeyboardEvent, useMemo } from "react";
import { motion } from "framer-motion";
import { Hash, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TagInput({ value, onChange }: Props) {
  const tags = useMemo(
    () =>
      value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [value],
  );

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag).join(", "));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const input = e.currentTarget;

    const tag = input.value.split(",").pop()?.trim();

    if (!tag) return;

    if (tags.includes(tag)) return;

    const updated = [...tags, tag];

    onChange(updated.join(", "));

    input.value = updated.join(", ") + ", ";
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-300">
        Tags
      </label>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.length === 0 && (
            <p className="text-sm text-gray-500">No tags yet</p>
          )}

          {tags.map((tag) => (
            <motion.div
              key={tag}
              layout
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-3 py-1 text-sm text-white"
            >
              <Hash size={13} />

              {tag}

              <button type="button" onClick={() => removeTag(tag)}>
                <X size={14} className="opacity-70 hover:opacity-100" />
              </button>
            </motion.div>
          ))}
        </div>

        <input
          defaultValue={value}
          onBlur={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="react, hooks, api..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
        />

        <p className="mt-3 text-xs text-gray-500">
          Press <span className="font-semibold">Enter</span> after typing a tag.
        </p>
      </div>
    </div>
  );
}
