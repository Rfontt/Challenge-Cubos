import { cnpj, cpf } from 'cpf-cnpj-validator';
import { ValidatorI } from "../interfaces/validator.interface";

export default class ValidatorAdapter implements ValidatorI {
    cpf(document: string): boolean {
        const isValid = cpf.isValid(document);

        if (isValid) {
            return true
        }

        return false;
    }
    cnpj(document: string): boolean {
        const isValid = cnpj.isValid(document);

        if (isValid) {
            return true;
        }

        return false;
    }
}