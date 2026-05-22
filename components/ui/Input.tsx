import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-dark-choc"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-lg border border-sage/50 bg-white px-3 py-2 text-sm text-dark-choc placeholder:text-milk-choc/50 focus:border-strawberry focus:outline-none focus:ring-1 focus:ring-strawberry ${className}`}
        {...props}
      />
    </div>
  );
}
