import { Eye } from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (email && password) {
      try {
        setError(null);
        await login(email, password);
        navigate("/");
      } catch {
        setError("Invalid username or password");
      }
    }
  };

  return (
    <section
      aria-labelledby="login-title"
      className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-sand px-5 py-12"
    >
      <div className="w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-card">
        <div className="flex flex-col space-y-1 p-6">
          <h1
            id="login-title"
            className="text-2xl font-semibold tracking-tight"
          >
            Welcome back
          </h1>
          <div className="text-sm text-muted-foreground">
            Sign in to continue your tax studies.
          </div>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                id="email"
                ref={emailRef}
                placeholder="you@example.com"
                required
                autoComplete="email"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="password"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-brand hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                  id="password"
                  placeholder="••••••••"
                  required
                  ref={passwordRef}
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            {error && <p className="text-brand text-center">{error}</p>}
            <button
              className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/" className="text-brand hover:underline">
              Enrol to get started
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
