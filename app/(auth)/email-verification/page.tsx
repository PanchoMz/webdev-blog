/**
 * Email Verification Page Component
 *
 * This page handles email verification for user accounts.
 * It wraps the EmailVerificationClient component in a Container for consistent layout.
 *
 * @fileoverview Email verification page with client component
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import EmailVerificationClient from "@/components/auth/EmailVerificationClient";
import Container from "@/components/layout/Container";

/**
 * Email verification page component
 * Wraps the EmailVerificationClient in a Container for consistent layout
 *
 * @returns JSX.Element - The email verification page with client component
 *
 * @description
 * This component renders the email verification page that allows users to:
 * - Verify their email address using a token
 * - Handle verification success and error states
 * - Navigate to login after successful verification
 * - Request new verification emails if needed
 */
const EmailVerificationPage = () => {
  return (
    <Container>
      <EmailVerificationClient />
    </Container>
  );
};

export default EmailVerificationPage;
