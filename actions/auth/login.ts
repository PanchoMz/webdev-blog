"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { LOGIN_REDIRECT } from "@/route";
import { LoginSchemaType, LoginSchema } from "@/schemas/LoginSchema";
import { AuthError } from "next-auth";
import { success } from "zod";

export const Login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }
  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user || !email || !password || !user.password) {
    return {
      error: "Invalid credentials!",
    };
  }

  // if(!user.emailVerified){
  //   return {
  //     error: "Email not verified!",
  //   };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      success: "Login successful!",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
  }
};
