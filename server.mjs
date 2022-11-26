import express from "express";
import usersRouter from "./routes/users.mjs";
import productsRouter from "./routes/products.mjs";
import ordersRouter from "./routes/orders.mjs";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);

app.listen(process.env.PORT || 6003, () => console.log("Server initialized"));
