import express from "express";
import pkg from "pg";

const { Client, Pool } = pkg;

const app = express();

async function connection() {
  const client = new Pool({
    host: "containers-us-west-97.railway.app",
    port: 6273,
    user: "postgres",
    password: "jhUzH9bKC9c7gZiP8Gno",
    database: "railway",
  });

  return await client.connect();
}

app.get("/", async (req, res) => {
  const text =
    "INSERT INTO users(id, name, email) VALUES($1, $2, $3) RETURNING *";
  const values = [1, "brianc", "brian.m.carlson@gmail.com"];

  const client = await connection();

  try {
    const result = await client.query(text, values);

    res.json({
      message: result.rows[0],
    });
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
    console.log(err.stack);
  }
});

app.get("/users", async (req, res) => {
  const query = {
    name: "users",
    text: "SELECT * FROM users",
  };

  const client = await connection();

  // promise
  const result = await client.query(query);
  const data = result.rows[0];

  res.json({
    message: data,
  });
});

app.listen(process.env.PORT || 6003);
