"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { api } from "@/lib/api";
import {
  getToken,
  setToken,
  removeToken,
  getStoredUser,
  setStoredUser,
  type User,
} from "@/lib/auth";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, cpf: string, password: string, favoriteSweets?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (getToken()) {
      const stored = getStoredUser();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setUser(stored);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await api.post("/users/login", { email, password });
    const { token, user: userData } = response.data;
    setToken(token);
    setStoredUser(userData);
    setUser(userData);
  }, []);

  const register = useCallback(
    async (name: string, email: string, cpf: string, password: string, favoriteSweets?: string) => {
      const response = await api.post("/users", {
        name,
        email,
        cpf,
        password,
        favoriteSweets,
      });
      const { token, user: userData } = response.data;
      setToken(token);
      setStoredUser(userData);
      setUser(userData);
    },
    []
  );

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
