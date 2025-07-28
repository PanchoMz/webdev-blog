/**
 * User Button Component
 *
 * This component provides a user dropdown menu with:
 * - User avatar with fallback to initials or icon
 * - Dropdown menu with user actions
 * - Profile, create post, bookmark, admin, and sign out options
 * - Session integration for user data
 * - Consistent styling with the application theme
 * - Icon integration for visual clarity
 *
 * @fileoverview User dropdown menu with avatar and actions
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use client";
import { useSession } from "next-auth/react";
import {
  FileIcon,
  LogOutIcon,
  PencilIcon,
  SettingsIcon,
  Shield,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaRegBookmark } from "react-icons/fa";
import { signOut } from "next-auth/react";

/**
 * User button component
 * Provides a dropdown menu with user actions and profile information
 *
 * @returns JSX.Element - The user dropdown component
 *
 * @description
 * This component renders a user interface that:
 * - Displays user avatar with session data
 * - Provides dropdown menu with various user actions
 * - Shows user profile image or fallback to initials/icon
 * - Includes navigation options (profile, create post, bookmark, admin)
 * - Handles sign out functionality
 * - Uses consistent styling with the application theme
 * - Integrates with NextAuth.js session management
 */
const UserButton = () => {
  // Get current session data for user information
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      {/* Trigger button with user avatar */}
      <DropdownMenuTrigger>
        <Avatar>
          {/* User profile image from session */}
          <AvatarImage src={session?.user?.image || ""} />

          {/* Fallback avatar with user initials or default icon */}
          <AvatarFallback className="border-2 border-gray-200 dark:border-gray-700">
            {session?.user?.name ? (
              session.user.name.charAt(0).toUpperCase()
            ) : (
              <UserIcon size={20} />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* Dropdown menu content with user actions */}
      <DropdownMenuContent>
        {/* Profile menu item */}
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <UserIcon size={18} /> Profile
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Create Post menu item */}
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <PencilIcon size={18} /> Create Post
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Bookmark menu item */}
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <FaRegBookmark size={18} /> Bookmark
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Admin menu item */}
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Shield size={18} /> Admin
          </button>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out menu item with click handler */}
        <DropdownMenuItem>
          <button className="flex items-center gap-2" onClick={() => signOut()}>
            <LogOutIcon size={18} /> Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
