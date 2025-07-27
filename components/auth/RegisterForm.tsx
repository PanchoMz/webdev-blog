"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    console.log("data>>>", data);
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
      />
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
      <FormField
        id="confirmPassword"
        placeholder="Confirm Password"
        register={register}
        errors={errors}
        type="password"
      />
      <Button label="Register" type="submit" />
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
    </form>
  );
};

export default RegisterForm;
