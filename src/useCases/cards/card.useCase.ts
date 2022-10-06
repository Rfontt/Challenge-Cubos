import { CardsI, CardType } from "../../interfaces/cards/cards.interface";
import { MessagePattern } from "../../interfaces/general/message-pattern.interface";
import { CardAccountRepositoryI } from "../../interfaces/repository/card_account-repository.interface";

export default class CardUseCase implements CardsI {
    #repository: CardAccountRepositoryI;

    constructor(repository: CardAccountRepositoryI) {
        this.#repository = repository;
    }

    async create(card: CardType, account_id: number): Promise<MessagePattern> {
        if (card.cvv.toString().length > 3) {
            return {
                message: 'Invalid CVV',
                status: 400
            }
        }

        try {
            const existsPhysicalCard = await this.#repository.verifyIfCardsPhysicalAlreadyExists(account_id);

            console.log(existsPhysicalCard);

            if (existsPhysicalCard.length > 0) {
                return {
                    message: 'Physical card already exists',
                    status: 406
                }
            }

            const cardID = await this.#repository.create(card, 'card');

            console.log(cardID);

            return {
                message: 'Created with success',
                status: 201
            }
        } catch(error) {
            return {
                message: 'Internal server error',
                status: 500
            }
        }
    }
}