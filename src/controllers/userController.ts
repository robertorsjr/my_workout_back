import { FastifyRequest } from "fastify"


export async function getUser(request: FastifyRequest){
  await request.jwtVerify()

  return { user: request.user }
}