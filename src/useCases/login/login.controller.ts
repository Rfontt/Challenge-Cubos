import LoginUseCase from "./login.useCase";
import GeneralRepository from '../../repositories/general.repository';
import { Request, Response } from "express";
import { PeopleType } from "../../interfaces/people/people.interface";

export default class LoginController {
    static async makeLogin(req: Request, res: Response) {
        const {
            document,
            password
        } = req.body;

        if (!document || !password) {
            return res.status(400).send({ message: "Bad request" });
        }

        const people: PeopleType = {
            name: "",
            document,
            password
        }

        const loginUseCase = new LoginUseCase(new GeneralRepository());
        const result = await loginUseCase.makeLogin(people);

        if (result.error) {
            return res.status(result.status).send({ message: result.error });
        }

        return res.status(result.status).send({ message: result.token }); 
    }
}