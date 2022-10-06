import { MessagePattern } from '../general/message-pattern.interface';

type AccountType = {
    id?: number;
    branch: string;
    account: string;
    createdAt?: string;
    updatedAt?: string;
    people_id: number;
}

interface AccountI {
    create(account: AccountType): Promise<MessagePattern>;
}

export {
    AccountI,
    AccountType
}