import { createContext, useContext, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "arcm_editor_session";

const COMPANY_CREDENTIALS = {
  email: "company@arcm.com",
  password: "ARCM2026",
  name: "Editor ARCM",
};

const AuthContext = createContext(null);

const readStoredSession = () => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.email !== "string") return null;
    return parsed;
  } catch (error) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredSession());

  const login = ({ email, password }) => {
    const normalizedEmail = (email || "").trim().toLowerCase();

    if (
      normalizedEmail !== COMPANY_CREDENTIALS.email ||
      password !== COMPANY_CREDENTIALS.password
    ) {
      return {
        ok: false,
        message: "Credenciales incorrectas.",
      };
    }

    const nextUser = {
      email: COMPANY_CREDENTIALS.email,
      name: COMPANY_CREDENTIALS.name,
    };

    setUser(nextUser);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
    }

    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
