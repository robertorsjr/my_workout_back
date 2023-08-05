import {FastifyInstance} from "fastify";
import {authenticate} from "../plugins/authenticate";
import { getUser, postUser } from "../controllers/userController";
import { routes } from "./routes";

export async function userRoutes(fastify: FastifyInstance) {
	fastify.get(routes.user.me, {onRequest: [authenticate]} , getUser)
	fastify.post(routes.user.create, async (request) => await postUser(fastify, request))
}
