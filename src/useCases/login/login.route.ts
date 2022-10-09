import { Router } from "express";
import LoginController from "./login.controller";

const loginRoute = Router();

loginRoute.post('/login', LoginController.makeLogin);

export default loginRoute;