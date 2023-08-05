import { FastifyInstance } from "fastify";
import { login, authUserWithOAuth2 } from "../controllers/authController";
import { routes } from "./routes";

export async function authRoutes(fastify: FastifyInstance) {
	fastify.post(routes.auth.create, async (request) => await authUserWithOAuth2(fastify, request))
	fastify.post(routes.auth.login, async (request) => await login(fastify, request))
}
