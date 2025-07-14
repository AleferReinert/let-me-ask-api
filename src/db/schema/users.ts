import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  givenName: text().notNull(),
  familyName: text().notNull(),
  email: text().notNull().unique(),
  picture: text().notNull(),
  createdAt: timestamp().notNull().defaultNow()
})
