import { TransactionsTypeEnum } from '../enums/transation.enum';
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
                receiverAccountId: transaction.account.id,
                description: transaction.description,
                type_id: transaction.type
            }
            const data = await this.#repository.create(transactionToSave, 'transaction');
            const transactionObject: TransactionsType = data[0];

            await this.updateBalanceRecipient(transaction.value, transaction.account.id);

            const response: Object = {
                id: transactionObject.id,
                value: transactionObject.value,
                description: transactionObject.description,
                createdAt: transactionObject.created_at,
                updatedAt: transactionObject.updated_at
            }

            return response as TransactionsType;
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    async credit(transaction: TransactionsType): Promise<TransactionsType> {
        throw new Error('method not implemented');
    }

    async internal(transaction: TransactionsType): Promise<TransactionsType> {
        try {
            let isTransactionCreated: TransactionsType = transaction;

            if (transaction.type === TransactionsTypeEnum.DEBIT) {
                const result = await this.debit(transaction);
                // await this.updateBalance(result.value);
            } else if (transaction.type === TransactionsTypeEnum.CREDIT) {
                await this.credit(transaction);
            }

            return isTransactionCreated;

        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    private async updateBalanceRecipient(value: number, account_id: number | undefined): Promise<boolean> {
        try {
            const newBalance = { balance: value };
            const where: WhereType = { condition: 'id', value: account_id };

            await this.#repository.update(newBalance, 'account', where);

            return true;
        } catch (error) {
            throw new Error("Error updating data");
        }
    }

    private async updateBalanceSender() {
        
    }
}