"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { useTransition, useState } from "react";
import { Login } from "@/actions/auth/login";
import Alert from "../common/Alert";
import { useRouter } from "next/navigation";
import { LOGIN_REDIRECT } from "@/route";
import { getSession } from "next-auth/react";

// Login form component with form validation using Zod schema
const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();
  // Form setup with react-hook-form and Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    setError("");
    startTransition(async () => {
      Login(data).then(async (res) => {
        if (res?.error) {
          setError(res.error);
        }
        if (!res?.error) {
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
      {error && <Alert error message={error} />}
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
