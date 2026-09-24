import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext";
import { LoaderCircle } from "lucide-react";

export const RequireAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <LoaderCircle className="animate-spin fixed inset-0 m-auto size-8" />
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search + location.hash }}
      />
    );
  }

  return <Outlet />;
};
