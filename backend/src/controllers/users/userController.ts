import { Context } from 'hono'
import * as userService from '../../services/users/userService'

export async function listUsers(c: Context) {
  const db = c.get('db')
  const rows = await userService.listUsers(db)
  return c.json({ success: true, users: rows })
}

export async function getUser(c: Context) {
  const id = c.req.param('id')
  if (!id) return c.json({ success: false, message: 'id is required' }, 400)

  const db = c.get('db')
  const user = await userService.getUserById(db, id)
  if (!user) return c.json({ success: false, message: 'User not found' }, 404)

  return c.json({ success: true, user })
}

export async function updateUser(c: Context) {
  const id = c.req.param('id')
  if (!id) return c.json({ success: false, message: 'id is required' }, 400)

  const body = await c.req.json()
  const { name, email } = body

  const db = c.get('db')
  const updated = await userService.updateUser(db, id, { name, email })
  if (!updated) return c.json({ success: false, message: 'Update failed' }, 500)

  return c.json({ success: true, user: updated })
}

export async function listRoles(c: Context) {
  const db = c.get('db')
  const rows = await userService.listRoles(db)
  return c.json({ success: true, roles: rows })
}

export async function createRole(c: Context) {
  const body = await c.req.json()
  const { roleName } = body
  if (!roleName) return c.json({ success: false, message: 'roleName is required' }, 400)

  const db = c.get('db')
  const role = await userService.createRole(db, roleName)
  return c.json({ success: true, role })
}
