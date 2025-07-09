import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms',
    {
      schema: {
        summary: 'Retorna todas as salas',
        tags: ['Salas']
      }
    },
    async () => {
      const results = await db
        .select({
          id: schema.rooms.id,
          name: schema.rooms.name
        })
        .from(schema.rooms)
        .orderBy(schema.rooms.createAt)
      return results
    }
  )
}
