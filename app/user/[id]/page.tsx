/**
 * User Profile Page Component
 *
 * This page displays user profile information based on the dynamic ID parameter.
 * It shows user details and can be extended to include user-specific content.
 *
 * @fileoverview Dynamic user profile page
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import Container from "@/components/layout/Container";

/**
 * User profile page component
 * Displays user information based on the dynamic ID parameter
 *
 * @param params - Promise containing the dynamic route parameters
 * @returns Promise<JSX.Element> - The user profile page
 *
 * @description
 * This component renders a user profile page that:
 * - Extracts the user ID from the dynamic route parameter
 * - Displays user-specific information
 * - Can be extended to show user posts, settings, etc.
 * - Provides a foundation for user dashboard functionality
 */
const User = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Extract the user ID from the dynamic route parameters
  const { id } = await params;

  return (
    <Container>
      <h1 className="flex flex-col max-w-[400px] m-auto mt-8 gap-1 text-2xl font-bold">
        User Profile: {id}
      </h1>
    </Container>
  );
};

export default User;
