import { ObjectResponse } from "../general/message-pattern.interface";
import { ValidatorI } from "../adapters/validator.interface";
import { EncriptyI } from "../adapters/encripty.interface";

type PeopleType  = {
    id?: number;
    name: string;
    document: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}

interface PeopleI {
    create(
        people: PeopleType,
        validator: ValidatorI,
        encripty: EncriptyI,
    ): Promise<ObjectResponse>;
}

export {
    PeopleType,
    PeopleI
};