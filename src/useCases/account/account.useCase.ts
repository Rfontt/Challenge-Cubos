import { AccountI, AccountType } from "../../interfaces/account/account.interface";
import { RepositoryI } from "../../interfaces/repository/repository.interface";

export default class AccountUseCase implements AccountI{
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository;
    }

    create(account: AccountType): boolean {
        throw new Error("Method not implemented.");
    }
}