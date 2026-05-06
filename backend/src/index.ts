import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sql } from 'drizzle-orm';
import { logger } from 'hono/logger';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';

import { createDatabase, type Database } from './db';
import authRoutes from './routes/auth/index';
import usersRoutes from './routes/users/index';

type Bindings = {
  NODE_ENV?: string;
  APP_NAME?: string;
  APP_VERSION?: string;
  DATABASE_URL?: string;
};

type Variables = {
  db: Database;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use('*', requestId());
app.use('*', logger());
app.use('*', secureHeaders());
app.use('*', cors());
app.use('*', async (c, next) => {
  c.set('db', createDatabase(c.env.DATABASE_URL));
  await next();
});

app.onError((error, c) => {
  console.error('Unhandled application error', error);

  return c.json(
    {
      success: false,
      message: 'Internal Server Error',
      requestId: c.get('requestId'),
    },
    500,
  );
});

app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: 'Not Found',
      requestId: c.get('requestId'),
    },
    404,
  );
});

app.get('/', (c) => {
  return c.json({
    success: true,
    service: c.env.APP_NAME ?? 'backend',
    version: c.env.APP_VERSION ?? '1.0.0',
    environment: c.env.NODE_ENV ?? 'development',
    timestamp: new Date().toISOString(),
    requestId: c.get('requestId'),
  });
});

app.get('/health', (c) => {
  return c.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    requestId: c.get('requestId'),
  });
});

app.get('/api/health', (c) => {
  return c
    .get('db')
    .execute(sql`select 1 as ok`)
    .then(() => {
      return c.json({
        success: true,
        status: 'ok',
        database: 'connected',
        requestId: c.get('requestId'),
      });
    });
});

app.route('/api/auth', authRoutes);
// Mount user management routes
app.route('/api/users', usersRoutes);

export default app;
