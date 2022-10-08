import { describe, test, expect } from "@jest/globals";
import PeopleUseCase from '../../src/useCases/people/people.useCase';
import { PeopleType } from "../../src/interfaces/people/people.interface";
import RepositoryMock from "../mocks/repository.mock";
import ValidatorMock from "../mocks/validator.mock";
import EncriptyMock from "../mocks/encripty.mock";

describe('Validate people useCase - unit tests', () => {
    const repositoryMock = new RepositoryMock();
    const peopleUseCase = new PeopleUseCase(repositoryMock);
    const validatorMock = new ValidatorMock();
    const encriptyMock = new EncriptyMock();

    test('Should create a people(test.json file in mocks folders) when document property is a valid cpf', async () => {
        const people: PeopleType = {
            name: "Rfontt",
            document: "77575451889",
            password: "test@@test"
        }
        const expected = {
            id: 1,
            name: people.name,
            created_at: "2022-03-03",
            updated_at: "2022-03-03",
        }

        const spy = jest.spyOn(repositoryMock, 'create');
        spy.mockReturnValue(Promise.resolve([expected]));
        
        const result = await peopleUseCase.create(people, validatorMock, encriptyMock);

        expect(result).toStrictEqual({
            message: expected,
            status: 201
        });
    });

    test('Should not create a people(test.json file in mocks folders) when document property is a invalid cpf', async () => {
        const people: PeopleType = {
            name: "Rfontt",
            document: "123456",
            password: "test@@test"
        }
        const result = await peopleUseCase.create(people, validatorMock, encriptyMock);

        expect(result).toStrictEqual({
            error: "Invalid document",
            message: [],
            status: 401
        });
    });

    test('Should create a people(test.json file in mocks folders) when document property is a valid cnpj', async () => {
        const people: PeopleType = {
            name: "Rfontt technologies",
            document: "00012345678900",
            password: "test@@test"
        }
        const expected = {
            id: 1,
            name: people.name,
            created_at: "2022-03-03",
            updated_at: "2022-03-03",
        }

        const spy = jest.spyOn(repositoryMock, 'create');
        spy.mockReturnValue(Promise.resolve([expected]));

        const result = await peopleUseCase.create(people, validatorMock, encriptyMock);

        expect(result).toStrictEqual({
            message: expected,
            status: 201
        });
    });

    test('Should not create a people(test.json file in mocks folders) when document property is a invalid cnpj', async () => {
        const people: PeopleType = {
            name: "Rfontt",
            document: "0001234567890023456",
            password: "test@@test"
        }
        const result = await peopleUseCase.create(people, validatorMock, encriptyMock);

        expect(result).toStrictEqual({
            error: "Invalid document",
            message: [],
            status: 401
        });
    });

});