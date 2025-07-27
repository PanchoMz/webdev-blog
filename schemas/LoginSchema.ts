import { z } from "zod";

// Zod validation schema for login form
// Defines the structure and validation rules for login data
export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// TypeScript type derived from the Zod schema
// Used for type safety in form handling
export type LoginSchemaType = z.infer<typeof LoginSchema>;
