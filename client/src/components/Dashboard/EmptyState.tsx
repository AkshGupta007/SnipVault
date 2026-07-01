import { motion } from "framer-motion";
import { FolderOpen, Plus } from "lucide-react";

interface EmptyStateProps {
  onCreate: () => void;
}

export default function EmptyState({ onCreate }: EmptyStateProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
      }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl"
    >
      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />

      <div className="relative flex flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-lg">
          <FolderOpen className="h-12 w-12 text-white" />
        </div>

        <h2 className="text-3xl font-bold text-white">No Snippets Found</h2>

        <p className="mt-3 max-w-md text-gray-400">
          Your collection is empty. Create your first code snippet and organize
          your workflow like a pro.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={onCreate}
          className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg"
        >
          <Plus size={18} />
          Create Snippet
        </motion.button>
      </div>
    </motion.div>
  );
}
