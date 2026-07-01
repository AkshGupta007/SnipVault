import { motion } from "framer-motion";
import {
  BarChart3,
  FileCode2,
  Globe,
  Lock,
  Hash,
  Type,
  CheckCircle2,
} from "lucide-react";

interface Props {
  title: string;
  description: string;
  code: string;
  tags: string;
  language: string;
  isPublic: boolean;
}

export default function CreateStats({
  title,
  description,
  code,
  tags,
  language,
  isPublic,
}: Props) {
  const lines = Math.max(code.split("\n").length, 1);
  const words = code.trim() ? code.trim().split(/\s+/).length : 0;

  const chars = code.length;

  const tagCount = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean).length;

  const completed = [
    title.trim().length > 0,
    code.trim().length > 0,
    description.trim().length > 0,
    tagCount > 0,
  ].filter(Boolean).length;

  const progress = (completed / 4) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-24 space-y-6"
    >
      {/* Progress */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <BarChart3 size={18} />
          Progress
        </h3>

        <div className="mb-3 h-3 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{
              width: `${progress}%`,
            }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
          />
        </div>

        <p className="text-sm text-gray-400">
          {completed} of 4 sections completed
        </p>
      </div>

      {/* Statistics */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="mb-5 text-lg font-semibold text-white">
          Live Statistics
        </h3>

        <div className="space-y-4">
          <Stat icon={<Type size={17} />} label="Characters" value={chars} />

          <Stat icon={<FileCode2 size={17} />} label="Lines" value={lines} />

          <Stat icon={<Hash size={17} />} label="Words" value={words} />

          <Stat icon={<Hash size={17} />} label="Tags" value={tagCount} />
        </div>
      </div>

      {/* Snippet Info */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="mb-5 text-lg font-semibold text-white">
          Snippet Details
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Language</span>

            <span className="font-medium capitalize text-white">
              {language}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Visibility</span>

            <span className="flex items-center gap-2 text-white">
              {isPublic ? (
                <>
                  <Globe size={15} className="text-green-400" />
                  Public
                </>
              ) : (
                <>
                  <Lock size={15} className="text-yellow-400" />
                  Private
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="mb-5 text-lg font-semibold text-white">Checklist</h3>

        <div className="space-y-3">
          <Checklist ok={title.trim().length > 0} text="Snippet title" />

          <Checklist ok={description.trim().length > 0} text="Description" />

          <Checklist ok={code.trim().length > 0} text="Code added" />

          <Checklist ok={tagCount > 0} text="At least one tag" />
        </div>
      </div>
    </motion.div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3">
      <div className="flex items-center gap-3 text-gray-300">
        {icon}
        {label}
      </div>

      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function Checklist({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2
        size={18}
        className={ok ? "text-green-400" : "text-gray-600"}
      />

      <span className={ok ? "text-white" : "text-gray-400"}>{text}</span>
    </div>
  );
}
