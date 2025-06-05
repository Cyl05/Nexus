import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: `${__dirname}/../../.env`
});

function connectDB() {
    const db = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    db.connect();
    console.log("Database connected");
    return db;
}

export default connectDB;