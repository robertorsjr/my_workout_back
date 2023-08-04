import {FastifyInstance} from "fastify";
import {authenticate} from "../plugins/authenticate";
import { getUser, postUser } from "../controllers/authController";

export async function authRoutes(fastify: FastifyInstance) {
	fastify.get('/me', {onRequest: [authenticate]} , getUser)
	fastify.post('/users', async (request) => postUser(fastify, request))
}
