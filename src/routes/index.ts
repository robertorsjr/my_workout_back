import {FastifyInstance} from "fastify";
import {authRoutes} from "./auth";
import { workoutRoutes } from "./workout";

export async function routes(fastify: FastifyInstance){
	await fastify.register(authRoutes)
  await fastify.register(workoutRoutes)
}
