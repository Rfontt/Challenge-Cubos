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

            const cardArray: CardType[] = await this.#repository.create(card, 'card');
            const cardObject: CardType = cardArray[0]; 
            const cardID = cardObject.id;
            

            const creatingAssociation = await this.#repository.create({
                account_id,
                card_id: cardID
            }, 'account_card');

            console.log(creatingAssociation);

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