import { Request, Response } from "express";
import PeopleRepository from "../../repositories/people.repository";
import PeopleUseCase from "./people.useCase";
import ValidatorAdapter from "../../adapters/validator.adapter";
import { PeopleType } from "../../interfaces/people.interface";
import compliceApi from "../../ports/compliance-api.ports";

export default class PeopleController {
    static async create(req: Request, res: Response) {
        const { people } = req.body;
        const peopleBody: PeopleType = people;

        const peoplseUseCase = new PeopleUseCase(new PeopleRepository());
        const createPeople = await peoplseUseCase.create(
            peopleBody,
            new ValidatorAdapter(compliceApi),
        );

        return res.status(createPeople.status).send(createPeople.message);
    }
}