import { email, z } from "zod";

export const registerUserSchema = z.object({
  name: z.object().min(3),
  email: z.email(),
  phone: z.number(),
  password: z.string().min(6),
//   phone: z.string().min(10).max(15).optional(),
});
