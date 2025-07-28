/**
 * Login Form Component
 *
 * This component provides a complete login form with:
 * - Form validation using Zod schema and react-hook-form
 * - Email and password input fields
 * - Error and success message handling
 * - Social authentication integration
 * - Automatic redirect after successful login
 * - OAuth error handling
 *
 * @fileoverview Login form with validation and social auth
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { useTransition, useState, useEffect } from "react";
import { Login } from "@/actions/auth/login";
import Alert from "../common/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import { LOGIN_REDIRECT } from "@/route";
import { getSession } from "next-auth/react";

/**
 * Login form component with form validation using Zod schema
 *
 * @returns JSX.Element - The complete login form
 *
 * @description
 * This component provides a comprehensive login experience:
 * - Validates user input using Zod schemas
 * - Handles form submission with server actions
 * - Displays error and success messages
 * - Integrates with social authentication
 * - Manages loading states and transitions
 * - Handles OAuth errors from URL parameters
 */
const LoginForm = () => {
  // Get search parameters for OAuth error handling
  const searchParams = useSearchParams();

  // State management for form submission and messages
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  // Get URL error for OAuth account linking issues
  const urlError = searchParams.get("error");
  const isOAuthError = urlError === "OAuthAccountNotLinked";

  // Form setup with react-hook-form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  /**
   * Handle form submission
   * Processes login data and handles server response
   *
   * @param data - Validated form data from react-hook-form
   */
  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    setError("");

    // Clear URL error when form is submitted
    if (urlError) {
      router.replace(LOGIN_REDIRECT);
    }

    // Start transition for form submission
    startTransition(async () => {
      Login(data).then(async (res) => {
        if (res?.error) {
          setError(res.error);
        }
        if (res?.success) {
          setSuccess(res.success);
          // Add delay before redirect to show success message
          setTimeout(async () => {
            await getSession();
            router.push(LOGIN_REDIRECT);
          }, 1500);
        }
        if (!res?.error && !res?.success) {
          // Force session refresh after successful login
          await getSession();
          router.push(LOGIN_REDIRECT);
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[400px] m-auto mt-8 gap-1"
    >
      <Heading title="Login to WEBDEV.blog" lg center />

      {/* Email input field with validation */}
      <FormField
        id="email"
        placeholder="Email"
        register={register}
        errors={errors}
        disabled={isPending}
      />

      {/* Password input field with validation */}
      <FormField
        id="password"
        placeholder="Password"
        register={register}
        errors={errors}
        type="password"
        disabled={isPending}
      />

      {/* Error message display */}
      {(error || isOAuthError) && (
        <Alert
          error
          message={error || "Email in use with different provider!"}
        />
      )}

      {/* Success message display */}
      {success && <Alert success message={success} />}

      {/* Submit button */}
      <Button
        label={isPending ? "Submitting..." : "Login"}
        type="submit"
        disabled={isPending}
      />

      {/* Divider for social authentication */}
      <div className="flex justify-center my-2">Or</div>

      {/* Social authentication options */}
      <SocialAuth />
    </form>
  );
};

export default LoginForm;
