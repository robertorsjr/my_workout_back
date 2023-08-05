import { FastifyInstance } from "fastify";
import { login, authUserWithOAuth2 } from "../controllers/authController";

export async function authRoutes(fastify: FastifyInstance) {
	fastify.post('/auth', async (request) => await authUserWithOAuth2(fastify, request))
	fastify.post('/auth/login', async (request) => await login(fastify, request))
}
