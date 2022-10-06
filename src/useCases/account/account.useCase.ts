import { AccountI, AccountType } from "../../interfaces/account/account.interface";
import { MessagePattern } from "../../interfaces/general/message-pattern.interface";
import { RepositoryI } from "../../interfaces/repository/repository.interface";

export default class AccountUseCase implements AccountI {
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository;
    }

    async create(account: AccountType): Promise<MessagePattern> {
        try {
            const accountValue = this.accountSettings(account.account);

            account.account = accountValue;

            this.#repository.create(account, 'account');

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
}