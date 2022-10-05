import { Router } from "express";
import peopleRouter from "./useCases/people/people.route";

const route = Router();

route.use(peopleRouter);

export default route;