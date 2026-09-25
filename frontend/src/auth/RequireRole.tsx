import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

type RequireRoleProps = {
  role: string;
};

export const RequireRole = ({ role }: RequireRoleProps) => {
  const { user } = useAuth();

  if (!user?.roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
