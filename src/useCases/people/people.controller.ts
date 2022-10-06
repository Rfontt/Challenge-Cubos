import { Request, Response } from "express";
import Repository from "../../repositories/general.repository";
import PeopleUseCase from "./people.useCase";
import ValidatorAdapter from "../../adapters/validator.adapter";
import { PeopleType } from "../../interfaces/people/people.interface";
import EncriptyAdapter from "../../adapters/encripty.adapter";

export default class PeopleController {
    static async create(req: Request, res: Response) {
        const { name, document, password } = req.body;
        const peopleBody: PeopleType = {
            name, document, password
        };

        if (!peopleBody.name || !peopleBody.document || !peopleBody.password) {
            return res.status(400).send({ message: "Bad request" });
        }

        const peoplseUseCase = new PeopleUseCase(new Repository());
        const createPeople = await peoplseUseCase.create(
            peopleBody,
            new ValidatorAdapter(),
            new EncriptyAdapter()
        );

        if (createPeople.error) {
            return res.status(createPeople.status).send({ message: createPeople.error });
        }

        return res.status(createPeople.status).send({ message: createPeople.message });
    }
}