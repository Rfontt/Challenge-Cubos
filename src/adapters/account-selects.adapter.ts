import { AccountI } from "../interfaces/account/account.interface";
import { AccountSelectsI } from "../interfaces/adapters/account-selects.interface";
import { RepositoryI, WhereType } from "../interfaces/repository/repository.interface";

export default class AccountSelectsAdapter implements AccountSelectsI {
    #repostory: RepositoryI;

    async selectAllAccounts(value: any): Promise<AccountI> {
        try {
            const where: WhereType = {
                condition: 'people_id',
                value: value
            }

            const data = await this.#repostory.selectWhere(
                'account',
                where
            );
            const accountData = data as AccountI;

            return accountData;
        } catch (error) {
            throw new Error(error);
        }
    }
}