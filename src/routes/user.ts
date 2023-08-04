import {FastifyInstance} from "fastify";
import {authenticate} from "../plugins/authenticate";
import { getUser } from "../controllers/userController";

export async function userRoutes(fastify: FastifyInstance) {
	fastify.get('/me', {onRequest: [authenticate]} , getUser)
}
