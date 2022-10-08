import { Router } from "express";
import AccountController from "./account.controller";

const accountRoute = Router();

accountRoute.post('/accounts', AccountController.create);
accountRoute.get('/accounts/:people_id', AccountController.selectAllAccountToOnePeople);

export default accountRoute;