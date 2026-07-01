import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import api from "../api/axios";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Spotlight } from "@/components/ui/spotlight";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      setError("");

      await api.post(`/auth/reset-password/${token}`, {
        password,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Reset link expired or invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <BackgroundRippleEffect />

      <Spotlight className="-top-40 left-20" fill="#6366F1" />

      <Spotlight className="top-40 right-10" fill="#06B6D4" />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-20 flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-2xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500">
              <ShieldCheck size={34} className="text-white" />
            </div>

            <h1 className="text-4xl font-black text-white">Reset Password</h1>

            <p className="mt-3 text-gray-400">
              Create a strong password for your account.
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center"
            >
              <CheckCircle2 className="mx-auto mb-4 text-green-400" size={52} />

              <h3 className="text-xl font-semibold text-white">
                Password Updated!
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Redirecting to login...
              </p>
            </motion.div>
          ) : (
            <>
              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Password */}

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    New Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type={show1 ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-12 pr-12 text-white outline-none focus:border-indigo-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShow1(!show1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {show1 ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm */}

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type={show2 ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-12 pr-12 text-white outline-none focus:border-cyan-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShow2(!show2)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {show2 ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 py-3 font-semibold text-white"
                >
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <Link
                  to="/login"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  ← Back to Login
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
