import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../types/index";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (user: User, accesstoken: string, refreshtoken: string) => void;
  logout: () => void;
  isLoading: boolean;
  loginWithToken: (
    user: User,
    accesstoken: string,
    refreshtoken: string,
  ) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setAccessToken(token);
      setUser(JSON.parse(savedUser) as User);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("AuthProvider user changed:", user);
  }, [user]);

  const login = (user: User, accesstoken: string, refreshtoken: string) => {
    setUser(user);
    setAccessToken(accesstoken);
    localStorage.setItem("accessToken", accesstoken);
    localStorage.setItem("refreshToken", refreshtoken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  const loginWithToken = (
    user: User,
    accesstoken: string,
    refreshtoken: string,
  ) => {
    console.log("Logging in with token:", { user, accesstoken, refreshtoken });
    setUser(user);
    setAccessToken(accesstoken);
    localStorage.setItem("accessToken", accesstoken);
    localStorage.setItem("refreshToken", refreshtoken);
    localStorage.setItem("user", JSON.stringify(user));
  };
 useEffect(() => {
   console.log("AuthProvider mounted");

   return () => {
     console.log("AuthProvider unmounted");
   };
 }, []);
  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, isLoading, loginWithToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
