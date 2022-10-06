import { AccountI } from "../account/account.interface";

interface AccountSelectsI {
    selectAllAccounts(value: any): Promise<AccountI>;
}

export {
    AccountSelectsI
}