"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const API_BASE = "http://localhost:4000";
const TOKEN_KEY = "token";

const AuthContext = createContext(null);

function readStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function writeStoredToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore storage errors */
  }
}

export function AuthProvider({ children }) {
  // Start null on both server and client render to avoid a hydration
  // mismatch (localStorage isn't available during server rendering); the
  // real stored token is picked up in the effect below, right before the
  // existing "validate against /api/auth/me" effect runs.
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setToken(readStoredToken());
    setHydrated(true);
  }, []);

  // Validate the stored token on load / whenever it changes.
  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;

    async function loadMe() {
      if (!token) {
        setUser(null);
        setIsLoaded(true);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok && data.success) {
          setUser(data.user);
        } else {
          setUser(null);
          setToken(null);
          writeStoredToken(null);
        }
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    }

    loadMe();
    return () => {
      cancelled = true;
    };
  }, [token, hydrated]);

  const applySession = useCallback((nextToken, nextUser) => {
    setToken(nextToken);
    writeStoredToken(nextToken);
    setUser(nextUser || null);
    setIsLoaded(true);
  }, []);

  const register = useCallback(
    async ({ name, email, password }) => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          return { ok: false, error: data.message || "Registration failed" };
        }
        applySession(data.token, data.user);
        return { ok: true };
      } catch {
        return { ok: false, error: "Network error" };
      }
    },
    [applySession]
  );

  const login = useCallback(
    async ({ email, password }) => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          return { ok: false, error: data.message || "Login failed" };
        }
        applySession(data.token, data.user);
        return { ok: true };
      } catch {
        return { ok: false, error: "Network error" };
      }
    },
    [applySession]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    writeStoredToken(null);
  }, []);

  // Clerk-compatible: accepts (and ignores) an options arg, returns a promise.
  const getToken = useCallback(async () => readStoredToken(), []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoaded,
      isSignedIn: Boolean(token && user),
      getToken,
      login,
      register,
      logout,
      signOut: logout,
    }),
    [user, token, isLoaded, getToken, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}

// Drop-in replacements for the Clerk <SignedIn> / <SignedOut> components.
export function SignedIn({ children }) {
  const { isSignedIn } = useAuth();
  return isSignedIn ? <>{children}</> : null;
}

export function SignedOut({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  return isLoaded && !isSignedIn ? <>{children}</> : null;
}
