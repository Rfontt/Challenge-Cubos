import { describe, test, expect } from "@jest/globals";
import { ObjectResponse } from "../../src/interfaces/general/message-pattern.interface";
import AccountUseCase from '../../src/useCases/account/account.useCase';
import RepositoryMock from '../mocks/repository.mock';

describe('Validate account useCase - unit tests', () => {
    const repositoryMock = new RepositoryMock();

    test('Should add a - in account string', async () => {
        const accountUseCase = new AccountUseCase(repositoryMock);
        const account = {
            branch: "001",
            account: "20333925",
            people: 1
        }
        const expected = {
            account: "2033392-5",
        }

        const spy = jest.spyOn(accountUseCase, 'accountSettings');
        spy.mockReturnValue(expected.account);

        expect(accountUseCase.accountSettings(account.account)).toStrictEqual(expected.account);
    });

    test('Should create an account when the branch field has only 3 numbers', async () => {
        const accountUseCase = new AccountUseCase(repositoryMock);
        const account = {
            branch: "001",
            account: "2033392-5",
            people_id: 1,
        }

        const expected: ObjectResponse = {
            message: [
                {
                    id: 1,
                    branch: "001",
                    account: "2033392-5",
                    created_at: "2022-08-01T14:30:41.203653",
                    updated_at: "2022-08-01T14:30:41.203653",
                    people_id: 1
                }
            ],
            status: 201
        }

        jest.spyOn(repositoryMock, 'create').mockReturnValue(Promise.resolve(expected.message));

        const result = await accountUseCase.create(account);
        const accountObjectExpected = {
            id: 1,
            branch: "001",
            account: "2033392-5",
            createdAt: "2022-08-01T14:30:41.203653",
            updatedAt: "2022-08-01T14:30:41.203653",
        }

        expect(result).toStrictEqual({
            message: accountObjectExpected,
            status: expected.status
        });
    });

    test('Should return an array of people accounts type when call the method selectWhere', async () => {
        const accountUseCase = new AccountUseCase(repositoryMock);
        const spy = jest.spyOn(accountUseCase, 'selectAccountToOnePeople');

        const expected: ObjectResponse = {
            message: [
                {
                    id: 1,
                    branch: "001",
                    account: "2033392-5",
                    createdAt: "2022-08-01T14:30:41.203653",
                    updatedAt: "2022-08-01T14:30:41.203653",
                    people_id: 1
                }
            ],
            status: 200
        }
          
        spy.mockReturnValue(Promise.resolve(expected));

        expect(await accountUseCase.selectAccountToOnePeople(1)).toStrictEqual(expected);
    });
});