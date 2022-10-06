import database from '../../database/connection';
import GeneralRepository from '../general.repository';
import { TypeEnum } from '../../enums/card.enum';
import { CardAccountRepositoryI } from '../../interfaces/repository/card_account-repository.interface';

export default class CardAccountRepository extends GeneralRepository implements CardAccountRepositoryI {
    async verifyIfCardsPhysicalAlreadyExists(account_id: number): Promise<Object[]> {
        try {
            return database.select("cc.account_id")
                .table('account_card as cc')
                .join('card as ca', 'cc.card_id', '=', 'ca.id')
                .join('account as acc', 'cc.account_id', '=', 'acc.id')
                .where('ca.type_id', TypeEnum.PHYSICAL)
                .where('cc.account_id', account_id);
            
        } catch (error) {
            throw new Error('Error selecting data');
        }
    }

    async getAllCardsByAccountID(account_id: number): Promise<Object[]> {
        try {
            return database.select("*")
                .table('account_card')
                .join('card', 'card.id', '=', 'account_card.card_id')
                .where('account_card.account_id', account_id);
        } catch (error) {
            throw new Error('Error selecting data');
        }
    }
}