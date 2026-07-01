import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, default: "javascript" },
    description: { type: String, default: "" },
    tags: [String],
    isStarred: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    slug: { type: String, unique: true, sparse: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

// ✅ language_override prevents conflict with the 'language' field
SnippetSchema.index(
  { title: "text", code: "text", tags: "text" },
  { language_override: "lang" },
);

// Optional: regular index for filtering by language
SnippetSchema.index({ language: 1 });

const Snippet = mongoose.model("Snippet", SnippetSchema);
export default Snippet;
