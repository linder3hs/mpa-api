import express from "express";
import userRouter from "./routes/users.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT || 6003, () => console.log("Server initialized"));
