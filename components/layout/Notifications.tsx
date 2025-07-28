/**
 * Notifications Component
 *
 * This component provides a notifications dropdown interface:
 * - Displays notification count badge
 * - Dropdown menu for notification list
 * - Mark all as read functionality
 * - Bell icon with notification indicator
 * - Responsive design for different screen sizes
 *
 * @fileoverview Notifications dropdown with badge indicator
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

/**
 * Notifications component
 * Provides a dropdown interface for user notifications
 *
 * @returns JSX.Element - The notifications dropdown component
 *
 * @description
 * This component renders a notifications interface that:
 * - Shows a bell icon with notification count badge
 * - Provides a dropdown menu for notification list
 * - Includes "Mark all as read" functionality
 * - Uses consistent styling with the application theme
 * - Supports responsive design principles
 * - Integrates with the dropdown menu UI component
 */
const Notifications = () => {
  return (
    <DropdownMenu>
      {/* Trigger button with notification badge */}
      <DropdownMenuTrigger className="relative">
        {/* Notification count badge */}
        <div
          className="absolute bottom-2 left-2 bg-rose-500 text-white rounded-full w-5 h-5 
        flex items-center justify-center text-xs"
        >
          <span>3</span>
        </div>

        {/* Bell icon */}
        <Bell size={20} />
      </DropdownMenuTrigger>

      {/* Dropdown content with notifications */}
      <DropdownMenuContent className="w-full max-w-[400px]">
        {/* Header with title and mark all as read button */}
        <div className="flex justify-between items-center gap-4 mb-2 p-2">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button className="text-sm text-muted-foreground">
            Mark all as read
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
