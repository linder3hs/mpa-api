import { Router } from "express";
import * as Controller from "../controllers/products.mjs";

const productsRouter = Router();

productsRouter.get("/", Controller.findAll);
productsRouter.post("/add", Controller.add);

export default productsRouter;
