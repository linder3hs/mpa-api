import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Funciona",
  });
});

app.listen(process.env.PORT || 6003);
