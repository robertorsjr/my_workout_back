import { FastifyInstance, FastifyRequest } from "fastify"
import { prisma } from "../libs/prisma"
import {  authUserInfoSchema } from "../schemas/authSchema"
import { getGoogleUserByToken } from "../services/auth"
import { accessTokenBodySchema } from "../schemas/tokenSchema"

export async function postUser(fastify: FastifyInstance, request: FastifyRequest) {
  const { access_token } = accessTokenBodySchema.parse(request.body)
  const userResponse = await getGoogleUserByToken(access_token)
  const userData = await userResponse.data
  const userInfo = authUserInfoSchema.parse(userData)

  let user = await prisma.user.findUnique({
    where: {
      googleId: userInfo.id
    }
  })

  if(!user){
    user = await prisma.user.create({
      data: {
        googleId: userInfo.id,
        name: userInfo.name,
        avatarUrl: userInfo.picture,
        email: userInfo.email
      }
    })
  }

  const token = fastify.jwt.sign({
    name: user.name,
    avatarUrl: user.avatarUrl,
  },{
    sub: user.id,
    expiresIn: '7 days'
  } )

  return { token }
}