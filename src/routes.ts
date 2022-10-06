import { Router } from "express";
import peopleRouter from "./useCases/people/people.route";
import accountRoute from "./useCases/account/account.route";

const route = Router();

route.use(peopleRouter);
route.use(accountRoute);

export default route;