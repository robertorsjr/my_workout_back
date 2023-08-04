import { FastifyInstance } from "fastify";
import { postUser } from "../controllers/authController";

export async function authRoutes(fastify: FastifyInstance) {
	fastify.post('/users', async (request) => await postUser(fastify, request))
}
