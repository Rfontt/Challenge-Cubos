import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { RepositoryI, WhereType } from "../../src/interfaces/repository/repository.interface";
import AccountUseCase from '../../src/useCases/account/account.useCase';

describe('Validate account useCase - unit tests', () => {
    let repositoryMock: RepositoryI;
    
    beforeAll(() => {
        class RepositoryMock implements RepositoryI {
            async selectAll(table: string): Promise<Object> {
                throw new Error("Method not implemented.");
            }

            async selectWhere(table: string, where: WhereType): Promise<Object> {
                throw new Error("Method not implemented.");
            }

            async create(data: Object, table: string): Promise<boolean> {
                await fsPromises.writeFile(
                    path.resolve(__dirname, "..", "mocks", "test.json"),
                    JSON.stringify(data)
                );

                return true;
            }
            
        }

        repositoryMock = new RepositoryMock();
    });

    afterAll(() => {
        fs.unlinkSync(path.resolve(__dirname, "..", "mocks", "test.json"));
    });

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
            people_id: 1
        }

        const result = await accountUseCase.create(account);

        expect(result).toStrictEqual({
            message: "Account created with success",
            status: 201
        });
    });
});