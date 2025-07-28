/**
 * Navigation Bar Component
 *
 * This is the main navigation bar component that provides:
 * - Logo and brand name display
 * - Search functionality
 * - Theme toggle for dark/light mode
 * - User authentication status display
 * - Conditional rendering based on login state
 * - Responsive design for different screen sizes
 *
 * @fileoverview Main navigation bar with authentication and theme support
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use client";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { MdNoteAlt } from "react-icons/md";
import SearchInput from "./SearchInput";
import Notifications from "./Notifications";
import UserButton from "./UserButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Main navigation bar component
 * Provides navigation, search, theme toggle, and user controls
 *
 * @returns JSX.Element - The complete navigation bar
 *
 * @description
 * This component renders the main navigation bar that:
 * - Displays the application logo and brand name
 * - Provides search functionality for site-wide search
 * - Includes theme toggle for dark/light mode switching
 * - Shows user-specific controls when logged in
 * - Displays login/register links when not authenticated
 * - Adapts to different screen sizes with responsive design
 * - Maintains consistent styling across the application
 */
const NavBar = () => {
  // Get current session status for authentication
  const session = useSession();
  const isLoggedIn = session.status === "authenticated";

  // Debug logging for session information
  console.log("session>>>", session);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white dark:bg-slate-900 border-b">
      <Container>
        <div className="flex justify-between items-center gap-8">
          {/* Logo and brand name */}
          <div className="flex items-center gap-1 cursor-pointer">
            <MdNoteAlt size={24} />
            <div className="font-bold text-xl">WEBDEV.blog</div>
          </div>

          {/* Search input component */}
          <SearchInput />

          {/* Right side navigation controls */}
          <div className="flex gap-5 sm:gap-8 items-center justify-center">
            {/* Theme toggle for dark/light mode */}
            <ThemeToggle />

            {/* Notifications for authenticated users */}
            {isLoggedIn && <Notifications />}

            {/* User button for authenticated users */}
            {isLoggedIn && <UserButton />}

            {/* Login/Register links for unauthenticated users */}
            {!isLoggedIn && (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
