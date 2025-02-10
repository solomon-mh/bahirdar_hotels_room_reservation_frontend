import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ message: "email is required" })
    .email({ message: "invalid email" }),

  password: z
    .string({ message: "password is required" })
    .min(8, { message: "password should be at least 8 characters" }),
});
