import React from "react";
import { useNavigate } from "react-router";

export const ResetPassword = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
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
      <div>
        <h1>Invalid Password Reset Link</h1>
        <p>This password reset link is invalid.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          minLength={8}
          type="password"
          id="password"
          name="password"
          required
          ref={passwordRef}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          minLength={8}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          ref={confirmPasswordRef}
        />
        <button type="submit">Reset Password</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};
