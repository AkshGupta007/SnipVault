import { motion } from "framer-motion";
import { Globe, Lock } from "lucide-react";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function VisibilityToggle({ checked, onChange }: Props) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-gray-300">
        Visibility
      </label>

      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              checked
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-gray-700/30 text-gray-400"
            }`}
          >
            {checked ? <Globe size={22} /> : <Lock size={22} />}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {checked ? "Public Snippet" : "Private Snippet"}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              {checked
                ? "Anyone with the link can view this snippet."
                : "Only you can access this snippet."}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={() => onChange(!checked)}
          className={`relative h-8 w-14 rounded-full transition-colors ${
            checked ? "bg-indigo-600" : "bg-gray-700"
          }`}
        >
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-lg"
            animate={{
              x: checked ? 24 : 0,
            }}
          />
        </button>
      </motion.div>
    </div>
  );
}
