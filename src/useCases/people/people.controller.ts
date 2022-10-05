import { Request, Response } from "express";

export default class PeopleController {
    static create(req: Request, res: Response) {
        return res.status(201).send({ message: 'true' });
    }
}