"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </AuthProvider>
  );
}
