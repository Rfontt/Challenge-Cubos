import database from '../../database/connection';
import GeneralRepository from '../general.repository';
import { TypeEnum } from '../../enums/card.enum';
import { CardAccountRepositoryI } from '../../interfaces/repository/card_account-repository.interface';

export default class CardAccountRepository extends GeneralRepository implements CardAccountRepositoryI {
    async verifyIfCardsPhysicalAlreadyExists(account_id: number) {
        try {
            return await database.select('card.type_id')
                .join('account', 'account.id', '=', 'account_card.account_id')
                .join('card', 'card.id', '=', 'account_card.card_id')
                .where('card.type_id', TypeEnum.PHYSICAL)
                .where('account.id', account_id)
                .table('account_card');
        } catch (error) {
            console.log(error);

            throw new Error('Error selecting data');
        }
    }
}