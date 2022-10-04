import { AxiosInstance } from "axios";
import { ValidatorI } from "../interfaces/validator.interface";

export default class ValidatorAdapter implements ValidatorI {
    #api: AxiosInstance

    constructor(api: AxiosInstance) {
        this.#api = api;
    }

    async cpf(document: string): Promise<boolean> {
        try {
            await this.#api.post('/cpf/validate', {
                document
            });

            return true;
        } catch (error) {
            return false;
        }
    }
    
    async cnpj(document: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}