"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Input } from "@/components/ui";
import { isEmail, isCPF, formatCPF } from "@/lib/utils";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteSweets, setFavoriteSweets] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!isEmail(email.trim())) {
      newErrors.email = "Digite um email válido";
    }

    const rawCPF = cpf.replace(/\D/g, "");
    if (!rawCPF) {
      newErrors.cpf = "CPF é obrigatório";
    } else if (!isCPF(rawCPF)) {
      newErrors.cpf = "Digite um CPF válido";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
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
      await register(
        name.trim(),
        email.trim(),
        cpf.replace(/\D/g, ""),
        password,
        favoriteSweets.trim() || undefined
      );
      router.push("/desserts");
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response?: {
            data?: { message?: string; errors?: Record<string, string[]> };
          };
        };
        const data = axiosErr.response?.data;
        if (data?.errors) {
          const fieldErrors: Record<string, string> = {};
          for (const [field, msgs] of Object.entries(data.errors)) {
            fieldErrors[field] = msgs[0];
          }
          setErrors((prev) => ({ ...prev, ...fieldErrors }));
        }
        setApiError(
          data?.message || "Cadastro falhou. Verifique seus dados."
        );
      } else {
        setApiError("Ocorreu um erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  function clearFieldError(field: string) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  return (
    <div className="flex items-start justify-center pt-12 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm space-y-6 rounded-2xl bg-rose/60 p-8 shadow-sm border border-rose"
      >
        <h1 className="text-2xl font-bold text-dark-choc text-center">
          Cadastrar
        </h1>

        {apiError && (
          <p className="rounded bg-cherry/10 p-3 text-sm text-cherry">
            {apiError}
          </p>
        )}

        <div className="space-y-2">
          <Input
            id="name"
            label="Nome"
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("name");
            }}
          />
          {errors.name && (
            <p className="text-xs text-cherry">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            id="email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
          />
          {errors.email && (
            <p className="text-xs text-cherry">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            id="cpf"
            label="CPF"
            type="text"
            required
            value={cpf}
            onChange={(e) => {
              setCpf(formatCPF(e.target.value));
              clearFieldError("cpf");
            }}
            placeholder="000.000.000-00"
          />
          {errors.cpf && (
            <p className="text-xs text-cherry">{errors.cpf}</p>
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
              clearFieldError("password");
            }}
          />
          {errors.password && (
            <p className="text-xs text-cherry">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            id="favoriteSweets"
            label="Doces Favoritos (opcional)"
            type="text"
            value={favoriteSweets}
            onChange={(e) => setFavoriteSweets(e.target.value)}
            placeholder="Ex: Panettone, Cheesecake"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>

        <p className="text-center text-sm text-milk-choc">
          Já tem conta?{" "}
          <Link href="/login" className="text-cherry hover:underline font-medium">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
