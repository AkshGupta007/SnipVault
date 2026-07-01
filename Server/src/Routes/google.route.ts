import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import type { IUser } from "../models/UserSchema.js";

const router = express.Router();

// Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google callback
// routes/auth.routes.ts
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user as IUser;

    const accesstoken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_TOKEN_SECERET!,
      { expiresIn: "15m" },
    );

    const refreshtoken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFERESH_TOKEN_SECERET!,
      { expiresIn: "15d" },
    );

    // Send both tokens + user in the redirect
    const params = new URLSearchParams({
      accesstoken,
      refreshtoken,
      user: JSON.stringify({ id: user._id, name: user.name, email: user.email }),
    });

    res.redirect(`${process.env.CLIENT_URL}/auth/callback?${params}`);
  }
);

export default router;
