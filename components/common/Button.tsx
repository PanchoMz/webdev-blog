"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  disabled,
  outline,
  small,
  icon: Icon,
  className,
  type,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative disabled:opacity-70 disabled:cursor-not-allowed",
        "rounded-md border-2 hover:opacity-80 transition",
        "w-auto border-slate-300 flex items-center justify-center gap-2",
        "py-3 px-5 bg-slate-700 text-white dark:border-slate-700",
        outline &&
          "bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600",
        small && "py-1 text-sm px-2 border-[1px]",
        className
      )}
    >
      {Icon && <Icon size={30} />}
      {label}
    </button>
  );
};

export default Button;
