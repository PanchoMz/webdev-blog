/**
 * Tailwind CSS Configuration File
 *
 * This file configures Tailwind CSS for the application, including:
 * - Dark mode settings
 * - Content paths for purging unused styles
 * - Theme customizations
 * - Plugin configurations
 *
 * @fileoverview Tailwind CSS configuration with dark mode support
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import type { Config } from "tailwindcss";

/**
 * Tailwind CSS configuration object
 * Defines how Tailwind CSS should be configured for this project
 */
export default {
  // Enable class-based dark mode instead of media query
  darkMode: "class",

  // Define which files to scan for class names to include in the final CSS
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // Theme customization
  theme: {
    extend: {
      // Add custom theme extensions here
      // Examples: custom colors, fonts, spacing, etc.
    },
  },

  // Tailwind CSS plugins
  plugins: [
    // Add any Tailwind plugins here
    // Examples: @tailwindcss/forms, @tailwindcss/typography, etc.
  ],
} satisfies Config;
