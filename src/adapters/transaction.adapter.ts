import { TransactionsTypeEnum } from '../enums/transation.enum';
import { AccountType } from '../interfaces/account/account.interface';
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

            await this.updateBalance(transaction.value, transaction.account.id);

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

    async internal(transaction: TransactionsType, account_sender: number): Promise<TransactionsType> {
        try {
            let isTransactionCreated: TransactionsType = transaction;
        
            if (transaction.type === TransactionsTypeEnum.DEBIT) {
                const senderDetails = await this.selectSenderAccountDatails(account_sender);    
                const senderBalance = senderDetails.balance ? senderDetails.balance : 0;
        
                if (!(senderBalance > transaction.value)) {
                    throw new Error('Transaction not permitted');
                }
                
                const result = await this.debit(transaction);
                const newValueToRecipient = senderBalance - transaction.value;
        
                await this.updateBalance(newValueToRecipient, account_sender);
        
                isTransactionCreated = result;
            } else if (transaction.type === TransactionsTypeEnum.CREDIT) {
                await this.credit(transaction);
            }
        
            return isTransactionCreated;
        } catch (error) {
            throw new Error("Internal server error");
        }
    }

    private async updateBalance(value: number, account_id: number | undefined): Promise<boolean> {
        try {
            const newBalance = { balance: value };
            const where: WhereType = { condition: 'id', value: account_id };

            await this.#repository.update(newBalance, 'account', where);

            return true;
        } catch (error) {
            throw new Error("Error updating data");
        }
    }

    async selectSenderAccountDatails(account_id: number): Promise<AccountType> {
        try {
            const where: WhereType = {
                condition: 'id', value: account_id
            };
            const result: Object = await this.#repository.selectWhere('account', where);

            return result as AccountType;
        } catch (error) {
            throw new Error("Error updating data");
        }
    }
}