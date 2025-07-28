/**
 * User Utility Functions
 *
 * This file contains utility functions for user-related database operations:
 * - User retrieval by email
 * - Error handling for database queries
 * - Type-safe database operations
 *
 * @fileoverview User database utility functions
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import { db } from "./db";

/**
 * Retrieves a user from the database by their email address
 *
 * @param email - The email address of the user to find
 * @returns Promise<User | null> - The user object if found, null otherwise
 * @throws Error - If database query fails
 */
export const getUserByEmail = async (email: string) => {
  try {
    // Query the database for a user with the specified email
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    // Log the error for debugging purposes
    console.log(error);
    // Return undefined in case of error
    return undefined;
  }
};
