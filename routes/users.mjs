import { Router } from "express";
import * as Controller from "../controllers/users.mjs";

const userRouter = Router();

userRouter.get("/", Controller.findAll);
userRouter.post("/signup", Controller.signUp);
userRouter.post("/login", Controller.login);

export default userRouter;
