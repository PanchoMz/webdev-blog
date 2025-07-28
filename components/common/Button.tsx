/**
 * Button Component
 *
 * This is a reusable button component with multiple variants and features:
 * - Different styles (outline, small, default)
 * - Icon support with react-icons
 * - Disabled state handling
 * - TypeScript support with proper prop types
 * - Consistent styling with Tailwind CSS
 * - Accessibility features
 *
 * @fileoverview Reusable button component with multiple variants
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

/**
 * Button component props interface
 * Defines all available props for the button component
 */
interface ButtonProps {
  /** The text label displayed on the button */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether to use outline style instead of filled */
  outline?: boolean;
  /** Whether to use small size variant */
  small?: boolean;
  /** Optional icon component from react-icons */
  icon?: IconType;
  /** Additional CSS classes to apply */
  className?: string;
  /** HTML button type attribute */
  type?: "button" | "submit" | "reset" | undefined;
  /** Click event handler function */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Reusable button component with multiple variants
 *
 * @param props - ButtonProps object containing all button configuration
 * @returns JSX.Element - The rendered button component
 *
 * @description
 * This component provides a flexible button implementation that:
 * - Supports multiple visual styles (outline, small, default)
 * - Handles disabled states with proper styling
 * - Supports icon integration with react-icons
 * - Uses consistent styling with Tailwind CSS
 * - Provides proper accessibility attributes
 * - Allows custom className for additional styling
 */
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
        // Base button styles
        "relative disabled:opacity-70 disabled:cursor-not-allowed",
        "rounded-md border-2 hover:opacity-80 transition",
        "w-auto border-slate-300 flex items-center justify-center gap-2",
        "py-3 px-5 bg-slate-700 text-white dark:border-slate-700",

        // Outline variant styles
        outline &&
          "bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600",

        // Small variant styles
        small && "py-1 text-sm px-2 border-[1px]",

        // Custom className for additional styling
        className
      )}
    >
      {/* Render icon if provided */}
      {Icon && <Icon size={30} />}

      {/* Button label */}
      {label}
    </button>
  );
};

export default Button;
