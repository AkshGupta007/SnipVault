
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { useEffect, useRef } from "react";
;
import type { User } from "../types/index";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();


const processed = useRef(false);

useEffect(() => {
  if (processed.current) return;
  processed.current = true;

  const params = new URLSearchParams(window.location.search);

  const accesstoken = params.get("accesstoken");
  const refreshtoken = params.get("refreshtoken");
  const userRaw = params.get("user");

  if (!accesstoken || !refreshtoken || !userRaw) {
    navigate("/login", { replace: true });
    return;
  }

  const user = JSON.parse(userRaw);

  loginWithToken(user, accesstoken, refreshtoken);

  navigate("/dashboard", { replace: true });
}, [loginWithToken, navigate]);

  return (
    <div className="min-h-screen bg-[#08090D] flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-indigo-400/30 border-t-indigo-400 animate-spin" />
        <p className="text-zinc-400 text-sm">Signing you in...</p>
      </div>
    </div>
  );
}
