import { describe, test, expect } from "@jest/globals";
import RepositoryMock from '../mocks/repository.mock';
import TransactionsUseCase from '../../src/useCases/transactions/transaction.useCase';
import { TransactionsType } from "../../src/interfaces/transactions/transactions.interface";
import { TransactionsTypeEnum } from "../../src/enums/transation.enum";
import TransactionTypeAdapter from '../../src/adapters/transaction.adapter'
import { AccountType } from "../../src/interfaces/account/account.interface";

describe('Validate transactions useCase - unit tests', () => {
    const repositoryMock = new RepositoryMock();
    const transactionsUseCase = new TransactionsUseCase(repositoryMock);
    const transactionAdapter = new TransactionTypeAdapter();

    test('Should make a transaticion - debit type (without negatives values)', async () => {
        const account: AccountType = {
            account: "123456",
            branch: "123",
            people_id: 1
        }
        const transaction: TransactionsType = {
            account,
            description: "Send money to my sister to go to the supermarket",
            type: TransactionsTypeEnum.DEBIT,
            value: 10000
        }

        const expected = {
            message: transaction,
            status: 201
        }

        const spy = jest.spyOn(transactionAdapter, 'debit');
        spy.mockReturnValue(Promise.resolve(transaction));

        const result = await transactionsUseCase.makeTransaction(transaction, transactionAdapter);

        expect(result).toStrictEqual(expected);
    });
});