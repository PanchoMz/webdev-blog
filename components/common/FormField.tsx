/**
 * Form Field Component
 *
 * This is a reusable form field component that integrates with react-hook-form:
 * - Generic TypeScript support for type safety
 * - Error handling and validation display
 * - Consistent styling with Tailwind CSS
 * - Accessibility features with proper labels
 * - Disabled state handling
 * - Custom className support
 *
 * @fileoverview Reusable form field with react-hook-form integration
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

/**
 * Props interface for the FormField component
 * Generic type T extends FieldValues for type safety with react-hook-form
 *
 * @template T - The type of the form values object
 */
interface FormFieldProps<T extends FieldValues> {
  /** Unique identifier for the form field */
  id: string;
  /** HTML input type attribute */
  type?: string;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Placeholder text for the input */
  placeholder: string;
  /** Optional label text for the field */
  label?: string;
  /** Additional CSS classes for the input element */
  inputClassName?: string;
  /** react-hook-form register function */
  register: UseFormRegister<T>;
  /** react-hook-form errors object */
  errors: FieldErrors;
}

/**
 * Reusable form field component with validation support
 * Integrates with react-hook-form for form state management
 *
 * @template T - The type of the form values object
 * @param props - FormFieldProps object containing field configuration
 * @returns JSX.Element - The rendered form field component
 *
 * @description
 * This component provides a complete form field implementation that:
 * - Integrates seamlessly with react-hook-form
 * - Displays validation errors with proper styling
 * - Supports different input types (text, password, email, etc.)
 * - Handles disabled states appropriately
 * - Provides consistent styling across the application
 * - Supports custom className for additional styling
 * - Includes proper accessibility attributes
 */
const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  placeholder,
  label,
  inputClassName,
  register,
  errors,
}: FormFieldProps<T>) => {
  // Extract error message for the current field
  const message = errors[id] && (errors[id]?.message as string);

  return (
    <div>
      {/* Optional label for the input field */}
      {label && <span className="block text-sm">{label}</span>}

      {/* Input field with react-hook-form registration */}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id as Path<T>)}
        placeholder={placeholder}
        className={cn(
          // Base input styles
          "w-full p-3 my-2 outline-none rounded-md border disabled:opacity-70 disabled:cursor-not-allowed border-slate-300 dark:border-slate-700 focus:border-slate-500 dark:focus:border-slate-400",

          // Error state styles
          errors[id] && "border-rose-400 focus:border-rose-500",

          // Custom className for additional styling
          inputClassName
        )}
      />

      {/* Error message display */}
      {message && <span className="text-sm text-rose-400">{message}</span>}
    </div>
  );
};

export default FormField;
