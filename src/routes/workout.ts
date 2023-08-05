import {FastifyInstance} from "fastify";
import { authenticate } from "../plugins/authenticate";
import { getWorkoutActive, listWorkouts } from "../controllers/workoutController";
import { routes } from "./routes";

export async function workoutRoutes(fastify: FastifyInstance){
	fastify.get(routes.workout.list, { onRequest: [authenticate]} , listWorkouts)
  fastify.get(routes.workout.active, { onRequest: [authenticate]} , getWorkoutActive)
}
