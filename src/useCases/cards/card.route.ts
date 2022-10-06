import { Router } from "express";
import CardController from "./card.controller";

const cardRoute = Router();

cardRoute.post('/accounts/:accountId/cards', CardController.create);

export default cardRoute;