import { PeopleI, PeopleType } from "../../interfaces/people.interface";
import { ValidatorI } from "../../interfaces/validator.interface";

export default class PeopleUseCase implements PeopleI {
    constructor() {
        
    }

    async create(people: PeopleType, validator: ValidatorI): Promise<boolean> {
        try {
            let isValid = false;

            if (people.document.length === 11) {
                isValid = await validator.cpf(people.document);

            } else if (people.document.length === 14) {

            }

            console.log(isValid);

            return true;
        } catch (error) {
            return false;
        }
    }
}