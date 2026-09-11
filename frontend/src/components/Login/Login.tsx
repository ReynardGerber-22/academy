import { useState } from "react";

export const Login = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-foreground/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <dialog
        open
        aria-labelledby="login-title"
        aria-modal="true"
        inert={!open}
        className={`fixed left-1/2 top-1/2 z-50 m-0 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 border-0 bg-transparent p-0 shadow-none transition-[opacity,transform] duration-300 ${
          open
            ? "-translate-y-1/2 opacity-100"
            : "pointer-events-none -translate-y-[calc(50%+1rem)] opacity-0"
        }`}
      >
        <div className="flex flex-1 items-center justify-center px-5 py-12">
          <div className="w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow shadow-card">
            <div className="flex flex-col space-y-1 p-6">
              <div className="flex items-start justify-between gap-4">
                <div
                  id="login-title"
                  className="font-display text-2xl font-semibold tracking-tight"
                >
                  Welcome back
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="-mr-1 -mt-1 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  aria-label="Close login"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
                Sign in to continue your tax studies.
              </div>
            </div>
            <div className="space-y-4 p-6 pt-0">
              <button
                className="inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M10.88 21.94 15.46 14" />
                  <path d="M21.17 8H12" />
                  <path d="M3.95 6.06 8.54 14" />
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                Continue with Google
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>
              <form className="space-y-4">
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
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  className="inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
        </div>
      </dialog>
    </>
  );
};