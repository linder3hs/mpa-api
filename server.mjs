import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Funciona",
  });
});

app.get("/users", (req, res) => {
  res.json({
    message: "Funciona con usuarios",
  });
});

app.listen(process.env.PORT || 6003);
