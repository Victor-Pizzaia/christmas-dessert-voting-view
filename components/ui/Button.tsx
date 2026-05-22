"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  primary:
    "bg-strawberry text-white hover:bg-cherry focus:ring-strawberry shadow-sm",
  secondary:
    "bg-caramel text-dark-choc hover:bg-rose focus:ring-caramel",
  ghost:
    "bg-transparent text-milk-choc hover:bg-rose/50 focus:ring-rose",
  danger:
    "bg-cherry text-white hover:bg-red-700 focus:ring-cherry",
};

const sizes = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
