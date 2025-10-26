import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

// Crée un pool de connexions PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialise Drizzle avec le pool
const db = drizzle(pool, {
  casing: "snake_case",
});

export default db;
