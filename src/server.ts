import Fastify from  'fastify'
import jwt from  '@fastify/jwt'
import cors from '@fastify/cors'
import { routes } from './routes'

async function bootstrap(){
	const fastify = Fastify({
		logger: true,
	})

	await fastify.register(cors, {
		origin: true
	})
	
	await fastify.register(jwt, {
		secret: process.env.API_SECRET
	})

  await routes(fastify)

	await fastify.listen({ port: process.env.API_PORT || 3333 })
	//  host: '0.0.0.0'
}

bootstrap()