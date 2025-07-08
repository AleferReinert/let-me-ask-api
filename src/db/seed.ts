import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'
import { rooms } from './schema/rooms.ts'

await reset(db, schema)

await seed(db, { rooms }).refine((f) => ({
  rooms: {
    count: 20,
    columns: {
      name: f.companyName(),
      description: f.loremIpsum({ sentencesCount: 1 })
    }
  }
}))

await sql.end()

console.log('Database seeded!')
