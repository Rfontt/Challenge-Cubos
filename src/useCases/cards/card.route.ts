import { Router } from "express";
import CardController from "./card.controller";
import tokenAuthorization from "../../middlewares/token-user.middleware";

const cardRoute = Router();

cardRoute.post(
    '/accounts/:accountId/cards',
    tokenAuthorization, 
    CardController.create
);
cardRoute.get(
    '/accounts/:accountId/cards',
    tokenAuthorization,
    CardController.getAllCardsByAccountID
);

export default cardRoute;