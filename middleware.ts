/**
 * Next.js Middleware for Authentication
 *
 * This middleware runs between requests and responses to handle:
 * - Route protection based on authentication status
 * - Redirects for authenticated/unauthenticated users
 * - API route protection
 * - Public route access control
 *
 * @fileoverview Authentication middleware for route protection
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  LOGIN_REDIRECT,
  publicRoutes,
} from "./route";
import { NextResponse } from "next/server";

// Create middleware function from NextAuth configuration
const { auth: middleware } = NextAuth(authConfig);

/**
 * Main middleware function that handles route protection
 *
 * @param req - The incoming request object
 * @returns NextResponse or undefined based on route protection logic
 */
export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Check if current route is public, auth, or API auth route
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Allow all API auth routes to pass through
  if (isApiAuthRoute) {
    return;
  }

  // Handle auth routes (login, register, etc.)
  if (isAuthRoute) {
    // If user is logged in, redirect to dashboard
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(LOGIN_REDIRECT, nextUrl));
    }
    // Allow access to auth routes for unauthenticated users
    return;
  }

  // Protect private routes - redirect to login if not authenticated
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Allow access to public routes and authenticated users
  return;
});

/**
 * Middleware configuration
 * Defines which routes the middleware should run on
 */
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
