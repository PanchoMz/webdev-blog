import { PrismaClient } from "@prisma/client";

// Global type declaration for Prisma client
// This prevents multiple instances in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Database client instance
// Uses existing global instance in development to prevent multiple connections
export const db = globalThis.prisma || new PrismaClient();

// In development, store the client instance globally
// This prevents creating multiple Prisma instances during hot reloads
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
