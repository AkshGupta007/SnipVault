import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import LandingPage from "./pages/home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateSnippet from "./pages/CreateSnippet";
import EditSnippet from "./pages/EditSnippet";
import SnippetView from "./pages/SnippetView";
import Starred from "./pages/Starred";
import PublicSnippet from "./pages/PublicSnippet";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallbacks";
import VerifyEmail from "./pages/VerifyEmail";


function RouteLogger() {
  const location = useLocation();

  console.log(location.pathname);

  return null;
}

function App() {

  
  return (
    <AuthProvider>
     
      <BrowserRouter>
        <RouteLogger />
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/s/:slug" element={<PublicSnippet />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/login"
            element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            }/> */}
          <Route
            path="/snippet/new"
            element={
              <PrivateRoute>
                <CreateSnippet />
              </PrivateRoute>
            }
          />
          <Route
            path="/snippet/:id"
            element={
              <PrivateRoute>
                <SnippetView />
              </PrivateRoute>
            }
          />
          <Route
            path="/snippet/:id/edit"
            element={
              <PrivateRoute>
                <EditSnippet />
              </PrivateRoute>
            }
          />
          <Route
            path="/starred"
            element={
              <PrivateRoute>
                <Starred />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
