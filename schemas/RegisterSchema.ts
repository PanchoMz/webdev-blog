import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name must be at least 4 characters" })
      .max(30, { message: "Name must be less than 30 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
