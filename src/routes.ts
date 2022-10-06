import { Router } from "express";
import peopleRoute from "./useCases/people/people.route";
import accountRoute from "./useCases/account/account.route";
import cardRoute from "./useCases/cards/card.route";

const route = Router();

route.use(peopleRoute);
route.use(accountRoute);
route.use(cardRoute);

export default route;