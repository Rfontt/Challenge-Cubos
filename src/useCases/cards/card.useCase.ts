import { CardTypeEnum } from "../../enums/card.enum";
import { CardsI, CardType } from "../../interfaces/cards/cards.interface";
import { ObjectResponse } from "../../interfaces/general/message-pattern.interface";
import { CardAccountRepositoryI } from "../../interfaces/repository/card_account-repository.interface";

export default class CardUseCase implements CardsI {
    #repository: CardAccountRepositoryI;

    constructor(repository: CardAccountRepositoryI) {
        this.#repository = repository;
    }
    
    async create(card: CardType, account_id: number): Promise<ObjectResponse> {
        if (card.type_id !== CardTypeEnum.PHYSICAL && card.type_id !== CardTypeEnum.VIRTUAL) {
            return {
                message: [],
                error: 'Invalid type',
                status: 400
            }
        }

        if (card.cvv.toString().length > 3) {
            return {
                message: [],
                error: 'Invalid CVV',
                status: 400
            }
        }

        try {
            const existsPhysicalCard = await this.#repository.verifyIfCardsPhysicalAlreadyExists(account_id);

            if (existsPhysicalCard.length > 0 && card.type_id === CardTypeEnum.PHYSICAL) {
                return {
                    message: 'Physical card already exists',
                    status: 406
                }
            }

            const cardArray: CardType[] = await this.#repository.create(card, 'card');
            const cardObject: CardType = cardArray[0]; 
            const cardID = cardObject.id;

            await this.#repository.create({
                account_id,
                card_id: cardID
            }, 'account_card');

            const cardObjectResponse = {
                id: cardID,
                type: cardObject.type_id,
                number: cardObject.number,
                cvv: cardObject.cvv,
                createdAt: cardObject.created_at,
                updatedAt: cardObject.updated_at
            }

            return {
                message: cardObjectResponse,
                status: 201
            }
        } catch(error) {
            return {
                message: [],
                error: 'Internal server error',
                status: 500
            }
        }
    }

    async getAllCardsByAccountID(account_id: number): Promise<ObjectResponse> {
        try {
            const data = await this.#repository.getAllCardsByAccountID(account_id);

            return {
                message: data,
                status: 200,
            }
        } catch (error) {
            return {
                message: [],
                error: 'Internal server error',
                status: 500,
            }
        }
    }
}