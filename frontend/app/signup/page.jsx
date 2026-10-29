"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginStyles } from "@/assets/dummyStyles";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setSubmitting(true);
    const result = await register(form);
    setSubmitting(false);
    if (result.ok) {
      router.replace("/app/dashboard");
    } else {
      setError(result.error || "Registration failed");
    }
  };

  return (
    <div className={loginStyles.root}>
      <div className={loginStyles.container}>
        <div className={loginStyles.formContainer}>
          <h1 className={loginStyles.title}>Create your account</h1>
          <p className={loginStyles.subtitle}>Start generating invoices in seconds</p>

          {error && <div className={loginStyles.error}>{error}</div>}

          <form className={loginStyles.form} onSubmit={onSubmit}>
            <div className={loginStyles.formGroup}>
              <label className={loginStyles.label} htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={loginStyles.input}
                value={form.name}
                onChange={onChange}
              />
            </div>

            <div className={loginStyles.formGroup}>
              <label className={loginStyles.label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={loginStyles.input}
                value={form.email}
                onChange={onChange}
              />
            </div>

            <div className={loginStyles.formGroup}>
              <label className={loginStyles.label} htmlFor="password">
                Password
              </label>
              <div className={loginStyles.passwordContainer}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className={loginStyles.passwordInput}
                  value={form.password}
                  onChange={onChange}
                />
                <button
                  type="button"
                  className={loginStyles.passwordToggle}
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={loginStyles.submitButton}
              disabled={submitting}
            >
              {submitting ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className={loginStyles.signupContainer}>
            Already have an account?{" "}
            <Link href="/login" className={loginStyles.signupLink}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
