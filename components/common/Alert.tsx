/**
 * Alert Component
 *
 * This is a reusable alert component for displaying user feedback:
 * - Success alerts with green styling and checkmark icon
 * - Error alerts with red styling and error icon
 * - Info alerts with blue styling and information icon
 * - Consistent styling with Tailwind CSS
 * - Icon integration for visual clarity
 *
 * @fileoverview Reusable alert component for user feedback
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import {
  IoIosCheckmarkCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { BiError } from "react-icons/bi";
import { cn } from "@/lib/utils";

/**
 * Alert component props interface
 * Defines the props for different alert types
 */
interface AlertProps {
  /** Whether to display a success alert (green styling) */
  success?: boolean;
  /** Whether to display an error alert (red styling) */
  error?: boolean;
  /** The message text to display in the alert */
  message: string;
}

/**
 * Reusable alert component for displaying user feedback
 *
 * @param props - AlertProps object containing alert configuration
 * @returns JSX.Element - The rendered alert component
 *
 * @description
 * This component provides a flexible alert implementation that:
 * - Supports three different alert types (success, error, info)
 * - Uses appropriate colors and icons for each type
 * - Provides consistent styling across the application
 * - Includes proper accessibility considerations
 * - Uses react-icons for visual clarity
 * - Maintains responsive design principles
 */
const Alert = ({ success, error, message }: AlertProps) => {
  return (
    <div
      className={cn(
        // Base alert styles
        "my-2 flex items-center justify-center gap-2 p-3 rounded-md",

        // Success alert styling (green)
        success && "bg-green-100 text-green-500",

        // Error alert styling (red)
        error && "bg-rose-100 text-rose-500",

        // Info alert styling (blue) - default when neither success nor error
        !success && !error && "bg-blue-100 text-blue-500"
      )}
    >
      {/* Icon container */}
      <span>
        {/* Success icon */}
        {success && <IoIosCheckmarkCircleOutline size={20} />}

        {/* Error icon */}
        {error && <BiError size={20} />}

        {/* Info icon - default when neither success nor error */}
        {!success && !error && <IoIosInformationCircleOutline size={20} />}
      </span>

      {/* Alert message */}
      {message}
    </div>
  );
};

export default Alert;
