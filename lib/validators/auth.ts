import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(8)
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email().transform((value) => value.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters").max(100)
});
