type PeopleType  = {
    name: string;
    document: string;
    password: string;
}

interface PeopleI {
    create(people: PeopleType): boolean;
}

export {
    PeopleType,
    PeopleI
};