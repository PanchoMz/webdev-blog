/**
 * Database Configuration File
 *
 * This file configures the Prisma database client with:
 * - Global type declarations for development
 * - Singleton pattern to prevent multiple database connections
 * - Development-specific optimizations for hot reloading
 *
 * @fileoverview Prisma database client configuration
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import { PrismaClient } from "@prisma/client";

/**
 * Global type declaration for Prisma client
 * This prevents multiple instances in development and enables TypeScript support
 */
declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Database client instance
 * Uses existing global instance in development to prevent multiple connections
 * In production, creates a new PrismaClient instance
 */
export const db = globalThis.prisma || new PrismaClient();

/**
 * Development-specific configuration
 * In development, store the client instance globally to prevent
 * creating multiple Prisma instances during hot reloads
 */
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
