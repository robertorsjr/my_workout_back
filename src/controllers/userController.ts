import { FastifyInstance, FastifyRequest } from "fastify"
import { userCreateBodySchema } from "../schemas/userSchema"
import { prisma } from "../libs/prisma"
import bcrypt from 'bcrypt'
import { BadRequestError } from "../helpers/ApiError"


export async function getUser(request: FastifyRequest){
  const jwtUser = await request.jwtVerify<{id: string}>()
  const user = await prisma.user.findUnique({ where: { id: jwtUser.id}})

  return { ...user }
}

export async function postUser(fastify: FastifyInstance, request: FastifyRequest) {
  const { email, name, password } = userCreateBodySchema.parse(request.body)

  const user = await prisma.user.findFirst({
    where: {
      email,
    }
  })

  if(user){
    throw new BadRequestError('E-mail ja existe')
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword
    }
  })

  const { password: _, ...userResponse} = newUser

  return { ...userResponse } 
}