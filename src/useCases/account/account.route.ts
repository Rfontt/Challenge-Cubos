import { Router } from "express";
import AccountController from "./account.controller";

const accountRoute = Router();

accountRoute.post('/accounts', AccountController.create);

export default accountRoute;