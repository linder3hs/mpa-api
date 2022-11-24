import pkg from "pg";

const { Pool } = pkg;

export async function connection() {
  const client = new Pool({
    host: "containers-us-west-97.railway.app",
    port: 6273,
    user: "postgres",
    password: "jhUzH9bKC9c7gZiP8Gno",
    database: "railway",
  });

  return await client.connect();
}
