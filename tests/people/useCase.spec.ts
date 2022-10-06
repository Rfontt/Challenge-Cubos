import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { RepositoryI, WhereType } from "../../src/interfaces/repository/repository.interface";
import PeopleUseCase from '../../src/useCases/people/people.useCase';
import { PeopleType } from "../../src/interfaces/people/people.interface";
import { ValidatorI } from "../../src/interfaces/adapters/validator.interface";
import { EncriptyI } from "../../src/interfaces/adapters/encripty.interface";

describe('Validate people useCase - unit tests', () => {
    let repositoryMock: RepositoryI;
    let validatorMock: ValidatorI;
    let encriptyMock: EncriptyI;

    beforeAll(() => {
        class RepositoryMock implements RepositoryI {
            selectAll(table: string): Promise<Object[]> {
                throw new Error("Method not implemented.");
            }
            selectWhere(table: string, where: WhereType): Promise<Object[]> {
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

        class ValidatorMock implements ValidatorI {
            cpf(document: string): boolean {
                if (document.length === 11) {
                    return true;
                } else {
                    return false;
                }
            }
            cnpj(document: string): boolean {
                if (document.length === 14) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        class EncriptyMock implements EncriptyI {
            async hash(value: string, size: number): Promise<string> {
                return value + Date.now + size;
            }
        }

        repositoryMock = new RepositoryMock();
        validatorMock = new ValidatorMock();
        encriptyMock = new EncriptyMock(); 
    });

    afterAll(() => {
        fs.unlinkSync(path.resolve(__dirname, "..", "mocks", "test.json"));
    });

    test('Should create a people(test.json file in mocks folders) when document property is a valid cpf', async () => {
        const people: PeopleType = {
            name: "Rfontt",
            document: "77575451889",
            password: "test@@test"
        }

        const peopleUseCase = new PeopleUseCase(repositoryMock);
        const result = await peopleUseCase.create(people, validatorMock, encriptyMock);

        expect(result).toStrictEqual({
            message: "People created with success",
            status: 201
        });
    });

    test('Should not create a people(test.json file in mocks folders) when document property is a invalid cpf', async () => {
        const people: PeopleType = {
            name: "Rfontt",
            document: "123456",
            password: "test@@test"
        }

        const peopleUseCase = new PeopleUseCase(repositoryMock);
        const result = await peopleUseCase.create(people, validatorMock, encriptyMock);

        expect(result).toStrictEqual({
            message: "Invalid document",
            status: 401
        });
    });

    test('Should create a people(test.json file in mocks folders) when document property is a valid cnpj', async () => {
        const people: PeopleType = {
            name: "Rfontt technologies",
            document: "00012345678900",
            password: "test@@test"
        }

        const peopleUseCase = new PeopleUseCase(repositoryMock);
        const result = await peopleUseCase.create(people, validatorMock, encriptyMock);

        expect(result).toStrictEqual({
            message: "People created with success",
            status: 201
        });
    });

    test('Should not create a people(test.json file in mocks folders) when document property is a invalid cnpj', async () => {
        const people: PeopleType = {
            name: "Rfontt",
            document: "0001234567890023456",
            password: "test@@test"
        }

        const peopleUseCase = new PeopleUseCase(repositoryMock);
        const result = await peopleUseCase.create(people, validatorMock, encriptyMock);

        expect(result).toStrictEqual({
            message: "Invalid document",
            status: 401
        });
    });

});