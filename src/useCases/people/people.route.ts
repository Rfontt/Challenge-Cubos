import { Router } from "express";
import PeopleController from "./people.controller";

const peopleRouter = Router();

peopleRouter.post('/people', PeopleController.create);

export default peopleRouter;