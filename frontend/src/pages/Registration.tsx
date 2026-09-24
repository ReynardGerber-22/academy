import { useNavigate } from "react-router";
import {
  useAuth,
  ValidationError,
  type ValidationErrors,
} from "../auth/AuthContext";
import { useRef, useState } from "react";

export const Registration = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirmation = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

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
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input type="text" ref={name} required autoComplete="name" />
          {errors.name &&
            errors.name.map((error, index) => (
              <p className="text-red-500" key={index}>
                {error}
              </p>
            ))}
        </div>
        <div>
          <label>Email</label>
          <input type="email" ref={email} required autoComplete="email" />
          {errors.email &&
            errors.email.map((error, index) => (
              <p className="text-red-500" key={index}>
                {error}
              </p>
            ))}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            ref={password}
            required
            minLength={8}
            autoComplete="new-password"
          />
          {errors.password &&
            errors.password.map((error, index) => (
              <p className="text-red-500" key={index}>
                {error}
              </p>
            ))}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            ref={passwordConfirmation}
            required
            autoComplete="new-password"
          />
          {errors.password_confirmation &&
            errors.password_confirmation.map((error, index) => (
              <p className="text-red-500" key={index}>
                {error}
              </p>
            ))}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
