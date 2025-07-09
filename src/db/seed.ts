import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => ({
  rooms: {
    count: 20,
    columns: {
      name: f.companyName(),
      description: f.loremIpsum({ sentencesCount: 1 }),
      createAt: f.date({ maxDate: new Date(Date.now() - 1000 * 60) })
    },
    with: {
      questions: 5
    }
  },
  questions: {
    columns: {
      question: f.loremIpsum({ sentencesCount: 1 }),
      answer: f.loremIpsum({ sentencesCount: 1 })
    }
  }
}))

await sql.end()

console.log('Database seeded!')
