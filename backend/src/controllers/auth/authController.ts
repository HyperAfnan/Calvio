import { Context } from 'hono'
import * as authService from '../../services/auth/authService'

export async function register(c: Context) {
  const body = await c.req.json();
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return c.json({ success: false, message: 'name, email and password are required' }, 400);
  }

  const db = c.get('db');
  const user = await authService.createUser(db, { name, email, password });

  return c.json({ success: true, user });
}

export async function login(c: Context) {
  console.log('authController.login: start');
  const body = await c.req.json();
  console.log('authController.login: body', body);
  const { email, password } = body;
  if (!email || !password) {
    return c.json({ success: false, message: 'email and password are required' }, 400);
  }

  const db = c.get('db');
  const authResult = await authService.authenticateUser(db, { email, password });
  console.log('authController.login: authResult', authResult);

  if (!authResult.valid) {
    return c.json({ success: false, message: 'Invalid credentials' }, 401);
  }

  const token = (typeof crypto !== 'undefined' && (crypto as any).randomUUID)
    ? (crypto as any).randomUUID()
    : (Math.random() + '').slice(2);
  console.log('authController.login: token generated');

  return c.json({ success: true, user: authResult.user, token });
}

export async function me(c: Context) {
  const email = c.req.query('email');
  if (!email) {
    return c.json({ success: false, message: 'email query param required for demo /me' }, 400);
  }

  const db = c.get('db');
  const user = await authService.findUserByEmail(db, email);
  if (!user) return c.json({ success: false, message: 'User not found' }, 404);

  return c.json({ success: true, user });
}

export async function logout(c: Context) {
  return c.json({ success: true, message: 'Logged out (stateless placeholder)' });
}
