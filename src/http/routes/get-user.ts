import { eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const getUserRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/users/:id',
    {
      schema: {
        summary: 'Retorna dados do usuário',
        tags: ['Usuários'],
        params: z.object({
          id: z.string()
        })
      }
    },
    async (request) => {
      const { id } = request.params

      const results = await db
        .select({
          id: schema.users.id,
          name: schema.users.name,
          givenName: schema.users.givenName,
          familyName: schema.users.familyName,
          email: schema.users.email,
          picture: schema.users.picture,
          createdAt: schema.users.createdAt
        })
        .from(schema.users)
        .where(eq(schema.users.id, id))
      return results
    }
  )
}
