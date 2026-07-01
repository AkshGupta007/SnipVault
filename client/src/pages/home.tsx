import { Link } from "react-router-dom";
import { Code2, Star, Lock, ArrowRight } from "lucide-react";
import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <WebcamPixelGrid
          gridCols={60}
          gridRows={40}
          maxElevation={50}
          motionSensitivity={0.25}
          elevationSmoothing={0.2}
          colorMode="webcam"
          backgroundColor="#030303"
          mirror
          gapRatio={0.05}
          darken={0.7}
          borderColor="#ffffff"
          borderOpacity={0.04}
          className="w-full h-full"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black pointer-events-none" />

      {/* Navbar */}
      <nav className="absolute top-0 left-0 z-20 flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-10 lg:py-6">
        <h1 className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl lg:text-2xl">
          <Code2 className="h-7 w-7 text-indigo-400" />
          SnipVault
        </h1>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/login"
            className="rounded-full border border-white/20 px-5 py-2 text-white transition hover:bg-white/10"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-500 sm:px-6"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-28 pb-12 sm:px-8">
        <div className="max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs sm:px-5 sm:text-sm text-indigo-300 backdrop-blur-md">
            🚀 Organize • Share • Reuse Code Faster
          </div>

          {/* Heading */}
          <h1
            className="font-black leading-tight tracking-tight text-white text-4xl 
sm:text-5xl
md:text-6xl
lg:text-7xl
xl:text-8xl"
          >
            Store Every
            <span className="block bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Code Snippet
            </span>
            In One Secure Place
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-3xl  text-gray-300 text-base leading-7sm:text-lg md:text-xl">
            Save, organize, search and share your favorite code snippets. Never
            lose useful code again. Built for developers who value speed and
            productivity.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/register"
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 text-lg font-semibold text-white transition hover:scale-105 hover:bg-indigo-500 sm:w-auto"
            >
              Start for Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/login"
              className="flex h-14 w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-lg text-white backdrop-blur-md transition hover:bg-white/10 sm:w-auto"
            >
              Login
            </Link>
          </div>

          {/* Features */}
          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <Code2 className="mx-auto mb-4 h-10 w-10 text-indigo-400" />
              <h3 className="mb-2 text-lg sm:text-xl font-semibold text-white">
                Smart Organization
              </h3>
              <p className="text-gray-400">
                Categorize snippets with tags and folders for lightning-fast
                access.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <Star className="mx-auto mb-4 h-10 w-10 text-yellow-400" />
              <h3 className="mb-2 text-lg sm:text-xl font-semibold text-white">
                Favorites
              </h3>
              <p className="text-gray-400">
                Bookmark your most-used snippets and access them instantly.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <Lock className="mx-auto mb-4 h-10 w-10 text-green-400" />
              <h3 className="mb-2 text-lg sm:text-xl font-semibold text-white">
                Secure Storage
              </h3>
              <p className="text-gray-400">
                Keep your personal snippets private while sharing public ones
                when needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
