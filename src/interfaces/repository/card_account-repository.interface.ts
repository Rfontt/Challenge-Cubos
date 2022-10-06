import { RepositoryI } from "./repository.interface";

interface CardAccountRepositoryI extends RepositoryI {
    verifyIfCardsPhysicalAlreadyExists(people_id: number): Promise<Object[]>;
}

export {
    CardAccountRepositoryI
};