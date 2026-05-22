"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-sage/30 bg-vanilla/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-dark-choc">
          🎄 Christmas Dessert Voting
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/voting"
            className="text-milk-choc hover:text-cherry transition-colors"
          >
            Votações
          </Link>
          <Link
            href="/desserts"
            className="text-milk-choc hover:text-cherry transition-colors"
          >
            Doces
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/perfil"
                className="rounded-lg bg-rose px-3 py-1.5 text-sm text-dark-choc hover:bg-strawberry transition-colors"
              >
                Perfil
              </Link>
              <button
                onClick={logout}
                className="rounded-lg border border-sage px-3 py-1.5 text-sm text-milk-choc hover:bg-sage/20 transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-milk-choc hover:text-dark-choc transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-strawberry px-4 py-1.5 text-sm font-medium text-white hover:bg-cherry transition-colors shadow-sm"
              >
                Cadastrar
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
