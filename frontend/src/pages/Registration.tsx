import { useNavigate } from "react-router";
import {
  useAuth,
  ValidationError,
  type ValidationErrors,
} from "../auth/AuthContext";
import { useRef, useState } from "react";
import { Eye } from "lucide-react";

export const Registration = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirmation = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    if (
      name.current &&
      email.current &&
      password.current &&
      passwordConfirmation.current
    ) {
      if (password.current.value !== passwordConfirmation.current.value) {
        setErrors({
          password_confirmation: ["Passwords do not match"],
        });
        return;
      }
      try {
        await register(
          name.current.value,
          email.current.value,
          password.current.value,
          passwordConfirmation.current.value,
        );
        navigate("/");
      } catch (error) {
        if (error instanceof ValidationError) {
          setErrors(error.errors);
          console.error("Registration failed:", error);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
  };

  return (
    <section className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-sand px-5 py-12">
      <div className="w-full max-w-sm rounded-xl border bg-card text-card-foreground shadow-card">
        <div className="flex flex-col space-y-1 p-6">
          <h1
            id="login-title"
            className="text-2xl font-semibold tracking-tight"
          >
            Sign up
          </h1>
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-primary">
              Log in
            </a>
          </p>
          <div className="text-sm text-muted-foreground">
            Sign up to start your tax studies.
          </div>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block mb-1">Name</label>
              <input
                placeholder="Enter your name"
                type="text"
                ref={name}
                required
                autoComplete="name"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
              />
              {errors.name &&
                errors.name.map((error, index) => (
                  <p className="text-red-500" key={index}>
                    {error}
                  </p>
                ))}
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                placeholder="Johndoe@example.com"
                type="email"
                ref={email}
                required
                autoComplete="email"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
              />
              {errors.email &&
                errors.email.map((error, index) => (
                  <p className="text-red-500" key={index}>
                    {error}
                  </p>
                ))}
            </div>
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  ref={password}
                  required
                  autoComplete="new-password"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
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
              {errors.password &&
                errors.password.map((error, index) => (
                  <p className="text-red-500" key={index}>
                    {error}
                  </p>
                ))}
            </div>
            <div className="mb-4">
              <label className="block mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  placeholder="Confirm your password"
                  type={showPasswordConfirmation ? "text" : "password"}
                  ref={passwordConfirmation}
                  required
                  autoComplete="new-password"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordConfirmation((visible) => !visible)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={
                    showPasswordConfirmation ? "Hide password" : "Show password"
                  }
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              {errors.password_confirmation &&
                errors.password_confirmation.map((error, index) => (
                  <p className="text-red-500" key={index}>
                    {error}
                  </p>
                ))}
            </div>
            <button
              type="submit"
              className="inline-flex h-9 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
