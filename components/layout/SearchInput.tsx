/**
 * Search Input Component
 *
 * This component provides a search input field with:
 * - Search icon for visual clarity
 * - Placeholder text for user guidance
 * - Responsive design (hidden on small screens)
 * - Consistent styling with the application theme
 * - Background styling for better visibility
 *
 * @fileoverview Search input field with icon and responsive design
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import { Search } from "lucide-react";
import { Input } from "../ui/input";

/**
 * Search input component
 * Provides a search field with icon and responsive behavior
 *
 * @returns JSX.Element - The search input component
 *
 * @description
 * This component renders a search input that:
 * - Displays a search icon for visual clarity
 * - Hides on small screens for better mobile experience
 * - Uses consistent styling with the application theme
 * - Provides placeholder text for user guidance
 * - Integrates with the base Input component
 * - Supports responsive design principles
 */
const SearchInput = () => {
  return (
    <div className="relative hidden sm:block w-full">
      {/* Search icon positioned absolutely */}
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />

      {/* Search input field with left padding for icon */}
      <Input
        placeholder="Search..."
        className="pl-10 bg-primary/10 w-[200px]"
      />
    </div>
  );
};

export default SearchInput;
