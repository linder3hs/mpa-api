import { Router } from "express";
import * as Controller from "../controllers/orders.mjs";

const ordersRouter = Router();

ordersRouter.get("/", Controller.findAll);
ordersRouter.post("/add", Controller.add);

export default ordersRouter;
