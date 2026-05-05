import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schemas/index';

const poolCache = new Map<string, Pool>();
const dbCache = new Map<string, ReturnType<typeof drizzle>>();

const getPool = (connectionString: string) => {
	const existingPool = poolCache.get(connectionString);

	if (existingPool) {
		return existingPool;
	}

	const pool = new Pool({
		connectionString,
		max: 10,
		idleTimeoutMillis: 30_000,
		connectionTimeoutMillis: 10_000,
	});

	poolCache.set(connectionString, pool);

	return pool;
};

export const createDatabase = (connectionString?: string) => {
	if (!connectionString) {
		throw new Error('DATABASE_URL is required to initialize the database');
	}

	const cachedDatabase = dbCache.get(connectionString);

	if (cachedDatabase) {
		return cachedDatabase;
	}

	const database = drizzle(getPool(connectionString), { schema });

	dbCache.set(connectionString, database);

	return database;
};

export type Database = ReturnType<typeof createDatabase>;
