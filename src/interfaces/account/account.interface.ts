import { MessagePattern, ObjectResponse } from '../general/message-pattern.interface';

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
    selectAccountToOnePeople(people_id: number): Promise<ObjectResponse>;
}

export {
    AccountI,
    AccountType
}