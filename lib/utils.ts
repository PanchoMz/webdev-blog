import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge CSS classes
// Combines clsx for conditional classes and tailwind-merge for Tailwind CSS optimization
// This prevents duplicate classes and resolves conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
