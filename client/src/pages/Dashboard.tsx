

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Search, Plus, Star, Code2 } from "lucide-react";
// import Navbar from "../components/Navbar";
// import SnippetCard from "../components/SnippetCard";
// import useDebounce from "../hooks/UseDebounce";
// import api from "../api/axios";
// import { Snippet } from "../types";

// const LANGUAGES = [
//   "all",
//   "javascript",
//   "typescript",
//   "python",
//   "html",
//   "css",
//   "java",
//   "other",
// ];

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [snippets, setSnippets] = useState<Snippet[]>([]);
//   const [search, setSearch] = useState("");
//   const [language, setLanguage] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const debouncedSearch = useDebounce(search);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const params: any = {};
//         if (debouncedSearch) params.search = debouncedSearch;
//         if (language !== "all") params.language = language;
//         const { data } = await api.get("/snippets", { params });
//         setSnippets(data);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [debouncedSearch, language]);

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-black">
//       <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-[140px]" />
//       <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
//       <Navbar />
//       <main className="relative z-10 mx-auto max-w-7xl px-6 py-10">
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-4xl font-bold text-white">Welcome Back 👋</h1>
//             <p className="mt-2 text-gray-400">
//               Manage your snippets beautifully.
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/snippet/new")}
//             className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-white"
//           >
//             <Plus size={18} /> New Snippet
//           </button>
//         </div>

//         <div className="mb-8 grid gap-4 md:grid-cols-3">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
//             <Code2 />
//             <div>{snippets.length}</div>
//             <div>Total</div>
//           </div>
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
//             <Star />
//             <div>{snippets.filter((s) => s.isStarred).length}</div>
//             <div>Starred</div>
//           </div>
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
//             <Search />
//             <div>{LANGUAGES.length - 1}</div>
//             <div>Languages</div>
//           </div>
//         </div>

//         <div className="relative mb-6">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search snippets..."
//             className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 text-white outline-none"
//           />
//         </div>

//         <div className="mb-8 flex flex-wrap gap-2">
//           {LANGUAGES.map((lang) => (
//             <button
//               key={lang}
//               onClick={() => setLanguage(lang)}
//               className={`rounded-full px-4 py-2 capitalize ${language === lang ? "bg-indigo-600 text-white" : "bg-white/5 text-gray-300"}`}
//             >
//               {lang}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="text-gray-400">Loading...</div>
//         ) : snippets.length === 0 ? (
//           <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center text-gray-400">
//             No snippets found.
//           </div>
//         ) : (
//           <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//             {snippets.map((snippet) => (
//               <motion.div
//                 key={snippet._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <SnippetCard
//                   snippet={snippet}
//                   onStarToggle={() => {}}
//                   onDelete={() => {}}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import SnippetCard from "../components/SnippetCard";

import SearchBar from "../components/Dashboard/SearchBar";
import LanguageFilter from "../components/Dashboard/LanguageFilter";
import LoadingSkeleton from "../components/Dashboard/LoadingSkeleton";
import EmptyState from "../components/Dashboard/EmptyState";
import BackgroundGlow from "../components/Dashboard/BackgroundGlow";

import useDebounce from "../hooks/UseDebounce";
import api from "../api/axios";
import { Snippet } from "../types";

const Dashboard = () => {
  const navigate = useNavigate();

  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("all");
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);

      try {
        const params: any = {};

        if (debouncedSearch) params.search = debouncedSearch;

        if (language !== "all") params.language = language;

        const { data } = await api.get("/snippets", {
          params,
        });

        console.log("snipets",data);

        setSnippets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, [debouncedSearch, language]);

  const handleStarToggle = (id: string) => {
    setSnippets((prev) =>
      prev.map((snippet) =>
        snippet._id === id
          ? {
              ...snippet,
              isStarred: !snippet.isStarred,
            }
          : snippet,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setSnippets((prev) => prev.filter((s) => s._id !== id));
  };

  const stats = useMemo(() => {
    return {
      total: snippets.length,
      starred: snippets.filter((s) => s.isStarred).length,
      languages: new Set(snippets.map((s) => s.language)).size,
    };
  }, [snippets]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816]">
      <BackgroundGlow />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-indigo-300">
              <Sparkles size={16} />
              Premium Workspace
            </div>

            <h1 className="mt-5 text-5xl font-black tracking-tight text-white">
              My Snippets
            </h1>

            <p className="mt-3 max-w-xl text-gray-400">
              Organize, search and manage your code snippets in one beautiful
              workspace.
            </p>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => navigate("/snippet/new")}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg"
          >
            <Plus size={20} />
            New Snippet
          </motion.button>
        </motion.div>

        {/* Stats */}

        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-gray-400">Total Snippets</p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              {stats.total}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-gray-400">Starred</p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-400">
              {stats.starred}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <p className="text-gray-400">Languages</p>

            <h2 className="mt-2 text-4xl font-bold text-cyan-400">
              {stats.languages}
            </h2>
          </div>
        </div>

        {/* Search */}
       
        <div className="mb-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Filters */}

        <div className="mb-10">
          <LanguageFilter selected={language} onSelect={setLanguage} />
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : snippets.length === 0 ? (
          <EmptyState onCreate={() => navigate("/snippet/new")} />
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {snippets.map((snippet) => (
              <motion.div
                key={snippet._id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.45,
                    },
                  },
                }}
              >
                <SnippetCard
                  snippet={snippet}
                  onStarToggle={handleStarToggle}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="mt-16 border-t border-white/10 pt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Built with ❤️ for developers • SnipVault
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
