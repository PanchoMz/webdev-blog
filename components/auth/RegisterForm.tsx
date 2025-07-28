/**
 * Register Form Component
 *
 * This component provides a complete registration form with:
 * - Form validation using Zod schema and react-hook-form
 * - Name, email, password, and confirm password input fields
 * - Error and success message handling
 * - Social authentication integration
 * - Server action integration for user registration
 * - Loading states and form submission handling
 *
 * @fileoverview Registration form with validation and social auth
 * @author WEBDEV.blog Team
 * @version 1.0.0
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import { signUp } from "@/actions/auth/register";
import { useTransition, useState } from "react";
import Alert from "../common/Alert";

/**
 * Register form component with form validation using Zod schema
 *
 * @returns JSX.Element - The complete registration form
 *
 * @description
 * This component provides a comprehensive registration experience:
 * - Validates user input using Zod schemas
 * - Handles form submission with server actions
 * - Displays error and success messages
 * - Integrates with social authentication
 * - Manages loading states and transitions
 * - Ensures password confirmation matching
 */
const RegisterForm = () => {
  // State management for form submission and messages
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // Form setup with react-hook-form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  /**
   * Handle form submission
   * Processes registration data and handles server response
   *
   * @param data - Validated form data from react-hook-form
   */
  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    setError("");
    setSuccess("");

    // Start transition for form submission
    startTransition(() => {
      signUp(data).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[400px] m-auto mt-8 gap-1"
    >
      <Heading title="Register to WEBDEV.blog" lg center />

      {/* Name input field with validation */}
      <FormField
        id="name"
        placeholder="Name"
        register={register}
        errors={errors}
        disabled={isPending}
      />

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

      {/* Password confirmation field with validation */}
      <FormField
        id="confirmPassword"
        placeholder="Confirm Password"
        register={register}
        errors={errors}
        type="password"
        disabled={isPending}
      />

      {/* Error message display */}
      {error && <Alert error message={error} />}

      {/* Success message display */}
      {success && <Alert success message={success} />}

      {/* Submit button */}
      <Button
        label={isPending ? "Submitting..." : "Register"}
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

export default RegisterForm;
