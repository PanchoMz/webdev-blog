"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log("data>>>", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[400px] m-auto mt-8 gap-1"
    >
      <Heading title="Login to WEBDEV.blog" lg center />
      <FormField
        id="email"
        placeholder="Email"
        register={register}
        errors={errors}
      />
      <FormField
        id="password"
        placeholder="Password"
        register={register}
        errors={errors}
        type="password"
      />
      <Button label="Login" type="submit" />
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
    </form>
  );
};

export default LoginForm;
