import {FastifyInstance} from "fastify";
import {authRoutes} from "./auth";
import { workoutRoutes } from "./workout";
import { userRoutes } from "./user";

export async function routes(fastify: FastifyInstance){
	await fastify.register(authRoutes)
  await fastify.register(userRoutes)
  await fastify.register(workoutRoutes)
}
