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
}