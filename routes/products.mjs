import { Router } from "express";
import * as Controller from "../controllers/products.mjs";

const productsRouter = Router();

productsRouter.get("/", Controller.findAll);
productsRouter.post("/add", Controller.add);
productsRouter.post("/remove", Controller.remove);

export default productsRouter;
