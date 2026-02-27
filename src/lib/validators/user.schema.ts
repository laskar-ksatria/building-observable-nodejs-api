import { z } from "zod";

const emailSchema = z.string().email("Invalid email address").min(1, "Email is required");

export const registerSchema = z.object({
  email: emailSchema,
  full_name: z.string().min(1, "Full name is required").max(200, "Full name too long"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
