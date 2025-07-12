import { count, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const getRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId',
    {
      schema: {
        summary: 'Retorna dados de uma única sala',
        tags: ['Salas'],
        params: z.object({
          roomId: z.string()
        })
      }
    },
    async (request) => {
      const { roomId } = request.params

      const results = await db
        .select({
          id: schema.rooms.id,
          name: schema.rooms.name,
          createdAt: schema.rooms.createdAt,
          questionsCount: count(schema.questions.id)
        })
        .from(schema.rooms)
        .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
        .where(eq(schema.rooms.id, roomId))
        .groupBy(schema.rooms.id, schema.rooms.name, schema.rooms.createdAt)
      return results
    }
  )
}
