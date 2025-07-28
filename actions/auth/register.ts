"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { RegisterSchemaType, RegisterSchema } from "@/schemas/RegisterSchema";
import bcrypt from "bcryptjs";

export const signUp = async (values: RegisterSchemaType) => {
  const { name, email, password } = values;

  const user = await getUserByEmail(email);

  if (user) {
    return {
      error: "Email already in use!",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: "Account created successfully! You can now sign in.",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: "Something went wrong! Please try again.",
    };
  }
};
