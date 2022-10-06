import { Request, Response } from "express";
import Repository from "../../repositories/general.repository";
import AccountUseCase from "./account.useCase";
import { AccountType } from "../../interfaces/account/account.interface";

export default class AccountController {
    static async create(req: Request, res: Response) {
        const { branch, account } = req.body;
        const accountBody: AccountType = {
            branch, account
        };

        if (!accountBody.branch || !accountBody.account) {
            return res.status(400).send({ message: "Bad request" });
        }

        const peoplseUseCase = new AccountUseCase(new Repository());
        const createPeople = await peoplseUseCase.create(
            accountBody
        );

        return res.status(createPeople.status).send({ message: createPeople.message });
    }
}