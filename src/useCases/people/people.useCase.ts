import { MessagePattern } from "../../interfaces/general/message-pattern.interface";
import { PeopleI, PeopleType } from "../../interfaces/people/people.interface";
import { RepositoryI } from "../../interfaces/repository/repository.interface";
import { ValidatorI } from "../../interfaces/adapters/validator.interface";
import { EncriptyI } from "../../interfaces/adapters/encripty.interface";

export default class PeopleUseCase implements PeopleI {
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository;
    }

    async create(people: PeopleType, validator: ValidatorI, encripty: EncriptyI): Promise<MessagePattern> {
        let isValid = false;
        let document = people.document;
        
        document = document.split('.').join('');
        document = document.split('-').join('');
        people.document = document;

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

        try {
            const hash = await encripty.hash(people.password, 10);

            const dataToCreate = {
                name: people.name,
                document: people.document,
                password: hash,
            }

            await this.#repository.create(dataToCreate, 'people');

            return {
                message: "People created with success",
                status: 201
            };
        } catch (error) {
            return {
                message: "Internal server error",
                status: 500
            }
        }
    }
}