import { MiddlewareHandler } from 'hono'
import { verify } from 'hono/jwt'
import { SignatureKey } from 'hono/utils/jwt/jws'
import type { Database } from '../db'
import { roles } from '../db/schemas'

const SECRET = process.env.JWT_SECRET as SignatureKey

export const auth: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = authHeader.split(' ')[1]

  if (!SECRET) {
    return c.json({ error: 'Server misconfiguration' }, 500)
  }

  try {
    const payload = await verify(token, SECRET, 'HS256')

    const user = {
      id: (payload as any).sub ?? (payload as any).id,
      email: (payload as any).email,
      role: (payload as any).role,
      roles: (payload as any).roles,
    }

    c.set('user', user)
    await next()
  } catch (err) {
    return c.json({ error: 'Invalid or expired token' }, 401)
  }
}

export const rbac = (required: string | string[]): MiddlewareHandler => {
  const requiredRoles = Array.isArray(required) ? required : [required]

  return async (c, next) => {
    const user = c.get('user') as any
    if (!user) return c.json({ error: 'Unauthorized' }, 401)

    const db = c.get('db') as unknown as Database

    try {
      const allRoles = await db.select({ name: roles.roleName }).from(roles)
      const foundNames = (allRoles || []).map((r: any) => r.name)
      const missing = requiredRoles.filter((r) => !foundNames.includes(r))
      if (missing.length > 0) {
        return c.json({ error: `Invalid required roles: ${missing.join(', ')}` }, 400)
      }
    } catch (err) {
      return c.json({ error: 'Failed to validate required roles' }, 500)
    }

    const userRoles: string[] = Array.isArray(user.roles)
      ? user.roles
      : user.role
      ? [user.role]
      : []

    if (userRoles.some((r: string) => requiredRoles.includes(r))) {
      await next()
      return
    }

    return c.json({ error: 'Forbidden' }, 403)
  }
}
