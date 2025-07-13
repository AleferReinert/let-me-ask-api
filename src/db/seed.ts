import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { questions } from './schema/questions.ts'
import { rooms } from './schema/rooms.ts'

await reset(db, { rooms, questions })

await seed(db, { rooms, questions }).refine((f) => ({
  rooms: {
    count: 20,
    columns: {
      name: f.companyName(),
      description: f.loremIpsum({ sentencesCount: 1 }),
      createdAt: f.date({ maxDate: new Date(Date.now() - 1000 * 60) })
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
