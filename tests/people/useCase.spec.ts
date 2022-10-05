import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { RepositoryI } from "../../src/interfaces/repository.interface";
import PeopleUseCase from '../../src/useCases/people/people.useCase';
import { PeopleType } from "../../src/interfaces/people.interface";
import { ValidatorI } from "../../src/interfaces/validator.interface";

describe('Validate people useCase - unit tests', () => {
    let databaseMock: RepositoryI;
    let validatorMock: ValidatorI;

    beforeAll(() => {
        class DataBaseMock implements RepositoryI {
            async create(data: Object): Promise<void> {
                await fsPromises.writeFile(
                    path.resolve(__dirname, "..", "mocks", "test.json"),
                    JSON.stringify(data)
                );
            }
        }

        class ValidatorMock implements ValidatorI {
            async cpf(document: string): Promise<boolean> {
                if (document.length === 11) {
                    return true;
                } else {
                    return false;
                }
            }
            async cnpj(document: string): Promise<boolean> {
                if (document.length === 14) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        databaseMock = new DataBaseMock();
        validatorMock = new ValidatorMock();
    });

    afterAll(() => {
        fs.unlinkSync(path.resolve(__dirname, "..", "mocks", "test.json"));
    })

    test('Should create a people(test.json file in mocks folders) when document property is a valid cpf', async () => {
        const people: PeopleType = {
            name: "Rfontt",
            document: "77575451889",
            password: "test@@test"
        }

        const peopleUseCase = new PeopleUseCase(databaseMock);
        const result = await peopleUseCase.create(people, validatorMock);

        expect(result).toStrictEqual(true);
    });

    test('Should not create a people(test.json file in mocks folders) when document property is a invalid cpf', async () => {
        const people: PeopleType = {
            name: "Rfontt",
            document: "123456",
            password: "test@@test"
        }

        const peopleUseCase = new PeopleUseCase(databaseMock);
        const result = await peopleUseCase.create(people, validatorMock);

        expect(result).toStrictEqual(false);
    });
});