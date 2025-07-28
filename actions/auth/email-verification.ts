/**
 * Email Verification Server Action
 *
 * This file contains the server action for handling email verification:
 * - Token validation and expiration checking
 * - User verification in database
 * - Email verification status update
 * - Error handling for invalid/expired tokens
 *
 * @fileoverview Server action for email verification functionality
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";

/**
 * Server action for handling email verification
 *
 * @param token - The verification token sent to user's email
 * @returns Promise<{error?: string, success?: string}> - Result object with error or success message
 *
 * @description
 * This function handles the email verification flow:
 * 1. Validates the verification token from database
 * 2. Checks if token has expired
 * 3. Verifies user exists in database
 * 4. Updates user's email verification status
 * 5. Returns appropriate success/error messages
 */
export const verifyEmail = async (token: string) => {
  // Find verification token in database
  const verificationToken = await db.verificationToken.findUnique({
    where: { token },
  });

  // Check if token exists
  if (!verificationToken) {
    return { error: "Invalid token" };
  }

  // Check if token has expired
  if (verificationToken.expires < new Date()) {
    return { error: "Token expired" };
  }

  // Get user by email from verification token
  const existingUser = await getUserByEmail(verificationToken.email);
  if (!existingUser) {
    return { error: "User not found!" };
  }

  // Update user's email verification status
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(), // Set verification timestamp
      email: verificationToken.email,
    },
  });

  // Return success message
  return { success: "Email verified!" };
};
