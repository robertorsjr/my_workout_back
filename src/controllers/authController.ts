import { FastifyInstance, FastifyRequest } from "fastify"
import { prisma } from "../libs/prisma"
import {  authUserCreateBodySchema, authUserInfoSchema, authUserLoginBodySchema } from "../schemas/authSchema"
import { getGoogleUserByToken } from "../services/auth"
import { accessTokenBodySchema } from "../schemas/tokenSchema"
import bcrypt from 'bcrypt'

export async function authUserWithOAuth2(fastify: FastifyInstance, request: FastifyRequest) {
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
    id: user.id,
  },{
    sub: user.id,
    expiresIn: '7 days'
  } )

  return { token }
}

export async function login(fastify: FastifyInstance, request: FastifyRequest) {
  const { email, password } = authUserLoginBodySchema.parse(request.body)
  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  })

  if(!user) throw Error('E-mail ou senha invalidos')

  const verifyPass = await bcrypt.compare(password, user.password as string)

  if(!verifyPass) throw Error('E-mail ou senha invalidos')

  const token = fastify.jwt.sign({
    id: user.id,
  },{
    sub: user.id,
    expiresIn: '7 days'
  } )
  
  return { 
    ...user,
    token
  }  
}