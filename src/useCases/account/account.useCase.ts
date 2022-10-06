import { AccountI, AccountType } from "../../interfaces/account/account.interface";
import { MessagePattern, ObjectResponse } from "../../interfaces/general/message-pattern.interface";
import { RepositoryI, WhereType } from "../../interfaces/repository/repository.interface";

export default class AccountUseCase implements AccountI {
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository;
    }
    
    async create(account: AccountType): Promise<MessagePattern> {
        if (account.branch.length > 3) {
            return {
                message: "Invalid value to branch",
                status: 400
            }
        }

        try {
            const accountValue = this.accountSettings(account.account);
            account.account = accountValue;

            await this.#repository.create(account, 'account');

            return {
                message: "Account created with success",
                status: 201
            };
        } catch (error) {
            return {
                message: "Internal server error",
                status: 500
            }
        }
    }

    accountSettings(accountValue: string): string {
        const accountSplit = accountValue.split('');

        if (!(accountSplit.includes('-'))) {
            accountSplit.splice(0, accountSplit.length - 2, "-");
        }

        return accountSplit.join("");
    }

    async selectAccountToOnePeople(people_id: number): Promise<ObjectResponse> {
        try {
            const where: WhereType = {
                condition: 'people_id',
                value: people_id
            }

            const data = await this.#repository.selectWhere(
                'account',
                where
            );
            const accountData = data as Array<AccountType>;

            return {
                message: accountData,
                status: 200
            };
        } catch (error) {
            return {
                message: [],
                error: "Internal server error",
                status: 500
            };
        }
    }
}