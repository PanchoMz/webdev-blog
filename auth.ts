/**
 * NextAuth.js Main Configuration File
 *
 * This file exports the main NextAuth.js configuration including:
 * - Authentication handlers for API routes
 * - Auth function for server-side session access
 * - Sign-in and sign-out functions
 * - Database adapter configuration
 * - Session strategy settings
 * - Custom events and page configurations
 *
 * @fileoverview NextAuth.js configuration with Prisma adapter
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

/**
 * NextAuth.js configuration object
 * Combines the base auth config with database adapter and custom settings
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Use Prisma adapter for database operations
  adapter: PrismaAdapter(db),

  // Use JWT strategy for session management
  session: { strategy: "jwt" },

  // Spread the base auth configuration
  ...authConfig,

  // Custom events that trigger during authentication flow
  events: {
    /**
     * Event triggered when a user links their account (e.g., via OAuth)
     * Automatically verifies the user's email when they link an OAuth account
     */
    async linkAccount({ user }) {
      /* Email verification */
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  // Custom page configurations
  pages: {
    signIn: "/login", // Redirect to custom login page
  },
});
