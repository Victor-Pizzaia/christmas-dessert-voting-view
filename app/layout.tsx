import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Christmas Dessert Voting",
  description: "Crie desafios de sobremesas com os amigos e vote na melhor!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-vanilla font-sans text-dark-choc">
        <AuthProvider>
          <Header />
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
