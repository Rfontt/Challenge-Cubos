import { RepositoryI } from "./repository.interface";

interface CardAccountRepositoryI extends RepositoryI {
    verifyIfCardsPhysicalAlreadyExists(account_id: number): Promise<Object[]>;
    getAllCardsByAccountID(account_id: number): Promise<Object[]>;
}

export {
    CardAccountRepositoryI
};