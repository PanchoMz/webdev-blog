/**
 * Register Page Component
 *
 * This page displays the registration form for new user sign-up.
 * It wraps the RegisterForm component in a Container for consistent layout.
 *
 * @fileoverview Registration page with form component
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

import Container from "@/components/layout/Container";
import RegisterForm from "@/components/auth/RegisterForm";

/**
 * Register page component
 * Wraps the RegisterForm in a Container for consistent layout
 *
 * @returns JSX.Element - The registration page with form
 *
 * @description
 * This component renders the registration page that allows users to:
 * - Create a new account with name, email, and password
 * - Submit registration information
 * - Navigate to login if already have an account
 * - Use social authentication options
 */
const Register = () => {
  return (
    <Container>
      <RegisterForm />
    </Container>
  );
};

export default Register;
