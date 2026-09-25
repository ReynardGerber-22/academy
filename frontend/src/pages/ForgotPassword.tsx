import { useRef, useState, type SubmitEvent } from "react";

export const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: emailRef.current?.value }),
      });
      if (!response.ok) {
        throw new Error("Failed to send reset link");
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setError("Failed to send reset link");
    }
  };
  return (
    <section className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-sand px-5 py-12">
      <div className="w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-card">
        <div className="flex flex-col space-y-1 p-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a reset link.
          </p>
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
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                ref={emailRef}
              />
            </div>
            {message && (
              <p
                className="text-center text-sm text-muted-foreground"
                role="status"
              >
                {message}
              </p>
            )}
            {error && <p className="text-center text-sm text-brand">{error}</p>}
            <button
              className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              type="submit"
            >
              Send reset link
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <a href="/login" className="text-brand hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
