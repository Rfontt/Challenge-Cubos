import { PeopleI, PeopleType } from "../interfaces/people.interface";

export default class PeopleService implements PeopleI {
    create(people: PeopleType): boolean {
        throw new Error("Method not implemented.");
    }
}