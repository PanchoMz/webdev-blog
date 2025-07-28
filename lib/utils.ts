/**
 * Utility Functions
 *
 * This file contains general utility functions used throughout the application:
 * - CSS class merging and optimization
 * - Tailwind CSS class conflict resolution
 * - Conditional class application
 *
 * @fileoverview General utility functions for the application
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge CSS classes
 * Combines clsx for conditional classes and tailwind-merge for Tailwind CSS optimization
 * This prevents duplicate classes and resolves conflicts
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.)
 * @returns string - Merged and optimized CSS class string
 *
 * @example
 * cn("text-red-500", { "bg-blue-500": true }, ["p-4", "m-2"])
 * // Returns: "text-red-500 bg-blue-500 p-4 m-2"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
