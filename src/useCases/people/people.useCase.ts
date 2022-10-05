import { PeopleI, PeopleType } from "../../interfaces/people.interface";
import { RepositoryI } from "../../interfaces/repository.interface";
import { ValidatorI } from "../../interfaces/validator.interface";

export default class PeopleUseCase implements PeopleI {
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository;
    }

    async create(people: PeopleType, validator: ValidatorI): Promise<boolean> {
        try {
            let isValid = false;

            if (people.document.length === 11) {
                isValid = await validator.cpf(people.document);

            } else if (people.document.length === 14) {
                isValid = await validator.cnpj(people.document);
            }

            if (!isValid) {
                return false;
            }

            this.#repository.create(people);

            return true;
        } catch (error) {
            return false;
        }
    }
}