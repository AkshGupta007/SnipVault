import type { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/UserSchema.js";
import sendEmail from "../utility/sendmail.js";

export const verifyEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { token } = req.params;

    if (!token) {
      res.status(400).json({ message: "Token is required." });
      return;
    }

    const hashedToken = crypto.createHash("sha256").update(token as string).digest("hex");

    const user = await User.findOne({ verificationToken: hashedToken });

    if (!user) {
      res
        .status(400)
        .json({ message: "Invalid or expired verification link." });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: "Email is already verified." });
      return;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Issue tokens so user is logged in immediately after verification
    const accesstoken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_TOKEN_SECERET as string,
      { expiresIn: "15m" },
    );

    const refreshtoken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFERESH_TOKEN_SECERET as string,
      { expiresIn: "15d" },
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accesstoken,
      refreshtoken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};



export const forgotPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        message: "Email is required.",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        message: "No account found with this email.",
      });
      return;
    }

    // Generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store hashed token in DB
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Expires in 15 minutes
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Reset your password</h2>

        <p>Hello ${user.name},</p>

        <p>
          We received a request to reset your SnipVault password.
        </p>

        <p>
          Click the button below to create a new password:
        </p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            background:#4f46e5;
            color:white;
            padding:12px 22px;
            border-radius:8px;
            text-decoration:none;
            margin:20px 0;
          "
        >
          Reset Password
        </a>

        <p>
          Or copy and paste this link into your browser:
        </p>

        <p>${resetUrl}</p>

        <p>
          This link will expire in 15 minutes.
        </p>

        <hr>

        <small>
          If you didn't request this, you can safely ignore this email.
        </small>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: "Reset your SnipVault password",
      html,
    });

    res.status(200).json({
      message: "Password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      res.status(400).json({
        message: "Token is required.",
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        message: "Password is required.",
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
      return;
    }

    // Hash the received token
    const hashedToken = crypto.createHash("sha256").update(token as string).digest("hex");

    // Find matching user
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: new Date(),
      },
    });

    if (!user) {
      res.status(400).json({
        message: "Invalid or expired reset token.",
      });
      return;
    }

    

    user.password = password;

    // Remove reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};