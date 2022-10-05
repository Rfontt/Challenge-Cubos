import { MessagePattern } from "../../interfaces/message-pattern.interface";
import { PeopleI, PeopleType } from "../../interfaces/people.interface";
import { RepositoryI } from "../../interfaces/repository.interface";
import { ValidatorI } from "../../interfaces/validator.interface";

export default class PeopleUseCase implements PeopleI {
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository;
    }

    async create(people: PeopleType, validator: ValidatorI): Promise<MessagePattern> {
        try {
            let isValid = false;
            let document = people.document;

            document = document.split('.').join('');
            document = document.split('-').join('');

            if (document.length === 11) {
                isValid = validator.cpf(document);

            } else if (document.length === 14) {
                isValid = validator.cnpj(document);
            }

            if (!isValid) {
                return {
                    message: "Invalid document",
                    status: 401
                }
            }

            await this.#repository.create(people);

            return {
                message: "People created with success",
                status: 201
            };
        } catch (error) {
            return {
                message: "Internal server error",
                status: 401
            }
        }
    }
}