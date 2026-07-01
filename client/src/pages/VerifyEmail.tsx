import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await api.get(`/auth/verify/${token}`);

        // Backend returns: { user, accesstoken, refreshtoken }
        loginWithToken(data.user, data.accesstoken, data.refreshtoken);

        setStatus("success");
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch {
        setStatus("error");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    if (token) verify();
    else navigate("/login");
  }, [token]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#08090D] flex items-center justify-center">
      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -left-32 -top-40 h-[480px] w-[480px] rounded-full opacity-40 blur-[110px]"
          style={{
            background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-120px] top-10 h-[420px] w-[420px] rounded-full opacity-30 blur-[110px]"
          style={{
            background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl text-center max-w-sm w-full mx-4">
        {status === "loading" && (
          <>
            <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-indigo-400/30 border-t-indigo-400 animate-spin" />
            <p className="text-zinc-400 text-sm">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/30">
              <span className="text-emerald-400 text-xl">✓</span>
            </div>
            <h2 className="text-white font-semibold text-lg mb-1">
              Email verified!
            </h2>
            <p className="text-zinc-400 text-sm">
              Redirecting you to dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 border border-red-400/30">
              <span className="text-red-400 text-xl">✕</span>
            </div>
            <h2 className="text-white font-semibold text-lg mb-1">
              Link invalid
            </h2>
            <p className="text-zinc-400 text-sm">
              This link has expired or already been used.
              <br />
              Redirecting to login...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
