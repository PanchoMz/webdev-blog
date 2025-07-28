/**
 * Heading Component
 *
 * This is a reusable heading component with multiple size variants:
 * - Large (h1), medium (h2), and default (h3) sizes
 * - Optional subtitle support
 * - Center alignment option
 * - Consistent typography styling
 * - Responsive design support
 *
 * @fileoverview Reusable heading component with multiple variants
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

/**
 * Props interface for the Heading component
 * Defines all available props for heading customization
 */
interface HeadingProps {
  /** The main heading text */
  title: string;
  /** Optional subtitle text displayed below the heading */
  subtitle?: string;
  /** Whether to center-align the heading */
  center?: boolean;
  /** Whether to use large size (h1) */
  lg?: boolean;
  /** Whether to use medium size (h2) */
  md?: boolean;
}

/**
 * Reusable heading component with multiple size variants
 *
 * @param props - HeadingProps object containing heading configuration
 * @returns JSX.Element - The rendered heading component
 *
 * @description
 * This component provides a flexible heading implementation that:
 * - Supports three different heading sizes (large, medium, default)
 * - Allows optional subtitle text
 * - Supports center alignment
 * - Uses consistent typography styling
 * - Provides proper semantic HTML structure
 * - Maintains responsive design principles
 */
const Heading = ({ title, subtitle, center, lg, md }: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      {/* Large heading (h1) */}
      {lg && <h1 className="font-bold text-4xl my-2">{title}</h1>}

      {/* Medium heading (h2) */}
      {md && <h2 className="font-bold text-3xl my-2">{title}</h2>}

      {/* Default heading (h3) - when neither lg nor md is specified */}
      {!lg && !md && <h3 className="font-bold text-2xl my-2">{title}</h3>}

      {/* Optional subtitle */}
      {subtitle && <p className="text-gray-600 text-sm mt-2">{subtitle}</p>}
    </div>
  );
};

export default Heading;
