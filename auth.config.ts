/**
 * NextAuth.js Configuration File
 *
 * This file defines the authentication providers and configuration for NextAuth.js:
 * - OAuth providers (Google, GitHub)
 * - Credentials provider for email/password authentication
 * - User validation and password verification
 * - Environment variable configuration for OAuth clients
 *
 * @fileoverview NextAuth.js providers and authentication configuration
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";
import { LoginSchema } from "./schemas/LoginSchema";
import { getUserByEmail } from "./lib/user";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

/**
 * NextAuth.js configuration object
 * Defines all authentication providers and their settings
 */
export default {
  // Authentication providers configuration
  providers: [
    // Google OAuth provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // GitHub OAuth provider
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // Credentials provider for email/password authentication
    Credentials({
      /**
       * Authorize function for credentials provider
       * Validates user credentials and returns user object if valid
       *
       * @param credentials - The credentials object containing email and password
       * @returns User object if credentials are valid, null otherwise
       */
      async authorize(credentials) {
        // Validate credentials using Zod schema
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // Get user from database by email
          const user = await getUserByEmail(email);

          // Return null if user doesn't exist or has no password
          if (!user || !user.password) return null;

          // Compare provided password with hashed password in database
          const isCorrectPassword = await bcrypt.compare(
            password,
            user.password
          );

          // Return null if password is incorrect
          if (!isCorrectPassword) return null;

          // Return user object for successful authentication
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }

        // Return null for invalid credentials
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
