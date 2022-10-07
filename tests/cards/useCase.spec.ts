import { describe, test, expect, beforeAll } from "@jest/globals";
import { TypeEnum } from "../../src/enums/card.enum";
import CardUseCase from "../../src/useCases/cards/card.useCase";
import CardAccountMockRepository from "../mocks/card_account-repository.mock";

describe('Validate card use cases - unit tests', () => {
    const repository = new CardAccountMockRepository();
    const cardUseCase = new CardUseCase(repository);

    test('Should create a card when the cvv contains only 3 size - type virtual', async () => {
        const card = {
            type_id: TypeEnum.VIRTUAL,
            number: '5179 7447 8594 6978',
            cvv: 333
        };

        const spy = jest.spyOn(repository, 'create');

        spy.mockReturnValue(Promise.resolve([card]));

        const result = await cardUseCase.create(card, 1);

        expect(result).toStrictEqual({ message: 'Created with success', status: 201 });
    });
});