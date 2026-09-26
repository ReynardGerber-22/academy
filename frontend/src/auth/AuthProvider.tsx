import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, ValidationError, type AuthUser } from "./AuthContext";
import { csrfHeaders } from "./csrfHeaders";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Populate this only after the authentication service verifies a session.
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user", {
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
        ...csrfHeaders(),
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

  const logout = async (): Promise<void> => {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...csrfHeaders(),
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Logout failed");
    }
    setUser(null);
  };

  const register = async (
    first_name: string,
    surname: string,
    email: string,
    password: string,
    password_confirmation: string,
  ): Promise<void> => {
    await fetch("/sanctum/csrf-cookie", {
      credentials: "include",
    });
    const response = await fetch("/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...csrfHeaders(),
        Accept: "application/json",
      },
      body: JSON.stringify({
        first_name,
        surname,
        email,
        password,
        password_confirmation,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      throw new ValidationError(
        data.message || "Registration failed",
        data.errors || {},
      );
    }
    const data = await response.json();
    setUser(data.user);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, loading, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
