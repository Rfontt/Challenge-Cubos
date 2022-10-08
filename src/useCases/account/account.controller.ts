import { Request, Response } from "express";
import Repository from "../../repositories/general.repository";
import AccountUseCase from "./account.useCase";
import { AccountType } from "../../interfaces/account/account.interface";

export default class AccountController {
    static async create(req: Request, res: Response) {
        const { branch, account, people_id } = req.body;
        const accountBody: AccountType = {
            branch, account, people_id
        };

        if (!accountBody.branch || !accountBody.account || !accountBody.people_id) {
            return res.status(400).send({ message: "Bad request" });
        }

        const peoplseUseCase = new AccountUseCase(new Repository());
        const createPeople = await peoplseUseCase.create(
            accountBody
        );

        return res.status(createPeople.status).send({ message: createPeople.message });
    }

    static async selectAllAccountToOnePeople(req: Request, res: Response) {
        const peoplseUseCase = new AccountUseCase(new Repository());

        const { people_id } = req.params;

        const selectAllAccountToOnePeople = await peoplseUseCase.selectAccountToOnePeople(
            parseInt(people_id, 10)
        );

        if (selectAllAccountToOnePeople.error) {
            return res.status(selectAllAccountToOnePeople.status)
            .send({ error: selectAllAccountToOnePeople.error });
        }


        return res.status(selectAllAccountToOnePeople.status)
            .send(selectAllAccountToOnePeople.message);
    }
}