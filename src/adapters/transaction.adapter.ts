import { TransactionTypeAdapterI } from '../interfaces/adapters/transaction-type.interface';
import { TransactionsType } from '../interfaces/transactions/transactions.interface';

export default class EncriptyAdapter implements TransactionTypeAdapterI {
    debit(): Promise<TransactionsType> {
        throw new Error('Method not implemented.');
    }
    credit(): Promise<TransactionsType> {
        throw new Error('Method not implemented.');
    }
}