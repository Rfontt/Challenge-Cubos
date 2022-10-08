import { ValidatorI } from "../../src/interfaces/adapters/validator.interface";

export default class ValidatorMock implements ValidatorI {
    cpf(document: string): boolean {
        if (document.length === 11) {
            return true;
        } else {
            return false;
        }
    }
    cnpj(document: string): boolean {
        if (document.length === 14) {
            return true;
        } else {
            return false;
        }
    }
}