type AccountType = {
    id?: string;
    branch: string;
    account: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AccountI {
    create(account: AccountType): boolean;
}

export {
    AccountI,
    AccountType
}