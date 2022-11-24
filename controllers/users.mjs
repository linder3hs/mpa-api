import { connection } from "../db/index.mjs";
import { hashString, compareString } from "../utils/strings.mjs";

export const findAll = async (req, res) => {
  const query = {
    name: "users",
    text: "SELECT * FROM users",
  };

  const client = await connection();

  const result = await client.query(query);

  res.json({
    ok: true,
    data: result.rows,
  });
};

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const hashPwd = await hashString(password);

  const text =
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *";
  const values = [name, email, hashPwd];

  const client = await connection();

  try {
    const result = await client.query(text, values);

    res.json({
      ok: true,
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const text = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  const client = await connection();

  const result = await client.query(text, values);

  const user = result.rows[0];

  if (!user) {
    return res.status(404).json({
      ok: false,
      message: "User not found",
    });
  }

  const validPassword = await compareString(password, user.password);

  if (!validPassword) {
    return res.status(401).json({
      ok: false,
      message: "Invalid data",
    });
  }

  res.json({
    ok: true,
    data: user,
  });

  try {
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.stack,
    });
  }
};
