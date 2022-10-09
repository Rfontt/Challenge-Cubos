import { PeopleType } from "../people/people.interface";

type LoginResponse = {
    token: string;
    error?: string;
    status: number;
}

interface LoginI {
    makeLogin(people: PeopleType): Promise<LoginResponse>;
}

export { LoginI, LoginResponse };