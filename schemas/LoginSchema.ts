/**
 * Login Validation Schema
 *
 * This file defines the Zod validation schema for login forms:
 * - Email validation with proper format checking
 * - Password validation with minimum length requirements
 * - TypeScript type generation for type safety
 * - Error messages for user feedback
 *
 * @fileoverview Login form validation schema using Zod
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import { z } from "zod";

/**
 * Zod validation schema for login form
 * Defines the structure and validation rules for login data
 *
 * @description
 * - email: Must be a valid email format
 * - password: Must be at least 8 characters long
 */
export const LoginSchema = z.object({
  // Email field with validation
  email: z.string().email({ message: "Invalid email address" }),

  // Password field with minimum length validation
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

/**
 * TypeScript type derived from the Zod schema
 * Used for type safety in form handling and API responses
 *
 * @example
 * const loginData: LoginSchemaType = {
 *   email: "user@example.com",
 *   password: "password123"
 * };
 */
export type LoginSchemaType = z.infer<typeof LoginSchema>;
