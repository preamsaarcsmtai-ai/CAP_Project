import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();
const client = new pg.Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "TestPass123!",
  database: process.env.DB_NAME,
});

client.connect()
.then(()=>{
  console.log("DB connected successfully");
})
.catch((err)=>{
  console.log("DB not connected",err.message);
})

const db = drizzle(client);


export default db;