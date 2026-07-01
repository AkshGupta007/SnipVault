import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SnippetCard from "../components/SnippetCard";
import api from "../api/axios";
import { Snippet } from "../types";

const Starred = () => {
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/snippets");
        // Filter starred on frontend
        setSnippets(data.filter((s: Snippet) => s.isStarred));
      } catch {
        console.error("Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleStarToggle = (id: string) => {
    // Remove from starred list immediately
    setSnippets((prev) => prev.filter((s) => s._id !== id));
  };

  const handleDelete = (id: string) => {
    setSnippets((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-xl font-semibold">
            ⭐ Starred Snippets
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-white text-sm transition"
          >
            ← All Snippets
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-gray-500 text-sm">Loading...</div>
        ) : snippets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm mb-2">
              No starred snippets yet
            </p>
            <p className="text-gray-600 text-xs">
              Star snippets from the dashboard to find them here quickly
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {snippets.map((snippet) => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                onStarToggle={handleStarToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Starred;
