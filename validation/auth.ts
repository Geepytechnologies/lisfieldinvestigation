import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email().min(1, "Email is required"),

  password: z.string().trim().min(1, "Password is required"),
});
