import express from "express";
import pkg from "pg";

const { Client } = pkg;

const app = express();

async function connection() {
  const client = Client({
    host: "dpg-cdv8jspa6gdsa666s1l0-a",
    port: 5432,
    user: "root",
    password: "M0vVsbMs3ZHUda5zoyEew3YcdEFzyEkV",
    database: "codigo",
  });

  return await client.connect();
}

app.get("/", async (req, res) => {
  const text = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *";
  const values = ["brianc", "brian.m.carlson@gmail.com"];

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
    text: "SELECT * FROM user WHERE",
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
