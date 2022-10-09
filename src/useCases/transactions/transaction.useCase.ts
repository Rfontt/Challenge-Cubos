import { TransactionsTypeEnum } from "../../enums/transation.enum";
import { TransactionTypeAdapterI } from "../../interfaces/adapters/transaction-type.interface";
import { ObjectResponse } from "../../interfaces/general/message-pattern.interface";
import { RepositoryI } from "../../interfaces/repository/repository.interface";
import { TransactionsI, TransactionsType } from '../../interfaces/transactions/transactions.interface';

export default class TransactionsUseCase implements TransactionsI {
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository
    }
    
    async makeTransaction(transaction: TransactionsType, adapter: TransactionTypeAdapterI): Promise<ObjectResponse> {
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
                const data = await adapter.debit(transaction);

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
}