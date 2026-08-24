"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AuthUser,
  fetchMe,
  login as apiLogin,
  logout as apiLogout,
  LoginPayload,
  register as apiRegister,
  RegisterPayload,
} from "./api";

const STORAGE_KEY = "wholesale_auth_token";

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      setLoading(false);
      return;
    }

    fetchMe(stored).then((me) => {
      if (me) {
        setUser(me);
        setToken(stored);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }

      setLoading(false);
    });
  }, []);

  async function login(payload: LoginPayload) {
    const result = await apiLogin(payload);

    localStorage.setItem(STORAGE_KEY, result.token);
    setToken(result.token);
    setUser(result.user);
  }

  async function register(payload: RegisterPayload) {
    const result = await apiRegister(payload);

    localStorage.setItem(STORAGE_KEY, result.token);
    setToken(result.token);
    setUser(result.user);
  }

  async function logout() {
    if (token) {
      await apiLogout(token).catch(() => {});
    }

    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
}
