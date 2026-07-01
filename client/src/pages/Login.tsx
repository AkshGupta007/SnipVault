// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// // import background from "../assets/login.jpg"
// // import api from "../api/axios";

// // const Login = () => {
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       const { data } = await api.post("/auth/login", form);
// //       console.log("data from login",data);
// //       login(data.user, data.accesstoken, data.refreshtoken);
// //       navigate("/dashboard");
// //     } catch (err: any) {
// //       setError(err.response?.data?.message || "Login failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div
// //       className="min-h-screen flex items-center justify-center px-4"
// //       style={{
// //         backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${background})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundRepeat: "no-repeat",
// //       }}
// //     >
// //       <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
// //         {/* Header */}
// //         <h1 className="text-2xl font-bold text-white mb-1 monaco">Welcome back</h1>
// //         <p className="text-gray-400 mb-6 monaco text-2xl">Login to your SnipVault</p>

// //         {/* Error */}
// //         {error && (
// //           <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
// //             {error}
// //           </div>
// //         )}

// //         {/* Form */}
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="text-sm text-gray-400 mb-1 block">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={form.email}
// //               onChange={handleChange}
// //               required
// //               className="w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
// //               placeholder="you@example.com"
// //             />
// //           </div>

// //           <div>
// //             <label className="text-sm text-gray-400 mb-1 block">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={form.password}
// //               onChange={handleChange}
// //               required
// //               className="w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
// //               placeholder="••••••••"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg py-2.5 text-sm transition disabled:opacity-50"
// //           >
// //             {loading ? "Logging in..." : "Login"}
// //           </button>
// //         </form>

// //         <p className="text-gray-400 text-sm text-center mt-6">
// //           Don't have an account?{" "}
// //           <Link to="/register" className="text-indigo-400 hover:underline">
// //             Register
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   Eye,
//   EyeOff,
//   Lock,
//   Mail,
//   ArrowRight,
// } from "lucide-react";

// import { useAuth } from "../context/AuthContext";
// import api from "../api/axios";

// import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
// import { Spotlight } from "@/components/ui/spotlight";

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       const { data } = await api.post("/auth/login", form);
//       console.log("data",data);

//       login(data.user, data.accesstoken, data.refreshtoken);

//       navigate("/dashboard");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-black">
//       {/* Ripple */}
//       <BackgroundRippleEffect />

//       {/* Spotlights */}
//       <Spotlight
//         className="-top-40 left-0 md:left-60 md:-top-20"
//         fill="white"
//       />

//       <Spotlight className="top-10 right-0" fill="#6366F1" />

//       <Spotlight className="bottom-0 left-1/2" fill="#06B6D4" />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/65" />

//       {/* Glow */}
//       <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-indigo-500/30 blur-[140px]" />
//       <div className="absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

//       <div className="relative z-20 flex min-h-screen items-center justify-center px-4">
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 50,
//             scale: 0.95,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//             scale: 1,
//           }}
//           transition={{
//             duration: 0.7,
//           }}
//           className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(99,102,241,.15)]"
//         >
//           <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-violet-500/10 blur-3xl" />

//           <div className="mb-8 text-center">
//             <h1 className="bg-gradient-to-r from-white via-indigo-300 to-cyan-300 bg-clip-text text-4xl font-black text-transparent">
//               Welcome Back
//             </h1>

//             <p className="mt-3 text-gray-400">
//               Login to your SnipVault account
//             </p>
//           </div>

//           {error && (
//             <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}

//             <div>
//               <label className="mb-2 block text-sm text-gray-300">Email</label>

//               <div className="relative">
//                 <Mail
//                   size={18}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//                 />

//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="you@example.com"
//                   required
//                   className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-12 pr-4 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>

//             {/* Password */}

//             <div>
//               <label className="mb-2 block text-sm text-gray-300">
//                 Password
//               </label>

//               <div className="relative">
//                 <Lock
//                   size={18}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//                 />

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   required
//                   className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-12 pr-12 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2 text-gray-400 cursor-pointer select-none">
//                 <input
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-gray-600 bg-transparent accent-indigo-500"
//                 />
//                 Remember me
//               </label>

//               <Link
//                 to="/forgot-password"
//                 className="text-indigo-400 transition hover:text-indigo-300"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Login Button */}
//             <motion.button
//               whileHover={{
//                 scale: 1.02,
//                 boxShadow: "0 0 35px rgba(99,102,241,.45)",
//               }}
//               whileTap={{
//                 scale: 0.98,
//               }}
//               type="submit"
//               disabled={loading}
//               className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="h-5 w-5 animate-spin"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                   >
//                     <circle
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="white"
//                       strokeWidth="4"
//                       opacity="0.25"
//                     />
//                     <path
//                       d="M22 12a10 10 0 0 1-10 10"
//                       stroke="white"
//                       strokeWidth="4"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                   Logging in...
//                 </>
//               ) : (
//                 <>
//                   Login
//                   <ArrowRight
//                     size={18}
//                     className="transition-transform group-hover:translate-x-1"
//                   />
//                 </>
//               )}
//             </motion.button>

//             {/* Divider */}
//             <div className="flex items-center gap-4">
//               <div className="h-px flex-1 bg-white/10" />
//               <span className="text-xs uppercase tracking-widest text-gray-500">
//                 OR
//               </span>
//               <div className="h-px flex-1 bg-white/10" />
//             </div>

//             {/* Google Button (optional) */}
//             <button
//               type="button"
//               className="w-full rounded-xl border border-white/10 bg-white/5 py-3 font-medium text-white transition hover:bg-white/10"
//             >
//               <a
//                 href="http://localhost:5000/api/auth/google"
//                 className="flex items-center gap-3 w-full justify-center rounded-xl border border-white/10
//              bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/[0.08] transition"
//               >
//                 <img src="/google.svg" className="h-4 w-4" alt="Google" />
//                 Continue with Google
//               </a>

//             </button>
//           </form>

//           {/* Register */}
//           <p className="mt-8 text-center text-sm text-gray-400">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="font-semibold text-indigo-400 transition hover:text-indigo-300"
//             >
//               Create one
//             </Link>
//           </p>

//           {/* Footer */}
//           <div className="mt-8 border-t border-white/10 pt-5 text-center">
//             <p className="text-xs text-gray-500">
//               © {new Date().getFullYear()} SnipVault • Secure Code Snippet
//               Manager
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, UserKey } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Spotlight } from "@/components/ui/spotlight";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unverified, setUnverified] = useState(false); // ← tracks unverified state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUnverified(false);

    try {
      const { data } = await api.post("/auth/login", form);
      console.log("data from login", data);
      login(data.user, data.accesstoken, data.refreshtoken);
      navigate("/dashboard");
    } catch (err: any) {
      // Backend returns 403 when email is not verified
      if (err.response?.status === 403) {
        setUnverified(true);
      } else {
        setError(err.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      await api.post("/auth/resend-verification", { email: form.email });
      setError("Verification email resent! Check your inbox.");
      setUnverified(false);
    } catch {
      setError("Failed to resend. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <BackgroundRippleEffect />

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight className="top-10 right-0" fill="#6366F1" />
      <Spotlight className="bottom-0 left-1/2" fill="#06B6D4" />

      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-indigo-500/30 blur-[140px]" />
      <div className="absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="relative z-20 flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(99,102,241,.15)]"
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-violet-500/10 blur-3xl" />

          <div className="mb-8 text-center">
            <h1 className="bg-gradient-to-r from-white via-indigo-300 to-cyan-300 bg-clip-text text-4xl font-black text-transparent">
              Welcome Back
            </h1>
            <p className="mt-3 text-gray-400">Login to your SnipHub account</p>
          </div>

          {/* Generic error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Unverified email banner */}
          {unverified && (
            <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
              <p className="font-medium mb-1">Email not verified</p>
              <p className="text-amber-400/80 mb-2">
                Please check your inbox and click the verification link.
              </p>
              {form.email && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="text-amber-300 underline underline-offset-2 hover:text-amber-200 transition text-xs"
                >
                  Resend verification email →
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">Email</label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-12 pr-4 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-12 pr-12 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-transparent accent-indigo-500"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-indigo-400 transition hover:text-indigo-300"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 35px rgba(99,102,241,.45)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path
                      d="M22 12a10 10 0 0 1-10 10"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-widest text-gray-500">
                OR
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google Button */}
            <a
              href={`${import.meta.env.VITE_API_URL}/auth/google`}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 font-medium text-white transition hover:bg-white/10"
            >
            <UserKey size={18} className="text-gray-300" />
              Continue with Google
            </a>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Create one
            </Link>
          </p>

          <div className="mt-8 border-t border-white/10 pt-5 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} SnipHub • Secure Code Snippet Manager
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;