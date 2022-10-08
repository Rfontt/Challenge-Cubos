interface TransactionTypeAdapter {
    debit(): Promise<void>;
    credit(): Promise<void>;
}