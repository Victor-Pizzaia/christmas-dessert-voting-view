import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-rose/60 p-6 shadow-sm border border-rose ${className}`}
    >
      {children}
    </div>
  );
}
