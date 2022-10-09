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
}

interface TransactionsI {
    makeTransaction(transaction: TransactionsType, adapter: TransactionTypeAdapterI): Promise<ObjectResponse>;
}

export { TransactionsI, TransactionsType };