import { z } from "zod";

export const UserRegisterSchema = z.object({
  fullname: z.string().optional(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
