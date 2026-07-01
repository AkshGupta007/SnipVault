// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between">
//       {/* Logo */}
//       <Link
//         to="/dashboard"
//         className="text-white font-bold text-lg tracking-tight"
//       >
//         Snip<span className="text-indigo-400">Vault</span>
//       </Link>

//       {/* Links */}
//       <div className="flex items-center gap-4">
//         <Link
//           to="/dashboard"
//           className="text-gray-400 hover:text-white text-sm transition"
//         >
//           All Snippets
//         </Link>
//         <Link
//           to="/starred"
//           className="text-gray-400 hover:text-white text-sm transition"
//         >
//           ⭐ Starred
//         </Link>
//         <Link
//           to="/snippet/new"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-lg transition"
//         >
//           + New
//         </Link>

//         {/* User + Logout */}
//         <div className="flex items-center gap-2 ml-2">
//           <span className="text-gray-400 text-sm">{user?.name}</span>
//           <button
//             onClick={handleLogout}
//             className="text-gray-500 hover:text-red-400 text-sm transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  TerminalSquare,
  LayoutGrid,
  Star,
  Plus,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { to: "/dashboard", label: "All snippets", icon: LayoutGrid },
  { to: "/starred", label: "Starred", icon: Star },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <nav className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#08090D]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400">
            <TerminalSquare size={17} className="text-white" />
          </div>
          <span className="font-mono text-[15px] font-semibold tracking-tight text-white">
            Snip<span className="text-indigo-400">Vault</span>
          </span>
        </Link>

        {/* Links + actions */}
        <div className="hidden md:flex items-center gap-1.5">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`group relative inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                  active
                    ? "border-indigo-400/30 bg-indigo-500/10 text-indigo-200"
                    : "border-transparent text-zinc-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon
                  size={14}
                  className={
                    active
                      ? "text-indigo-300"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }
                  fill={to === "/starred" && active ? "currentColor" : "none"}
                />
                {label}
              </Link>
            );
          })}

          <Link
            to="/snippet/new"
            className="ml-1 inline-flex items-center gap-1.5 rounded-xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500 to-indigo-600 px-3.5 py-1.5 text-[13px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(99,102,241,0.6)] transition-all duration-200 hover:from-indigo-400 hover:to-indigo-500 active:scale-[0.97]"
          >
            <Plus size={14} />
            New
          </Link>

          {/* User menu */}
          <div className="relative ml-2">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-2.5 text-left transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 font-mono text-[10px] font-semibold text-white">
                {initials}
              </span>
              <span className="max-w-[110px] truncate text-[13px] text-zinc-300">
                {user?.name || "Account"}
              </span>
              <ChevronDown
                size={13}
                className={`text-zinc-500 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#0C0D13]/95 p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                  <div className="border-b border-white/[0.06] px-3 py-2.5">
                    <p className="truncate text-[13px] font-medium text-zinc-200">
                      {user?.name}
                    </p>
                    <p className="truncate text-[11px] text-zinc-500">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-zinc-400 transition hover:bg-red-500/10 hover:text-red-300"
                  >
                    <LogOut size={14} />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 z-50 h-screen w-72 border-l border-white/10 bg-[#0C0D13] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400">
                  <TerminalSquare size={18} className="text-white" />
                </div>

                <span className="font-semibold text-white">
                  Snip<span className="text-indigo-400">Vault</span>
                </span>
              </div>

              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <X size={20} className="text-zinc-300" />
              </button>
            </div>

            {/* User */}
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 font-bold text-white">
                  {initials}
                </div>

                <div>
                  <p className="font-medium text-zinc-200">{user?.name}</p>

                  <p className="text-sm text-zinc-500">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}

            <div className="flex flex-col p-3">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`mb-1 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    location.pathname === to
                      ? "bg-indigo-500/10 text-indigo-300"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}

              <Link
                to="/snippet/new"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-500"
              >
                <Plus size={18} />
                New Snippet
              </Link>

              <button
                onClick={handleLogout}
                className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => setMobileOpen(true)}
        className="rounded-lg p-2 text-zinc-300 transition hover:bg-white/10 md:hidden"
      >
        <Menu size={22} />
      </button>
    </nav>
  );
};

export default Navbar;