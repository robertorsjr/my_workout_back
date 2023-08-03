import {prisma} from "../libs/prisma";
import {FastifyInstance} from "fastify";

export async function workoutRoutes(fastify: FastifyInstance){
	fastify.get('/workout', async () => {
		const count = await prisma.workout
		return { count }
	})
}
