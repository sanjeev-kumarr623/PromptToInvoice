"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginStyles } from "@/assets/dummyStyles";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const redirectTo = searchParams.get("from") || "/app/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await login(form);
    setSubmitting(false);
    if (result.ok) {
      router.replace(redirectTo);
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className={loginStyles.root}>
      <div className={loginStyles.container}>
        <div className={loginStyles.formContainer}>
          <h1 className={loginStyles.title}>Welcome back</h1>
          <p className={loginStyles.subtitle}>Sign in to your account</p>

          {error && <div className={loginStyles.error}>{error}</div>}

          <form className={loginStyles.form} onSubmit={onSubmit}>
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
                  autoComplete="current-password"
                  required
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
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className={loginStyles.signupContainer}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className={loginStyles.signupLink}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
