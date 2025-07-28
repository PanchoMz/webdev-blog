import Container from "@/components/layout/Container";
import LoginForm from "@/components/auth/LoginForm";

// Login page component
// Wraps the LoginForm in a Container for consistent layout
const Login = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
};
export default Login;
