import Fastify from  'fastify'
import jwt from  '@fastify/jwt'
import cors from '@fastify/cors'

async function bootstrap(){
	const fastify = Fastify({
		logger: true,
	})

	await fastify.register(cors, {
		origin: true
	})

	//em produçao precisa estar em variavel
	await fastify.register(jwt, {
		secret: 'my_workout'
	})

	await fastify.listen({ port: 3333 })
	//  host: '0.0.0.0'
}

bootstrap()