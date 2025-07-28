/**
 * Login Server Action
 *
 * This file contains the server action for handling user login:
 * - Form validation using Zod schemas
 * - User authentication with credentials
 * - Email verification handling
 * - Error handling and user feedback
 * - NextAuth.js integration
 *
 * @fileoverview Server action for user login functionality
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import {
  createVerificationToken,
  sendEmailVerificationToken,
} from "@/lib/emailVerification";
import { getUserByEmail } from "@/lib/user";
import { LOGIN_REDIRECT } from "@/route";
import { LoginSchemaType, LoginSchema } from "@/schemas/LoginSchema";
import { AuthError } from "next-auth";
import { success } from "zod";

/**
 * Server action for handling user login
 *
 * @param values - Login form data (email and password)
 * @returns Promise<{error?: string, success?: string}> - Result object with error or success message
 *
 * @description
 * This function handles the complete login flow:
 * 1. Validates input data using Zod schema
 * 2. Checks if user exists and credentials are valid
 * 3. Handles email verification if user is not verified
 * 4. Performs authentication using NextAuth.js
 * 5. Returns appropriate success/error messages
 */
export const Login = async (values: LoginSchemaType) => {
  // Validate input fields using Zod schema
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  // Extract validated data
  const { email, password } = validatedFields.data;

  // Get user from database by email
  const user = await getUserByEmail(email);

  // Check if user exists and has required fields
  if (!user || !email || !password || !user.password) {
    return {
      error: "Invalid credentials!",
    };
  }

  // Handle email verification if user is not verified
  if (!user.emailVerified) {
    // Create verification token for email verification
    const emailVerificationToken = await createVerificationToken(user.email);
    if (!emailVerificationToken) {
      return {
        error: "Failed to create verification token!",
      };
    }

    // Send verification email to user
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
  }

  // Attempt to sign in user with credentials
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, // Don't redirect automatically, handle it manually
    });

    // Return success message for successful login
    return {
      success: "Login successful!",
    };
  } catch (error) {
    // Handle authentication errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
  }
};
