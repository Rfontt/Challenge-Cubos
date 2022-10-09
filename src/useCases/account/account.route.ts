import { Router } from "express";
import AccountController from "./account.controller";
import tokenAuthorization from "../../middlewares/token-user.middleware";

const accountRoute = Router();

accountRoute.post(
    '/accounts',
    tokenAuthorization,
    AccountController.create
);
accountRoute.get(
    '/accounts/:people_id',
    tokenAuthorization,
    AccountController.selectAllAccountToOnePeople
);

export default accountRoute;