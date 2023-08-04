import {FastifyInstance} from "fastify";
import { authenticate } from "../plugins/authenticate";
import { getWorkoutActive, listWorkouts } from "../controllers/workoutController";

export async function workoutRoutes(fastify: FastifyInstance){
	fastify.get('/workouts', { onRequest: [authenticate]} , listWorkouts)
  fastify.get('/workouts/active', { onRequest: [authenticate]} , getWorkoutActive)
}
