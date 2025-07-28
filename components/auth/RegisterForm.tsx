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

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    setError("");
    setSuccess("");
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
      <FormField
        id="name"
        placeholder="Name"
        register={register}
        errors={errors}
        disabled={isPending}
      />
      <FormField
        id="email"
        placeholder="Email"
        register={register}
        errors={errors}
        disabled={isPending}
      />
      <FormField
        id="password"
        placeholder="Password"
        register={register}
        errors={errors}
        type="password"
        disabled={isPending}
      />
      <FormField
        id="confirmPassword"
        placeholder="Confirm Password"
        register={register}
        errors={errors}
        type="password"
        disabled={isPending}
      />

      {error && <Alert error message={error} />}
      {success && <Alert success message={success} />}

      <Button
        label={isPending ? "Submitting..." : "Register"}
        type="submit"
        disabled={isPending}
      />
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
    </form>
  );
};

export default RegisterForm;
