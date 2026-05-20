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
      newErrors.email = "Email or CPF is required";
    } else if (!isEmail(value) && !isCPF(value)) {
      newErrors.email = "Enter a valid email or CPF";
    }

    if (!password) {
      newErrors.password = "Password is required";
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
          axiosErr.response?.data?.message || "Invalid email/CPF or password"
        );
      } else {
        setApiError("An unexpected error occurred. Please try again.");
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-sm space-y-6 rounded-lg bg-white p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-zinc-900">Login</h1>

        {apiError && (
          <p className="rounded bg-red-50 p-3 text-sm text-red-600">
            {apiError}
          </p>
        )}

        <div className="space-y-2">
          <Input
            id="email"
            label="Email or CPF"
            type="text"
            required
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="email@example.com or 000.000.000-00"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            id="password"
            label="Password"
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
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
