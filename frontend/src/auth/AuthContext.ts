import { createContext, useContext } from "react";

export type AuthUser = {
  id: string;
};

export const AuthContext = createContext<{
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
} | null>(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth must be used within AuthProvider");
  return auth;
};
