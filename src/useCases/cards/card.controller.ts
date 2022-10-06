import { Request, Response } from "express";
import { CardType } from "../../interfaces/cards/cards.interface";
import CardAccountRepository from "../../repositories/card/card_account.repository";
import CardUseCase from "./card.useCase";

export default class PeopleController {
    static async create(req: Request, res: Response) {
        const {
            type,
            number,
            cvv
        } = req.body;
        const { accountId } = req.params;

        const cardBody: CardType = {
            type, number, cvv
        };

        if (!cardBody.cvv || !cardBody.number || !cardBody.type) {
            return res.status(400).send({ message: "Bad request" });
        }

        const peoplseUseCase = new CardUseCase(new CardAccountRepository());
        const createPeople = await peoplseUseCase.create(
            cardBody,
            parseInt(accountId, 10)
        );

        return res.status(createPeople.status).send({ message: createPeople.message });
    }
}