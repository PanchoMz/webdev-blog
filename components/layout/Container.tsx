/**
 * Container Component
 *
 * This is a reusable container component for consistent layout spacing:
 * - Provides max-width constraint for content
 * - Centers content horizontally
 * - Responsive padding for different screen sizes
 * - Consistent spacing across the application
 * - Maintains content readability
 *
 * @fileoverview Container component for consistent layout spacing
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

/**
 * Container component for consistent layout spacing
 * Provides max-width, centering, and responsive padding for content
 *
 * @param children - React components to be wrapped in the container
 * @returns JSX.Element - The container with wrapped content
 *
 * @description
 * This component provides a consistent layout wrapper that:
 * - Constrains content width to prevent overly wide layouts
 * - Centers content horizontally on the page
 * - Provides responsive padding that adapts to screen size
 * - Maintains consistent spacing across all pages
 * - Ensures content remains readable on all devices
 */
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1920px] w-full mx-auto px-4 py-4 xl:px-20">
      {children}
    </div>
  );
};

export default Container;
