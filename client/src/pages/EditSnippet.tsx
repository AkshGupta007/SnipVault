// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import api from "../api/axios";

// const LANGUAGES = [
//   "javascript",
//   "typescript",
//   "python",
//   "java",
//   "html",
//   "css",
//   "sql",
//   "bash",
//   "json",
//   "other",
// ];

// const EditSnippet = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     code: "",
//     language: "javascript",
//     tags: "",
//     isPublic: false,
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   // Load existing snippet
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const { data } = await api.get(`/snippets/${id}`);
//         setForm({
//           title: data.title,
//           description: data.description || "",
//           code: data.code,
//           language: data.language,
//           tags: data.tags?.join(", ") || "",
//           isPublic: data.isPublic,
//         });
//       } catch {
//         setError("Failed to load snippet");
//       } finally {
//         setFetching(false);
//       }
//     };
//     load();
//   }, [id]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value, type } = e.target;
//     setForm({
//       ...form,
//       [name]:
//         type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.title.trim() || !form.code.trim()) {
//       setError("Title and code are required");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       const payload = {
//         ...form,
//         tags: form.tags
//           .split(",")
//           .map((t) => t.trim())
//           .filter(Boolean),
//       };
//       await api.put(`/snippets/${id}`, payload);
//       navigate(`/snippet/${id}`);
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Failed to update snippet");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) {
//     return (
//       <div className="min-h-screen bg-gray-950">
//         <Navbar />
//         <div className="text-gray-500 text-sm p-8">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950">
//       <Navbar />

//       <div className="max-w-3xl mx-auto px-6 py-8">
//         <h1 className="text-white text-xl font-semibold mb-6">Edit Snippet</h1>

//         {error && (
//           <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Title */}
//           <div>
//             <label className="text-sm text-gray-400 mb-1 block">Title *</label>
//             <input
//               type="text"
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="text-sm text-gray-400 mb-1 block">
//               Description
//             </label>
//             <input
//               type="text"
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Language */}
//           <div>
//             <label className="text-sm text-gray-400 mb-1 block">Language</label>
//             <select
//               name="language"
//               value={form.language}
//               onChange={handleChange}
//               className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               {LANGUAGES.map((lang) => (
//                 <option key={lang} value={lang}>
//                   {lang}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Code */}
//           <div>
//             <label className="text-sm text-gray-400 mb-1 block">Code *</label>
//             <textarea
//               name="code"
//               value={form.code}
//               onChange={handleChange}
//               rows={12}
//               className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-3 text-sm font-mono outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
//             />
//           </div>

//           {/* Tags */}
//           <div>
//             <label className="text-sm text-gray-400 mb-1 block">
//               Tags
//               <span className="text-gray-600 ml-1">(comma separated)</span>
//             </label>
//             <input
//               type="text"
//               name="tags"
//               value={form.tags}
//               onChange={handleChange}
//               className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Public toggle */}
//           <div className="flex items-center gap-3">
//             <input
//               type="checkbox"
//               name="isPublic"
//               id="isPublic"
//               checked={form.isPublic}
//               onChange={handleChange}
//               className="w-4 h-4 accent-indigo-500"
//             />
//             <label htmlFor="isPublic" className="text-sm text-gray-400">
//               Make public (generates shareable link)
//             </label>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-6 py-2.5 rounded-lg transition disabled:opacity-50"
//             >
//               {loading ? "Updating..." : "Update Snippet"}
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate(`/snippet/${id}`)}
//               className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-6 py-2.5 rounded-lg transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditSnippet;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import BackgroundGlow from "../components/Dashboard/BackgroundGlow";

import LanguagePicker from "../../components/create/LanguagePicker";
import CodeEditor from "../../components/create/CodeEditor";
import TagInput from "../../components/create/TagInput";
import VisibilityToggle from "../../components/create/VisibilityToggle";
import FormActions from "../../components/create/FormActions";
import CreateStats from "../../components/create/CreateStats";

import api from "../api/axios";

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "html",
  "css",
  "sql",
  "bash",
  "json",
  "other",
];

export default function EditSnippet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript",
    tags: "",
    isPublic: false,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/snippets/${id}`);

        setForm({
          title: data.title,
          description: data.description ?? "",
          code: data.code,
          language: data.language,
          tags: data.tags?.join(", ") ?? "",
          isPublic: data.isPublic,
        });
      } catch {
        setError("Failed to load snippet.");
      } finally {
        setFetching(false);
      }
    };

    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.code.trim()) {
      setError("Title and code are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.put(`/snippets/${id}`, {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });

      navigate(`/snippet/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to update snippet.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#050816]">
        <Navbar />

        <div className="flex h-[80vh] items-center justify-center">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="h-14 w-14 rounded-full border-4 border-indigo-500 border-t-transparent"
          />
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816]">
      <BackgroundGlow />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        {/* Top */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10 flex items-center justify-between"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-gray-300 transition hover:bg-white/10"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          <div className="flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-indigo-300">
            <Pencil size={16} />
            Premium Editor
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300"
          >
            {error}
          </motion.div>
        )}

        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          {/* Form */}

          <motion.form
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
          >
            {/* Title */}
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Snippet Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Custom React Hook"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Description
                </label>

                <textarea
                  rows={3}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your snippet..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              {/* Language */}
              <LanguagePicker
                languages={LANGUAGES}
                value={form.language}
                onChange={(lang) =>
                  setForm((prev) => ({
                    ...prev,
                    language: lang,
                  }))
                }
              />

              {/* Code */}
              <CodeEditor
                value={form.code}
                onChange={(code) =>
                  setForm((prev) => ({
                    ...prev,
                    code,
                  }))
                }
              />

              {/* Tags */}
              <TagInput
                value={form.tags}
                onChange={(tags) =>
                  setForm((prev) => ({
                    ...prev,
                    tags,
                  }))
                }
              />

              {/* Public */}
              <VisibilityToggle
                checked={form.isPublic}
                onChange={(checked) =>
                  setForm((prev) => ({
                    ...prev,
                    isPublic: checked,
                  }))
                }
              />

              {/* Buttons */}
              <FormActions
                loading={loading}
                onCancel={() => navigate("/dashboard")}
              />
            </div>
          </motion.form>

          {/* Sidebar */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="space-y-6"
          >
            <CreateStats
              title={form.title}
              description={form.description}
              code={form.code}
              tags={form.tags}
              language={form.language}
              isPublic={form.isPublic}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
