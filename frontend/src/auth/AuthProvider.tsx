import { useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Populate this only after the authentication service verifies a session.
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
