import { Router } from "express";
import * as Controller from "../controllers/users.mjs";

const usersRouter = Router();

usersRouter.get("/", Controller.findAll);
usersRouter.post("/signup", Controller.signUp);
usersRouter.post("/login", Controller.login);

export default usersRouter;
