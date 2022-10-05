import { MessagePattern } from "./message-pattern.interface";
import { ValidatorI } from "./validator.interface";

type PeopleType  = {
    id?: string;
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
    ): Promise<MessagePattern>;
}

export {
    PeopleType,
    PeopleI
};