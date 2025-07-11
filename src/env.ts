import { config } from 'dotenv'
import z from 'zod'

config()

const eventSchema = z.object({
  API_URL: z.string().url().default('http://localhost:3333'),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().startsWith('postgresql://'),
  GEMINI_API_KEY: z.string()
})

export const env = eventSchema.parse(process.env)
