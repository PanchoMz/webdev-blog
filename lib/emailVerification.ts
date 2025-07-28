/**
 * Email Verification Utilities
 *
 * This file contains utility functions for email verification:
 * - Token creation and management
 * - Email sending with Resend service
 * - Token expiration handling
 * - Database operations for verification tokens
 * - Error handling for email operations
 *
 * @fileoverview Email verification utilities for user account validation
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

/**
 * Get existing verification token for an email address
 *
 * @param email - The email address to search for tokens
 * @returns Promise<VerificationToken | null> - The verification token if found, null otherwise
 *
 * @description
 * This function searches the database for existing verification tokens
 * associated with the provided email address.
 */
export const getVerificationToken = async (email: string) => {
  try {
    const token = await db.verificationToken.findFirst({
      where: { email },
    });
    return token;
  } catch (error) {
    return null;
  }
};

/**
 * Create a new verification token for an email address
 *
 * @param email - The email address to create a token for
 * @returns Promise<VerificationToken | null> - The created verification token or null if failed
 *
 * @description
 * This function creates a new verification token with the following steps:
 * 1. Generates a unique UUID for the token
 * 2. Deletes any existing tokens for the same email
 * 3. Creates a new token with 1-hour expiration
 * 4. Returns the created token or null if operation fails
 */
export const createVerificationToken = async (email: string) => {
  try {
    const token = uuidv4();

    // Delete existing token for this email to prevent duplicates
    const existingToken = await getVerificationToken(email);
    if (existingToken) {
      await db.verificationToken.delete({ where: { id: existingToken.id } });
    }

    // Create new verification token with 1-hour expiration
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

/**
 * Send email verification token to user's email address
 *
 * @param email - The recipient's email address
 * @param token - The verification token to include in the email
 * @returns Promise<{error?: any}> - Object containing error if email sending failed
 *
 * @description
 * This function sends a verification email using the Resend service:
 * - Creates a verification URL with the provided token
 * - Sends HTML email with verification link
 * - Uses environment variables for API key and base URL
 * - Returns error object if email sending fails
 */
export const sendEmailVerificationToken = async (
  email: string,
  token: string
) => {
  // Initialize Resend service with API key
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Create verification URL with token
  const emailVerificationUrl = `${process.env.BASE_URL}/email-verification?token=${token}`;

  // Send verification email
  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href="${emailVerificationUrl}">here</a> to verify your email</p>`,
  });

  return { error: res.error };
};
