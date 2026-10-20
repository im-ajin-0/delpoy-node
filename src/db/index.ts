import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

export const pool = new Pool({
  connectionString: DATABASE_URL,

  // Maximum database connections per application instance
  max: 10,

  // Close idle connections after 30 seconds
  idleTimeoutMillis: 30000,

  // Maximum time to wait for a connection
  connectionTimeoutMillis: 5000,

  // Maximum time a connection can remain in the pool
  // Set according to your infrastructure requirements
  maxLifetimeSeconds: 1800,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error);
});

export const db = drizzle({ client: pool });