import { Router } from "express";
import CardController from "./card.controller";

const cardRoute = Router();

cardRoute.post('/accounts/:accountId/cards', CardController.create);
cardRoute.get('/accounts/:accountId/cards', CardController.getAllCards);

export default cardRoute;