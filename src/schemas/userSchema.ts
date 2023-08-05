import { z } from "zod";

export const userCreateBodySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string()
})