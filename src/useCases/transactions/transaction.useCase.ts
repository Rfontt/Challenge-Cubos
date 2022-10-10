import { TransactionsTypeEnum } from "../../enums/transation.enum";
import { AccountType } from "../../interfaces/account/account.interface";
import { TransactionTypeAdapterI } from "../../interfaces/adapters/transaction-type.interface";
import { ObjectResponse } from "../../interfaces/general/message-pattern.interface";
import { RepositoryI, WhereType } from "../../interfaces/repository/repository.interface";
import { TransactionsI, TransactionsType } from '../../interfaces/transactions/transactions.interface';

export default class TransactionsUseCase implements TransactionsI {
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository
    }

    async makeTransaction(transaction: TransactionsType, adapter: TransactionTypeAdapterI): Promise<ObjectResponse> {
        if (transaction.type !== TransactionsTypeEnum.CREDIT && transaction.type !== TransactionsTypeEnum.DEBIT) {
            return {
                message: [],
                error: "Type not permitted",
                status: 400
            }
        }

        if (transaction.value < 0) {
            return {
                message: [],
                error: "Value not permitted",
                status: 400
            }
        }

        try {
            let isTransactionCreated: TransactionsType = transaction;
             
            if (transaction.type === TransactionsTypeEnum.DEBIT) {
                const data = await adapter.debit(transaction);

                isTransactionCreated = data;
            } else if (transaction.type === TransactionsTypeEnum.CREDIT)  {
                const data = await adapter.credit(transaction);

                isTransactionCreated = data;
            }

            return {
                message: isTransactionCreated,
                status: 201
            }
        } catch (error) {
            return {
                message: [],
                error: "Internal server error",
                status: 500
            }
        }
    }

    async makeInternalTransaction(
        transaction: TransactionsType,
        adapter: TransactionTypeAdapterI,
        account_sender: number,
    ): Promise<ObjectResponse> {
        if (transaction.type !== TransactionsTypeEnum.CREDIT && transaction.type !== TransactionsTypeEnum.DEBIT) {
            return {
                message: [],
                error: "Type not permitted",
                status: 400
            }
        }
        
        if (transaction.value < 0) {
            return {
                message: [],
                error: "Value not permitted",
                status: 400
            }
        }
        
        try {
            const internalTransaction: TransactionsType = await adapter.internal(transaction, account_sender);

            return {
                message: internalTransaction,
                status: 201
            }
        } catch (error) {
            return {
                message: [],
                error: "Internal server error",
                status: 500
            }
        }
    }

    async getBalanceOneAccount(account_id: number): Promise<ObjectResponse> {
        try {
            const where: WhereType = { condition: 'id', value: account_id };

            const data: Object[] = await this.#repository.selectWhere('account', where)

            if (data.length === 0) {
                return {
                    message: [],
                    error: "Data Not found",
                    status: 404
                } 
            }

            const dataObject = data[0];
            const account = dataObject as AccountType;

            return {
                message: {
                    balance: account.balance
                },
                status: 200
            }
        } catch (error) {
            return {
                message: [],
                error: "Internal server error",
                status: 500
            }
        }
    }

    async getTransactions(account_id: number): Promise<ObjectResponse> {
        try {
            const where: WhereType = { condition: 'receiverAccountId', value: account_id };

            const data = await this.#repository.selectWhere('transaction', where);

            return {
                message: data,
                status: 200
            }
        } catch (error) {
            return {
                message: [],
                error: "Internal server error",
                status: 500
            }
        }
    }

    async revert(
        accountId: number,
        transactionId: number,
        adapter: TransactionTypeAdapterI
    ): Promise<ObjectResponse> {
        try {
            const transaction = await this.selectData('id', transactionId, 'transaction');
        
            if (transaction.length > 0) {
                const transactionObject = transaction[0] as TransactionsType;
                const accountToRevert = await this.selectData('id', transactionObject.receiverAccountId, 'account');
                const accountToReceiver = await this.selectData('id', accountId, 'account');

                if (accountToRevert.length > 0 && accountToReceiver.length > 0) {
                    const accountToReceiverObject = accountToReceiver[0] as AccountType;
                    const accountToRevertObject = accountToRevert[0] as AccountType;

                    if (
                        accountToRevertObject.balance || 0 >= transactionObject.value
                    ) {
                        const newBalanceValueToaccountToRevert = accountToRevertObject.balance || 0 - transactionObject.value;
                        const newValueToAccountRevert = accountToReceiverObject.balance || 0 + transactionObject.value;

                        await adapter.updateBalance(
                            newBalanceValueToaccountToRevert,
                            transactionObject.receiverAccountId
                        );

                        await adapter.updateBalance(
                            newValueToAccountRevert,
                            accountId
                        );

                        return {
                            message: {
                                id: transactionObject.id,
                                value: transactionObject.value,
                                description: transactionObject.description,
                                createdAt: transactionObject.created_at,
                                updatedAt: transactionObject.updated_at
                            },
                            status: 201,
                        }
                    } else {
                        return {
                            message: [],
                            error: "Value not available",
                            status: 401
                        }
                    }
                }

                return {
                    message: [],
                    error: "Account not found",
                    status: 404
                }
            }

            return {
                message: [],
                error: "Transaction not found",
                status: 404
            }
        } catch (error) {
            return {
                message: [],
                error: "Internal server error",
                status: 500
            }
        }
    }

    private async selectData(condition: string, value: any, table: string) {
        const where: WhereType = { condition, value };
        const data = await this.#repository.selectWhere(table, where);

        return data;
    }
}