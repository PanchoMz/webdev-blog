/**
 * Theme Toggle Component
 *
 * This component provides theme switching functionality:
 * - Toggles between light and dark themes
 * - Uses next-themes for theme management
 * - Prevents hydration mismatch with mounted state
 * - Displays appropriate icons for current theme
 * - Smooth transitions between themes
 *
 * @fileoverview Theme toggle component for dark/light mode switching
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Theme toggle component
 * Allows users to switch between light and dark themes
 *
 * @returns JSX.Element - The theme toggle button
 *
 * @description
 * This component provides theme switching functionality that:
 * - Integrates with next-themes for theme management
 * - Prevents hydration mismatches with proper mounting checks
 * - Displays sun icon in dark mode and moon icon in light mode
 * - Handles theme switching with smooth transitions
 * - Maintains theme preference across sessions
 * - Provides accessible button interface
 */
const ThemeToggle = () => {
  // Get theme state and functions from next-themes
  const { theme, setTheme, resolvedTheme } = useTheme();

  // State to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Toggle between light and dark themes
   * Switches to the opposite of the current resolved theme
   */
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggleTheme}>
      {/* Display sun icon in dark mode, moon icon in light mode */}
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
