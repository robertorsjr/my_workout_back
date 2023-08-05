import {FastifyInstance} from "fastify";
import {authenticate} from "../plugins/authenticate";
import { getUser, postUser } from "../controllers/userController";

export async function userRoutes(fastify: FastifyInstance) {
	fastify.get('/users/me', {onRequest: [authenticate]} , getUser)
	fastify.post('/users', async (request) => await postUser(fastify, request))
}
