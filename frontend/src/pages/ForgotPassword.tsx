import React from "react";

export const ForgotPassword = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
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
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required ref={emailRef} />
        <button type="submit">Send Reset Link</button>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};
