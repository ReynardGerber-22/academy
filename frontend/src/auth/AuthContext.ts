import { createContext, useContext } from "react";

export type AuthUser = {
  id: string;
  roles: string[];
};

export type ValidationErrors = {
  first_name?: string[];
  surname?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
  roles?: string[];
};

export class ValidationError extends Error {
  public errors: ValidationErrors;

  constructor(message: string, errors: ValidationErrors) {
    super(message);
    this.errors = errors;
  }
}

export const AuthContext = createContext<{
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  logout: () => Promise<void>;
  register: (
    first_name: string,
    surname: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<void>;
} | null>(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth must be used within AuthProvider");
  return auth;
};
