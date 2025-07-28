/**
 * Login Page Component
 *
 * This page displays the login form for user authentication.
 * It wraps the LoginForm component in a Container for consistent layout.
 *
 * @fileoverview Login page with form component
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import Container from "@/components/layout/Container";
import LoginForm from "@/components/auth/LoginForm";

/**
 * Login page component
 * Wraps the LoginForm in a Container for consistent layout
 *
 * @returns JSX.Element - The login page with form
 *
 * @description
 * This component renders the login page that allows users to:
 * - Enter their email and password
 * - Submit login credentials
 * - Navigate to registration if needed
 * - Use social authentication options
 */
const Login = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};

export default Login;
