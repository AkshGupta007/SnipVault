import { motion } from "framer-motion";

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      {/* Shimmer */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-40 rounded-lg bg-white/10" />
            <div className="h-8 w-8 rounded-full bg-white/10" />
          </div>

          {/* Language */}
          <div className="h-4 w-20 rounded bg-white/10" />

          {/* Content */}
          <div className="space-y-3">
            <div className="h-3 rounded bg-white/10" />
            <div className="h-3 rounded bg-white/10 w-5/6" />
            <div className="h-3 rounded bg-white/10 w-4/6" />
            <div className="h-3 rounded bg-white/10 w-2/3" />
          </div>

          {/* Footer */}
          <div className="flex justify-between pt-5">
            <div className="h-4 w-24 rounded bg-white/10" />
            <div className="h-8 w-20 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} delay={index * 0.08} />
      ))}
    </div>
  );
}
