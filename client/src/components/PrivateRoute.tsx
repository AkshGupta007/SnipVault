import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  console.log({
     user,
  isLoading,
  pathname: window.location.pathname,
});
 

  if (isLoading) return <div className="text-white p-4">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
