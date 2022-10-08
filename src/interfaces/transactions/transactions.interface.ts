import { TransactionsTypeEnum } from '../../enums/transation.enum';
import { ObjectResponse } from '../general/message-pattern.interface';
import { AccountType } from '../account/account.interface';

type TransactionsType = {
    id?: number;
    value: number;
    description: string;
    type: TransactionsTypeEnum;
    account: AccountType
    createdAt?: string;
    updatedAt?: string;

}

interface TransactionsI {
    makeTransaction(transaction: TransactionsType): Promise<ObjectResponse>;
}

export { TransactionsI, TransactionsType };