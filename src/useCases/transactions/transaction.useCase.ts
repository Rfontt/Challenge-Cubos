import { RepositoryI } from "../../interfaces/repository/repository.interface";

export default class TransactionsUseCase {
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository
    }
}