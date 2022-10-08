import { TransactionTypeAdapterI } from '../interfaces/adapters/transaction-type.interface';
import { TransactionsType } from '../interfaces/transactions/transactions.interface';
import GeneralRepository from '../repositories/general.repository';

export default class EncriptyAdapter implements TransactionTypeAdapterI {
    #repository: GeneralRepository;

    constructor() {
        this.#repository = new GeneralRepository();
    }
    
    async debit(transaction: TransactionsType): Promise<TransactionsType> {
        try {
            const data = this.#repository.create(transaction, 'transaction');
            const transactionObject: TransactionsType = data[0];

            return transactionObject;
        } catch (error) {
            throw new error(error);
        }
    }
    credit(transaction: TransactionsType): Promise<TransactionsType> {
        throw new Error('Method not implemented.');
    }
}