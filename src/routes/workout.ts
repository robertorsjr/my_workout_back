import {prisma} from "../libs/prisma";
import {FastifyInstance} from "fastify";
import { authenticate } from "../plugins/authenticate";

export async function workoutRoutes(fastify: FastifyInstance){
	fastify.get('/workouts', { onRequest: [authenticate]} , async (request) => {
    const workouts = await prisma.workoutRoutine.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId: request.user.sub
      },
      include: {
        categories: true
      }
    })

    return { workouts }
  	})

    fastify.get('/workouts/active', { onRequest: [authenticate]} , async (request) => {
      const workouts = await prisma.workoutRoutine.findMany({
        where: {
          userId: request.user.sub,
        },
        include: {
          categories: true,
        }
      })
  
      return { activeWorkout: workouts.find(workout => workout.isActive) }
      })
}
