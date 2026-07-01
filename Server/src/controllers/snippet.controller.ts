// import type { Response } from "express";
// import { nanoid } from "nanoid";
// import Snippet from "../models/SnippetSchema.js";
// import type { Authrequest } from "../middleware/Auth.js";
// import { error } from "node:console";

// // GET all snippets (with search/filter)
// export const getSnippets = async (req: Authrequest, res: Response) => {
//   try {
//     const { search, tag } = req.query;
//     const language = req.query.language as string;

//     const query: any = { user: req.user!.id };

//     if (search) {
//       query.$text = { $search: search as string };
//     }

//     const supportedLanguages = [
//       "javascript",
//       "typescript",
//       "python",
//       "java",
//       "html",
//       "css",
//     ];

//     if (language) {
//       if (language === "other") {
//         query.language = {
//           $nin: supportedLanguages,
//         };
//       } else {
//         query.language = language.toLowerCase();
//       }
//     }

//     if (tag) {
//       query.tags = tag;
//     }

//     const snippets = await Snippet.find(query).sort({ createdAt: -1 });

//     res.json(snippets);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET single snippet
// export const getSnippet = async (req: Authrequest, res: Response) => {
//   try {
//     const snippet = await Snippet.findOne({
//       _id: req.params.id,
//       user: req.user!.id,
//     });
//     if (!snippet) return res.status(404).json({ message: "Not found" });
//     res.json(snippet);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // POST create snippet
// export const createSnippet = async (req: Authrequest, res: Response) => {
//   try {
//     const { title, code, language, description, tags, isPublic } = req.body;
//     const slug = isPublic ? nanoid(8) : null;

//     const snippet = await Snippet.create({
//       title,
//       code,
//       language,
//       description,
//       tags,
//       isPublic,
//       slug,
//       user: req.user!.id,
//     });
//     res.status(201).json(snippet);
//   } catch (error) {
//     console.log("error in creating", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // PUT update snippet
// export const updateSnippet = async (req: Authrequest, res: Response) => {
//   try {
//     const { isPublic } = req.body;
//     const existing = await Snippet.findOne({
//       _id: req.params.id,
//       user: req.user!.id,
//     });
//     if (!existing) return res.status(404).json({ message: "Not found" });

//     // Generate slug if making public for first time
//     if (isPublic && !existing.slug) req.body.slug = nanoid(8);

//     const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(snippet);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // DELETE snippet
// export const deleteSnippet = async (req: Authrequest, res: Response) => {
//   try {
//     await Snippet.findOneAndDelete({ _id: req.params.id, user: req.user!.id });
//     res.json({ message: "Deleted" });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // PATCH toggle star
// export const toggleStar = async (req: Authrequest, res: Response) => {
//   try {
//     const snippet = await Snippet.findOne({
//       _id: req.params.id,
//       user: req.user!.id,
//     });
//     if (!snippet) return res.status(404).json({ message: "Not found" });

//     snippet.isStarred = !snippet.isStarred;
//     await snippet.save();
//     res.json(snippet);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // GET public snippet by slug (no auth)
// export const getPublicSnippet = async (req: Authrequest, res: Response) => {
//   try {
//     const snippet = await Snippet.findOne({
//       slug: req.params.slug as string,
//       isPublic: true,
//     });
//     if (!snippet) return res.status(404).json({ message: "Not found" });
//     res.json(snippet);
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const toggleVisibility = async (req: Authrequest, res: Response) => {
//   try {
//     const snippet = await Snippet.findOne({
//       _id: req.params.id,
//       user: req.user!.id,
//     });

//     if (!snippet) {
//       res.status(404).json({ message: "Snippet not found" });
//       return;
//     }

//     snippet.isPublic = !snippet.isPublic;

//     await snippet.save();

//     res.json({
//       message: snippet.isPublic
//         ? "Snippet is now public."
//         : "Snippet is now private.",
//       isPublic: snippet.isPublic,
//       slug: snippet.slug,
//     });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

import type { Response } from "express";
import { nanoid } from "nanoid";
import Snippet from "../models/SnippetSchema.js";
import type { Authrequest } from "../middleware/Auth.js";

// GET all snippets (with search/filter)
export const getSnippets = async (
  req: Authrequest,
  res: Response,
): Promise<void> => {
  try {
    const { search, tag } = req.query;
    const language = req.query.language as string;

    const query: Record<string, any> = { user: req.user!.id };

    if (search) {
      query.$text = { $search: search as string };
    }

    const supportedLanguages = [
      "javascript",
      "typescript",
      "python",
      "java",
      "html",
      "css",
    ];

    if (language) {
      query.language =
        language === "other"
          ? { $nin: supportedLanguages }
          : language.toLowerCase();
    }

    if (tag) {
      query.tags = tag;
    }

    const snippets = await Snippet.find(query).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET single snippet
export const getSnippet = async (
  req: Authrequest,
  res: Response,
): Promise<void> => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user!.id,
    });

    if (!snippet) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(snippet);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// POST create snippet
export const createSnippet = async (
  req: Authrequest,
  res: Response,
): Promise<void> => {
  try {
    const { title, code, language, description, tags, isPublic } = req.body;

    // Use null when not public so the slug field is explicitly empty and matches the
    // schema which allows string | RegExp | null for slug
    const slug = isPublic ? nanoid(8) : null;

    const snippet = await Snippet.create({
      title,
      code,
      language,
      description,
      tags,
      isPublic,
      slug,
      user: req.user!.id,
    });

    res.status(201).json(snippet);
  } catch (err) {
    console.error("error in creating", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT update snippet
export const updateSnippet = async (
  req: Authrequest,
  res: Response,
): Promise<void> => {
  try {
    const { isPublic } = req.body;

    const existing = await Snippet.findOne({
      _id: req.params.id,
      user: req.user!.id,
    });

    if (!existing) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    // Generate slug if making public for the first time
    if (isPublic && !existing.slug) {
      req.body.slug = nanoid(8);
    }

    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(snippet);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE snippet
export const deleteSnippet = async (
  req: Authrequest,
  res: Response,
): Promise<void> => {
  try {
    await Snippet.findOneAndDelete({
      _id: req.params.id,
      user: req.user!.id,
    });

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH toggle star
export const toggleStar = async (
  req: Authrequest,
  res: Response,
): Promise<void> => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user!.id,
    });

    if (!snippet) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    snippet.isStarred = !snippet.isStarred;
    await snippet.save();
    res.json(snippet);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// GET public snippet by slug (no auth)
export const getPublicSnippet = async (
  req: Authrequest,
  res: Response,
): Promise<void> => {
  try {
    const slug = req.params.slug;

    if (!slug || Array.isArray(slug)) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    const snippet = await Snippet.findOne({
      slug,
      isPublic: true,
    });

    if (!snippet) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(snippet);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH toggle visibility
export const toggleVisibility = async (
  req: Authrequest,
  res: Response,
): Promise<void> => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user!.id,
    });

    if (!snippet) {
      res.status(404).json({ message: "Snippet not found" });
      return;
    }

    snippet.isPublic = !snippet.isPublic;

    // Generate slug when making public for the first time
    if (snippet.isPublic && !snippet.slug) {
      snippet.slug = nanoid(8);
    }

    await snippet.save();

    res.json({
      message: snippet.isPublic
        ? "Snippet is now public."
        : "Snippet is now private.",
      isPublic: snippet.isPublic,
      slug: snippet.slug,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
