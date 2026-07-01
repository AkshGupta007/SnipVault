import { Router, } from "express";
import type{ RequestHandler } from "express";
import { verifytoken } from "../middleware/Auth.js";
import {
  getSnippets,
  getSnippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  toggleStar,
  getPublicSnippet,
  toggleVisibility
} from "../controllers/snippet.controller.js";

const router = Router();

// Public route (no auth)
router.get("/public/:slug", getPublicSnippet as unknown as RequestHandler); ;

// Protected routes
router.use(verifytoken as unknown as RequestHandler);
router.get("/", getSnippets as unknown as RequestHandler);
router.get("/:id", getSnippet as unknown as RequestHandler);
router.post("/", createSnippet as unknown as RequestHandler);
router.put("/:id", updateSnippet as unknown as RequestHandler);
router.delete("/:id", deleteSnippet as unknown as RequestHandler);
router.patch("/:id/star", toggleStar as unknown as RequestHandler);
router.patch("/snippets/:id/visibility", toggleVisibility as unknown as RequestHandler);

export default router;
