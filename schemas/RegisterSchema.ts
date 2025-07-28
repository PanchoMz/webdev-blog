/**
 * Registration Validation Schema
 *
 * This file defines the Zod validation schema for registration forms:
 * - Name validation with length constraints
 * - Email validation with proper format checking
 * - Password validation with minimum length requirements
 * - Password confirmation with matching validation
 * - TypeScript type generation for type safety
 *
 * @fileoverview Registration form validation schema using Zod
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import { z } from "zod";

/**
 * Zod validation schema for registration form
 * Defines the structure and validation rules for registration data
 *
 * @description
 * - name: Must be between 4 and 30 characters
 * - email: Must be a valid email format
 * - password: Must be at least 8 characters long
 * - confirmPassword: Must match the password field
 */
export const RegisterSchema = z
  .object({
    // Name field with length validation
    name: z
      .string()
      .min(4, { message: "Name must be at least 4 characters" })
      .max(30, { message: "Name must be less than 30 characters" }),

    // Email field with validation
    email: z.string().email({ message: "Invalid email address" }),

    // Password field with minimum length validation
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    // Password confirmation field
    confirmPassword: z.string(),
  })
  // Custom validation to ensure passwords match
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Specify which field the error belongs to
  });

/**
 * TypeScript type derived from the Zod schema
 * Used for type safety in form handling and API responses
 *
 * @example
 * const registerData: RegisterSchemaType = {
 *   name: "John Doe",
 *   email: "john@example.com",
 *   password: "password123",
 *   confirmPassword: "password123"
 * };
 */
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
