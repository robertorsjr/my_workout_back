import { z } from "zod";

export const authCreateUserBodySchema = z.object({
  access_token: z.string()
})

export const authUserInfoSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  picture: z.string().url()
})