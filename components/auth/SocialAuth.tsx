/**
 * Social Authentication Component
 *
 * This component provides social authentication options for users:
 * - GitHub OAuth authentication
 * - Google OAuth authentication
 * - Consistent styling with the main application
 * - Automatic redirect after successful authentication
 * - Icon integration for visual clarity
 *
 * @fileoverview Social authentication buttons for OAuth providers
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import { signIn } from "next-auth/react";
import Button from "../common/Button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { LOGIN_REDIRECT } from "@/route";

/**
 * Social authentication component
 * Provides OAuth authentication options for GitHub and Google
 *
 * @returns JSX.Element - Social authentication buttons
 *
 * @description
 * This component renders social authentication buttons that:
 * - Allow users to sign in with GitHub or Google
 * - Handle OAuth flow with NextAuth.js
 * - Provide consistent styling and user experience
 * - Redirect users to the appropriate page after authentication
 */
const SocialAuth = () => {
  /**
   * Handle social authentication button clicks
   * Initiates OAuth flow with the selected provider
   *
   * @param provider - The OAuth provider to use ("github" or "google")
   */
  const handleOnClick = (provider: "github" | "google") => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {/* GitHub authentication button */}
      <Button
        type="button"
        label="Continue with GitHub"
        outline
        icon={FaGithub}
        onClick={() => handleOnClick("github")}
      />

      {/* Google authentication button */}
      <Button
        type="button"
        label="Continue with Google"
        outline
        icon={FaGoogle}
        onClick={() => handleOnClick("google")}
      />
    </div>
  );
};

export default SocialAuth;
