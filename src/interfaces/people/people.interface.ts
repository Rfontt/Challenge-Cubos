import { MessagePattern } from "../general/message-pattern.interface";
import { ValidatorI } from "../adapters/validator.interface";
import { EncriptyI } from "../adapters/encripty.interface";

type PeopleType  = {
    id?: number;
    name: string;
    document: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface PeopleI {
    create(
        people: PeopleType,
        validator: ValidatorI,
        encripty: EncriptyI,
    ): Promise<MessagePattern>;
}

export {
    PeopleType,
    PeopleI
};