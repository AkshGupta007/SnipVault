import { motion } from "framer-motion";
import { Loader2, Save, X } from "lucide-react";

interface Props {
  loading: boolean;
  onCancel: () => void;
}

export default function FormActions({ loading, onCancel }: Props) {
  return (
    <div className="flex flex-col-reverse gap-4 pt-8 sm:flex-row sm:justify-end">
      {/* Cancel */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCancel}
        className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
      >
        <X size={18} />
        Cancel
      </motion.button>

      {/* Save */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.03 } : {}}
        whileTap={!loading ? { scale: 0.97 } : {}}
        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save size={18} />
            Save Snippet
          </>
        )}
      </motion.button>
    </div>
  );
}
