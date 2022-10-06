import { AccountType } from "../account/account.interface";

interface AccountSelectsI {
    selectAllAccounts(value: any): Promise<Array<AccountType>>;
}

export {
    AccountSelectsI
}