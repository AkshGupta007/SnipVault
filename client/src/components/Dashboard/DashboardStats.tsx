import { motion } from "framer-motion";
import { FileCode2, Star, Braces, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  total: number;
  starred: number;
  languages: number;
}

const stats = (total: number, starred: number, languages: number) => [
  {
    title: "Total Snippets",
    value: total,
    icon: FileCode2,
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Starred",
    value: starred,
    icon: Star,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Languages",
    value: languages,
    icon: Braces,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Productivity",
    value: `${Math.min(100, total * 5)}%`,
    icon: TrendingUp,
    color: "from-emerald-500 to-green-500",
  },
];

export default function DashboardStats({
  total,
  starred,
  languages,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats(total, starred, languages).map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
            }}
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            {/* Background Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
            />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color}`}
              >
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  delay: index * 0.2,
                  duration: 1,
                }}
                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
