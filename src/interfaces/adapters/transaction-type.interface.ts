import { TransactionsType } from "../transactions/transactions.interface";

interface TransactionTypeAdapterI {
    debit(): Promise<TransactionsType>;
    credit(): Promise<TransactionsType>;
}

export { TransactionTypeAdapterI };