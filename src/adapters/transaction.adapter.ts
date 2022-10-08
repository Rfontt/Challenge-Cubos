import { TransactionTypeAdapterI } from '../interfaces/adapters/transaction-type.interface';
import { WhereType } from '../interfaces/repository/repository.interface';
import { TransactionsType } from '../interfaces/transactions/transactions.interface';
import GeneralRepository from '../repositories/general.repository';

export default class TransactionTypeAdapter implements TransactionTypeAdapterI {
    #repository: GeneralRepository;

    constructor() {
        this.#repository = new GeneralRepository();
    }
    
    async debit(transaction: TransactionsType): Promise<TransactionsType> {
        try {
            const transactionToSave = {
                value: transaction.value,
                account_id: transaction.account.id,
                description: transaction.description,
                type_id: transaction.type
            }
            const data = await this.#repository.create(transactionToSave, 'transaction');
            const transactionObject: TransactionsType = data[0];

            const newBalance = { balance: transaction.value };
            const where: WhereType = { condition: 'id', value: transaction.account.id };

            await this.#repository.update(newBalance, 'account', where);

            return transactionObject;
        } catch (error) {
            throw new Error("Internal server error");
        }
    }
    credit(transaction: TransactionsType): Promise<TransactionsType> {
        throw new Error('Method not implemented.');
    }
}