import { eq } from 'drizzle-orm'
import type { Database } from '../../db'
import { users, roles } from '../../db/schemas'

export async function getUserById(db: Database, id: string) {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1)

  return rows[0] ?? null
}

export async function listUsers(db: Database) {
  return db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    createdAt: users.createdAt,
  }).from(users)
}

export async function updateUser(db: Database, id: string, updates: Partial<{ name: string; email: string }>) {
  const rows = await db
    .update(users)
    .set(updates as any)
    .where(eq(users.id, id))
    .returning({ id: users.id, name: users.name, email: users.email, updatedAt: users.updatedAt })

  return rows[0] ?? null
}

export async function listRoles(db: Database) {
  return db.select({ id: roles.id, roleName: roles.roleName }).from(roles)
}

export async function createRole(db: Database, roleName: string) {
  const rows = await db.insert(roles).values({ roleName }).returning({ id: roles.id, roleName: roles.roleName })
  return rows[0] ?? null
}

export async function findUserByEmail(db: Database, email: string) {
  const rows = await db
    .select({ id: users.id, name: users.name, email: users.email })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  return rows[0] ?? null
}
