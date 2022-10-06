import { describe, test, expect, beforeAll } from "@jest/globals";
import { RepositoryI, WhereType } from "../../src/interfaces/repository/repository.interface";
import AccountSelectsAdapter from '../../src/adapters/account-selects.adapter';
import { AccountType } from "../../src/interfaces/account/account.interface";

describe('Validate account useCase - unit tests', () => {
    test('Should add a - in account string', async () => {
        const accountSelectsAdapters = new AccountSelectsAdapter();
        const spy = jest.spyOn(accountSelectsAdapters, 'selectAllAccounts');

        const expected: AccountType = {
            id: 1,
            branch: "001",
            account: "2033392-5",
            createdAt: "2022-08-01T14:30:41.203653",
            updatedAt: "2022-08-01T14:30:41.203653",
            people_id: 1
        }
          
        // spy.mockReturnValue(expected);
    });
});