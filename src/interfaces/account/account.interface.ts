import { MessagePattern, ObjectResponse } from '../general/message-pattern.interface';

type AccountType = {
    id?: number;
    branch: string;
    account: string;
    balance?: number;
    created_at?: string;
    updated_at?: string;
    people_id: number;
}

interface AccountI {
    create(account: AccountType): Promise<ObjectResponse>;
    selectAccountToOnePeople(people_id: number): Promise<ObjectResponse>;
}

export {
    AccountI,
    AccountType
}