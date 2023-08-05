import { z } from "zod";

export const authUserInfoSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  picture: z.string().url()
})

export const authUserCreateBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string()
})