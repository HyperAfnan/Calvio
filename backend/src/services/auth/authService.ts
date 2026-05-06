import { eq } from 'drizzle-orm';
import { compare, hash } from 'bcryptjs';
import { Database } from '../../db';
import { users } from '../../db/schemas';

async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function findUserByEmail(db: Database, email: string) {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return rows[0] ?? null;
}

export async function createUser(db: Database, { name, email, password }: { name: string; email: string; password: string; }) {
  const existing = await findUserByEmail(db, email);
  if (existing) {
    throw new Error('User already exists');
  }

  const hashed = await hashPassword(password);
  const rows = await db
    .insert(users)
    .values({
      name,
      email,
      encryptedPassword: hashed,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
    });

  return rows[0] ?? null;
}

export async function authenticateUser(db: Database, { email, password }: { email: string; password: string; }) {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      encryptedPassword: users.encryptedPassword,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (rows.length === 0) return { valid: false };

  const user = rows[0];
  const isValid = await compare(password, user.encryptedPassword ?? '');
  if (!isValid) {
    return { valid: false };
  }

  const { encryptedPassword, ...safeUser } = user;
  return { valid: true, user: safeUser };
}

