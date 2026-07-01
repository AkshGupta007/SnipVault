import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createHash, randomBytes } from "node:crypto";
import User from "../models/UserSchema.js";
import dotenv from "dotenv";
import sendEmail from "../utility/sendmail.js";
dotenv.config();

const generatetokens = (userId: string) => {
  const accesstoken = jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_TOKEN_SECERET as string,
    { expiresIn: "15m" },
  );

  const refreshtoken = jwt.sign(
    { id: userId },
    process.env.JWT_REFERESH_TOKEN_SECERET as string,
    { expiresIn: "15d" },
  );

  return {
    accesstoken,
    refreshtoken,
  };
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      res.status(400).json({
        success: false,
        message: "User already exists.",
      });
      return;
    }

    // Generate raw token for the email link
    const rawToken = randomBytes(32).toString("hex");

    // Store only the hashed version in DB
    const hashedToken = createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const user = await User.create({
      name,
      email,
      password,
      isVerified: false,
      verificationToken: hashedToken,
    });

    // Build the link that goes in the email
    const verifyUrl = `${process.env.CLIENT_URL}/verify/${rawToken}`;

    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px;max-width:500px">
        <h2 style="color:#6366F1">Verify your SnipHub email</h2>
        <p>Hello ${user.name},</p>
        <p>Thanks for signing up! Click the button below to verify your email address and activate your account.</p>
        <a
          href="${verifyUrl}"
          style="
            display:inline-block;
            background:#6366F1;
            color:white;
            padding:12px 24px;
            border-radius:8px;
            text-decoration:none;
            margin:20px 0;
            font-weight:bold;
          "
        >
          Verify Email
        </a>
        <p style="color:#888;font-size:13px">Or copy and paste this link into your browser:</p>
        <p style="color:#888;font-size:13px;word-break:break-all">${verifyUrl}</p>
        <p style="color:#888;font-size:13px">This link will expire in 24 hours.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0" />
        <small style="color:#aaa">If you didn't create a SnipHub account, you can safely ignore this email.</small>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: "Verify your SnipHub email",
      html,
    });

    // Don't issue tokens — user must verify first
    res.status(201).json({
      success: true,
      message:
        "Account created! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Already dont exist",
      });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "wrong password",
      });
    }

    const tokens = generatetokens(user._id.toString());

    res.status(200).json({
      success: true,
      message: "User Created",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      ...tokens,
    });
  } catch (error) {
    console.error(error); // better to use console.error for errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshtoken } = req.body;

    if (!refreshtoken) {
      return res.status(400).json({
        success: false,
        message: "No refresh token exist",
      });
    }

    const decode = jwt.verify(
      refreshtoken,
      process.env.JWT_REFERESH_TOKEN_SECERET as string,
    ) as { id: string };

    const tokens = generatetokens(decode.id);

    res.status(200).json({
      success: true,
      message: "token re- Created",
      tokens,
    });
  } catch (err) {
    console.error(err); // better to use console.error for errors
    res.status(403).json({
      success: false,
      message: "Token Error",
    });
  }
};
