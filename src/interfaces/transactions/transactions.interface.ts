import { TransactionsTypeEnum } from '../../enums/transation.enum';
import { ObjectResponse } from '../general/message-pattern.interface';
import { AccountType } from '../account/account.interface';
import { TransactionTypeAdapterI } from '../adapters/transaction-type.interface';

type TransactionsType = {
    id?: number;
    value: number;
    description: string;
    type: TransactionsTypeEnum;
    account: AccountType
    created_at?: string;
    updated_at?: string;
    receiverAccountId?: number;
}

interface TransactionsI {
    makeTransaction(transaction: TransactionsType, adapter: TransactionTypeAdapterI): Promise<ObjectResponse>;
    makeInternalTransaction(
        transaction: TransactionsType,
        adapter: TransactionTypeAdapterI,
        account_sender: number
    ): Promise<ObjectResponse>;
    getBalanceOneAccount(account_id: number): Promise<ObjectResponse>;
    getTransactions(account_id: number): Promise<ObjectResponse>;
    revert(
        accountId: number,
        transactionId: number,
        adapter: TransactionTypeAdapterI
    ): Promise<ObjectResponse>;
}

export { TransactionsI, TransactionsType };