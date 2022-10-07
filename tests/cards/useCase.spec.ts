import { describe, test, expect, beforeAll } from "@jest/globals";
import { TypeEnum } from "../../src/enums/card.enum";
import CardUseCase from "../../src/useCases/cards/card.useCase";
import CardAccountMockRepository from "../mocks/card_account-repository.mock";

describe('Validate card use cases - unit tests', () => {
    const cardUseCase = new CardUseCase(new CardAccountMockRepository());

    test('Should create a card when the cvv contains only 3 size - type virtual', async () => {
        const card = {
            type_id: TypeEnum.VIRTUAL,
            number: '5179 7447 8594 6978',
            cvv: 333
        };

        const result = await cardUseCase.create(card, 1);
    });
});