"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Input } from "@/components/ui";
import { isEmail, isCPF, formatCPF } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    const value = email.trim();

    if (!value) {
      newErrors.email = "Email ou CPF é obrigatório";
    } else if (!isEmail(value) && !isCPF(value)) {
      newErrors.email = "Digite um email ou CPF válido";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    setLoading(true);
    try {
      await login(email.trim(), password);
      router.push("/desserts");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setApiError(
          axiosErr.response?.data?.message || "Email/CPF ou senha inválidos"
        );
      } else {
        setApiError("Ocorreu um erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleEmailChange(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length > 3 && digits.length <= 11) {
      setEmail(formatCPF(value));
    } else {
      setEmail(value);
    }
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  }

  return (
    <div className="flex items-start justify-center pt-12 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm space-y-6 rounded-2xl bg-rose/60 p-8 shadow-sm border border-rose"
      >
        <h1 className="text-2xl font-bold text-dark-choc text-center">
          Entrar
        </h1>

        {apiError && (
          <p className="rounded bg-cherry/10 p-3 text-sm text-cherry">
            {apiError}
          </p>
        )}

        <div className="space-y-2">
          <Input
            id="email"
            label="Email ou CPF"
            type="text"
            required
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="email@exemplo.com ou 000.000.000-00"
          />
          {errors.email && (
            <p className="text-xs text-cherry">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            id="password"
            label="Senha"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {errors.password && (
            <p className="text-xs text-cherry">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <p className="text-center text-sm text-milk-choc">
          Não tem conta?{" "}
          <Link href="/register" className="text-cherry hover:underline font-medium">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
