import { Request, Response } from "express";
import { CardType } from "../../interfaces/cards/cards.interface";
import CardAccountRepository from "../../repositories/card/card_account.repository";
import CardUseCase from "./card.useCase";

export default class CardController {
    static async create(req: Request, res: Response) {
        const {
            type_id,
            number,
            cvv
        } = req.body;
        const { accountId } = req.params;

        const cardBody: CardType = {
            type_id, number, cvv
        };

        if (!cardBody.cvv || !cardBody.number || !cardBody.type_id) {
            return res.status(400).send({ message: "Bad request" });
        }

        const cards = new CardUseCase(new CardAccountRepository());
        const createCard = await cards.create(
            cardBody,
            parseInt(accountId, 10)
        );

        if (createCard.error) {
            return res.status(createCard.status).send({ message: createCard.error });
        }

        return res.status(createCard.status).send({ message: createCard.message });
    }

    static async getAllCardsByAccountID(req: Request, res: Response) {
        const { accountId } = req.params;

        const cards = new CardUseCase(new CardAccountRepository());
        const allCards = await cards.getAllCardsByAccountID(parseInt(accountId, 10));

        if (allCards.error) {
            return res.status(allCards.status).send({ message: allCards.error });
        }

        return res.status(allCards.status).send({ message: allCards.message });
    }

    static async getAllCardsByPeople(req: Request, res: Response) {

    }
}