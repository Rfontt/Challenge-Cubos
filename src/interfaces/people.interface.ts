type PeopleType  = {
    id?: string;
    name: string;
    document: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface PeopleI {
    create(people: PeopleType): boolean;
}

export {
    PeopleType,
    PeopleI
};