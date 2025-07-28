/**
 * Email Verification Client Component
 *
 * This component handles email verification on the client side:
 * - Extracts verification token from URL parameters
 * - Calls server action to verify the token
 * - Displays loading, success, and error states
 * - Provides navigation to login after successful verification
 * - Handles token validation and user feedback
 *
 * @fileoverview Client-side email verification with token handling
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use client";
import { verifyEmail } from "@/actions/auth/email-verification";
import Heading from "@/components/common/Heading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

/**
 * Email verification client component
 * Handles the complete email verification flow on the client side
 *
 * @returns JSX.Element - Email verification interface
 *
 * @description
 * This component provides a complete email verification experience:
 * - Extracts verification token from URL search parameters
 * - Calls server action to validate and process the token
 * - Shows loading state during verification process
 * - Displays success or error messages based on verification result
 * - Provides navigation to login page after successful verification
 * - Handles cases where no token is provided
 */
const EmailVerificationClient = () => {
  // Get search parameters for token extraction
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // State management for verification process
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [pending, setPending] = useState(true);
  const router = useRouter();

  /**
   * Effect hook to handle email verification when component mounts
   * Processes the verification token and updates UI accordingly
   */
  useEffect(() => {
    setPending(true);

    // Check if token is provided
    if (!token) {
      setError("No token provided!");
      setPending(false);
      return;
    }

    // Call server action to verify email
    verifyEmail(token).then((res) => {
      // Add minimum delay to show verification message
      setTimeout(() => {
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(res.success);
        }
        setPending(false);
      }, 1000);
    });
  }, [token]);

  return (
    <div className="border-2 rounded-md p-8 flex flex-col items-center my-6 max-w-[400px] mx-auto">
      <Heading title="WEBDEV.blog" center />

      {/* Loading state during verification */}
      {pending && <div>Verifying email...</div>}

      {/* Error message display */}
      {error && <Alert error message={error} />}

      {/* Success message display */}
      {success && <Alert success message={success} />}

      {/* Login button after successful verification */}
      {success && (
        <Button
          type="submit"
          label="Login"
          onClick={() => router.push("/login")}
        />
      )}
    </div>
  );
};

export default EmailVerificationClient;
