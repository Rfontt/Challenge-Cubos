import { TransactionsType } from "../transactions/transactions.interface";

interface TransactionTypeAdapterI {
    debit(transaction: TransactionsType): Promise<TransactionsType>;
    credit(transaction: TransactionsType): Promise<TransactionsType>;
}

export { TransactionTypeAdapterI };