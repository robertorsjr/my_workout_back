import { FastifyRequest } from "fastify"
import { prisma } from "../libs/prisma"

export async function listWorkouts(request: FastifyRequest){
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
}

export async function getWorkoutActive(request: FastifyRequest){
  const workouts = await prisma.workoutRoutine.findMany({
    where: {
      userId: request.user.sub,
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
          exercises: true
        },
      },
    }
  })

  return { activeWorkout: workouts.find(workout => workout.isActive) }
}