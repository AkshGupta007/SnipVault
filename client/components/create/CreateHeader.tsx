import { motion } from "framer-motion";
import { Code2, Sparkles } from "lucide-react";

export default function CreateHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300 backdrop-blur-xl">
        <Sparkles size={16} />
        SnipVault Studio
      </div>

      {/* Heading */}
      <h1 className="bg-gradient-to-r from-white via-indigo-300 to-cyan-300 bg-clip-text text-5xl font-black tracking-tight text-transparent">
        Create New Snippet
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-gray-400">
        Store reusable code snippets, organize them with tags, and share them
        securely with your team or the community.
      </p>

      {/* Decorative cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <Code2 className="mb-3 text-indigo-400" size={26} />
          <h3 className="font-semibold text-white">Clean Code</h3>
          <p className="mt-1 text-sm text-gray-400">
            Save reusable snippets with syntax-friendly formatting.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <span className="mb-3 block text-2xl">🏷️</span>
          <h3 className="font-semibold text-white">Smart Tags</h3>
          <p className="mt-1 text-sm text-gray-400">
            Organize snippets with searchable tags.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <span className="mb-3 block text-2xl">🚀</span>
          <h3 className="font-semibold text-white">Share Instantly</h3>
          <p className="mt-1 text-sm text-gray-400">
            Generate public links and collaborate effortlessly.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
