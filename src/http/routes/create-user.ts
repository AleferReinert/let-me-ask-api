import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createUserRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/users',
    {
      schema: {
        summary: 'Cria um usuário',
        tags: ['Usuários'],
        body: z.object({
          id: z.string(),
          name: z.string(),
          givenName: z.string(),
          familyName: z.string(),
          email: z.email(),
          picture: z.string()
        })
      }
    },
    async (request, reply) => {
      const { id, name, givenName, familyName, email, picture } = request.body
      const result = await db
        .insert(schema.users)
        .values({
          id,
          name,
          givenName,
          familyName,
          email,
          picture
        })
        .returning()

      const insertedUser = result[0]

      if (!insertedUser) {
        throw new Error('Failed to create new user.')
      }

      return reply.status(201).send({ id: insertedUser.id, name: insertedUser.name })
    }
  )
}
