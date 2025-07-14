import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import 'dotenv/config'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { createUserRoute } from './http/routes/create-user.ts'
import { getRoomQuestionsRoute } from './http/routes/get-room-questions.ts'
import { getRoomRoute } from './http/routes/get-room.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { getUserRoute } from './http/routes/get-user.ts'
import { uploadAudioRoute } from './http/routes/upload-audio.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: env.FRONTEND_URL
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyMultipart)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Let Me Ask - API',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.get('/health', () => {
  return 'Health ok!'
})

app.register(getRoomsRoute)
app.register(getRoomRoute)
app.register(createRoomRoute)
app.register(getRoomQuestionsRoute)
app.register(createQuestionRoute)
app.register(uploadAudioRoute)
app.register(createUserRoute)
app.register(getUserRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`\x1b[1mDocs:\x1b[0m \x1b[34m${env.API_URL}/docs\x1b[0m`)
  console.log('\x1b[32m✓ HTTP Server running!\x1b[0m')
})
