import { describe, test, expect, beforeAll } from "@jest/globals";
import { CardTypeEnum } from "../../src/enums/card.enum";
import CardUseCase from "../../src/useCases/cards/card.useCase";
import CardAccountMockRepository from "../mocks/card_account-repository.mock";

describe('Validate card use cases - unit tests', () => {
    const repository = new CardAccountMockRepository();
    const cardUseCase = new CardUseCase(repository);

    test('Should create a card when the cvv contains only 3 size - type virtual', async () => {
        const card = {
            id: 1,
            type_id: CardTypeEnum.VIRTUAL,
            number: '5179 7447 8594 6978',
            cvv: 333,
            created_at: "2022-10-10T13:02:57.935Z",
            updated_at: "2022-10-10T13:02:57.935Z",
        };

        const spy = jest.spyOn(repository, 'create');
        spy.mockReturnValue(Promise.resolve([card]));

        const cardUseCaseResponse = {
            id: 1,
            type: CardTypeEnum.VIRTUAL,
            number: '5179 7447 8594 6978',
            cvv: 333,
            createdAt: "2022-10-10T13:02:57.935Z",
            updatedAt: "2022-10-10T13:02:57.935Z",
        };
        const result = await cardUseCase.create(card, 1);

        expect(result).toStrictEqual({ message: cardUseCaseResponse, status: 201 });
    });
});