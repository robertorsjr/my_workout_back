import { FastifyInstance, FastifyRequest } from "fastify"
import { prisma } from "../libs/prisma"
import {  authUserCreateBodySchema, authUserInfoSchema } from "../schemas/authSchema"
import { getGoogleUserByToken } from "../services/auth"
import { accessTokenBodySchema } from "../schemas/tokenSchema"
import bcrypt from 'bcrypt'

export async function postUserWithOAuth2(fastify: FastifyInstance, request: FastifyRequest) {
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

export async function postUser(fastify: FastifyInstance, request: FastifyRequest) {
  const { email, name, password } = authUserCreateBodySchema.parse(request.body)

  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  })

  if(user){
    throw new Error('Usuario ja existe')
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword
    }
  })

  const token = fastify.jwt.sign({
    name: newUser.name,
    avatarUrl: newUser.avatarUrl,
  },{
    sub: newUser.id,
    expiresIn: '7 days'
  } )

  return { newUser } 
}