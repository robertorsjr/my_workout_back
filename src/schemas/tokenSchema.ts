import { z } from "zod";

export const accessTokenBodySchema = z.object({
  access_token: z.string()
})
