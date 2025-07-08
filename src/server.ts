import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { env } from './env.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
	origin: env.FRONTEND_URL
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
	console.log(`\x1b[1murl:\x1b[0m \x1b[34m${env.API_URL}\x1b[0m`)
	console.log('\x1b[32m✓ HTTP Server running!\x1b[0m')
})
