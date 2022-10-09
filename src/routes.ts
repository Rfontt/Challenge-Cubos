import { Router } from "express";
import peopleRoute from "./useCases/people/people.route";
import accountRoute from "./useCases/account/account.route";
import cardRoute from "./useCases/cards/card.route";
import transactionRoute from "./useCases/transactions/transaction.route";
import loginRoute from "./useCases/login/login.route";

const route = Router();

route.use(peopleRoute);
route.use(accountRoute);
route.use(cardRoute);
route.use(transactionRoute);
route.use(loginRoute);

export default route;