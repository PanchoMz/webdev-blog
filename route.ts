/**
 * Route Constants File
 *
 * This file defines route constants used throughout the application:
 * - Public routes that don't require authentication
 * - Authentication routes for login/register
 * - API authentication prefix
 * - Default redirect after successful login
 *
 * @fileoverview Route constants for authentication and navigation
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

/**
 * Routes that are accessible to all users without authentication
 * These routes can be accessed by both authenticated and unauthenticated users
 */
export const publicRoutes = ["/", "/email-verification"];

/**
 * Routes that are only accessible to unauthenticated users
 * Authenticated users will be redirected away from these routes
 */
export const authRoutes = ["/login", "/register"];

/**
 * API authentication prefix
 * Used to identify NextAuth.js API routes
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect destination after successful login
 * Users will be redirected to this route after signing in
 */
export const LOGIN_REDIRECT = "/user/1";
