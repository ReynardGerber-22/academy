import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Populate this only after the authentication service verifies a session.
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("api/user", {
          credentials: "include",
        });
        if (response.ok) {
          const user = await response.json();
          setUser(user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await fetch("/sanctum/csrf-cookie", {
      credentials: "include",
    });
    const response = await fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    setUser(data.user);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
