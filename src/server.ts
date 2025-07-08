import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: env.FRONTEND_URL
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'Health ok!'
})

app.register(getRoomsRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`\x1b[1mhealth:\x1b[0m \x1b[34m${env.API_URL}/health\x1b[0m`)
  console.log('\x1b[32m✓ HTTP Server running!\x1b[0m')
})
