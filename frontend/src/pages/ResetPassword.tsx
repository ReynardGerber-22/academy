import { Eye } from "lucide-react";
import { useRef, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";

export const ResetPassword = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password_confirmation: confirmPasswordRef.current?.value,
          password: passwordRef.current?.value,
          token,
          email,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to reset password");
      }
      const data = await response.json();
      navigate("/login", {
        state: {
          message: data.message,
        },
      });
    } catch (error) {
      setError("Failed to reset password");
    }
  };

  if (!email || !token) {
    return (
      <section className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-sand px-5 py-12">
        <div className="w-full max-w-sm rounded-xl border bg-card p-6 text-card-foreground shadow-card">
          <h1 className="text-2xl font-semibold tracking-tight">
            Invalid reset link
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This password reset link is invalid or has expired.
          </p>
          <a
            href="/forgot-password"
            className="mt-6 inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Request a new link
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-sand px-5 py-12">
      <div className="w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-card">
        <div className="flex flex-col space-y-1 p-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset password
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a new password for your account.
          </p>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="password"
              >
                New password
              </label>
              <div className="relative">
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                  minLength={8}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  ref={passwordRef}
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
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                  minLength={8}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  ref={confirmPasswordRef}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            {error && <p className="text-center text-sm text-brand">{error}</p>}
            <button
              className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              type="submit"
            >
              Reset password
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Return to{" "}
            <a href="/login" className="text-brand hover:underline">
              sign in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
