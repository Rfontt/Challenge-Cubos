import { ValidatorI } from "../interfaces/validator.interface";

export default class ValidatorAdapter implements ValidatorI {
    cpf(document: string): boolean {
        throw new Error("Method not implemented.");
    }
    cnpj(document: string): boolean {
        throw new Error("Method not implemented.");
    }
    
}