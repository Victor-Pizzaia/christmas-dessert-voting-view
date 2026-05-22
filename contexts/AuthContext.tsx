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
import type { LoginResponse } from "@/types/auth";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
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

  const fetchUser = useCallback(async () => {
    const response = await api.get<User>("/users");
    const userData = response.data;
    setStoredUser(userData);
    setUser(userData);
    return userData;
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    const response = await api.post<LoginResponse>("/users/login", { identifier, password });
    const { token } = response.data;
    setToken(token);
    await fetchUser();
  }, [fetchUser]);

  const register = useCallback(
    async (name: string, email: string, cpf: string, password: string, favoriteSweets?: string) => {
      const favorite_sweets = favoriteSweets
        ? favoriteSweets.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      await api.post("/users", {
        name,
        email,
        cpf,
        plainPassword: password,
        favorite_sweets,
      });

      await login(email, password);
    },
    [login]
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
