import { FastifyInstance } from "fastify";
import { postUser, postUserWithOAuth2 } from "../controllers/authController";

export async function authRoutes(fastify: FastifyInstance) {
	fastify.post('/users', async (request) => await postUser(fastify, request))
	fastify.post('/users/oauth', async (request) => await postUserWithOAuth2(fastify, request))
}
