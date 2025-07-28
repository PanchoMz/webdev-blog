/**
 * Registration Server Action
 *
 * This file contains the server action for handling user registration:
 * - Form validation using Zod schemas
 * - User creation in database
 * - Password hashing for security
 * - Email verification token creation
 * - Duplicate email checking
 * - Error handling and user feedback
 *
 * @fileoverview Server action for user registration functionality
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use server";

import { db } from "@/lib/db";
import {
  createVerificationToken,
  sendEmailVerificationToken,
} from "@/lib/emailVerification";
import { getUserByEmail } from "@/lib/user";
import { RegisterSchemaType, RegisterSchema } from "@/schemas/RegisterSchema";
import bcrypt from "bcryptjs";

/**
 * Server action for handling user registration
 *
 * @param values - Registration form data (name, email, password, confirmPassword)
 * @returns Promise<{error?: string, success?: string}> - Result object with error or success message
 *
 * @description
 * This function handles the complete registration flow:
 * 1. Extracts user data from form values
 * 2. Checks if email is already in use
 * 3. Hashes password for security
 * 4. Creates user in database
 * 5. Sends email verification
 * 6. Returns appropriate success/error messages
 */
export const signUp = async (values: RegisterSchemaType) => {
  // Extract user data from form values
  const { name, email, password } = values;

  // Check if user already exists with the provided email
  const user = await getUserByEmail(email);

  if (user) {
    return {
      error: "Email already in use!",
    };
  }

  // Hash password for security using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create new user in database
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create email verification token for the new user
    const emailVerificationToken = await createVerificationToken(email);
    if (!emailVerificationToken) {
      return {
        error: "Failed to create verification token!",
      };
    }

    // Send verification email to the new user
    const { error } = await sendEmailVerificationToken(
      emailVerificationToken.email,
      emailVerificationToken.token
    );

    if (error) {
      return {
        error: "Failed to send verification email!",
      };
    }

    // Return success message for verification email sent
    return {
      success: "Verification email sent!",
    };
  } catch (error) {
    // Log error for debugging
    console.error("Registration error:", error);
    return {
      error: "Something went wrong! Please try again.",
    };
  }
};
