import { Router } from "express";
import peopleRouter from "./useCases/people/people.useCase";

const route = Router();

route.use(peopleRouter);

export default route;