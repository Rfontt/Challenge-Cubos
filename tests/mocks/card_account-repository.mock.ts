import { CardAccountRepositoryI } from '../../src/interfaces/repository/card_account-repository.interface';
import RepositoryMock from './repository.mock';

export default class CardAccountMockRepository extends RepositoryMock implements CardAccountRepositoryI {
    getAllCardsByAccountID(account_id: number): Promise<Object[]> {
        throw new Error('Method not implemented.');
    }

    verifyIfCardsPhysicalAlreadyExists(account_id: number): Promise<Object[]> {
        throw new Error('Method not implemented.');
    }
}