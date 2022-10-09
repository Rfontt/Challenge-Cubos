import { describe, test, expect, beforeEach } from "@jest/globals";
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

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test('Should make a transaticion - debit type (without negatives values) and change the amount of the account balance', async () => {
        const account: AccountType = {
            account: "123456",
            branch: "123",
            balance: 0,
            people_id: 1
        }
        const transaction: TransactionsType = {
            account,
            description: "Send money to my sister to go to the supermarket",
            type: TransactionsTypeEnum.DEBIT,
            value: 10000
        }

        const changeAccountBalance = {
            ...account,
            balance: 10000
        }

        const transactionCreatedWithNewBalanceToAccount = {
            ...transaction,
            account: changeAccountBalance
        }

        const expected = {
            message: transactionCreatedWithNewBalanceToAccount,
            status: 201
        }

        const spy = jest.spyOn(transactionAdapter, 'debit');
        spy.mockReturnValue(Promise.resolve(transactionCreatedWithNewBalanceToAccount));

        const result = await transactionsUseCase.makeTransaction(transaction, transactionAdapter);
        const resultData: TransactionsType = result.message as TransactionsType;

        expect(result).toStrictEqual(expected);
        expect(resultData.account.balance).toBe(transactionCreatedWithNewBalanceToAccount.account.balance);
    });

    test('Should not accept nagative value', async () => {
        const account: AccountType = {
            account: "123456",
            branch: "123",
            balance: 0,
            people_id: 1
        }
        const transaction: TransactionsType = {
            account,
            description: "Send money to my sister to go to the supermarket",
            type: TransactionsTypeEnum.DEBIT,
            value: -10
        }

        const result = await transactionsUseCase.makeTransaction(transaction, transactionAdapter);

        expect(result).toStrictEqual({
            message: [],
            error: "Value not permitted",
            status: 400
        });
    });

    test('Should not allow making a transaction when the amount is less than the one sent', async () => {
        const transaction: TransactionsType = {
            id: 1,
            account: {
                account: "123345",
                branch: "123",
                people_id: 1,
                balance: 0,
            },
            description: "Send to my mom a little gift",
            type: TransactionsTypeEnum.DEBIT,
            value: 100,
        }

        const account_sender = {
            id: 2,
            account: "123345",
            branch: "123",
            people_id: 1,
            balance: 20,
        }
        jest.clearAllMocks();
        const spy = jest.spyOn(transactionAdapter, 'selectSenderAccountDatails');
        spy.mockClear();

        spy.mockReturnValue(Promise.resolve(account_sender));

        const makeInternalTransaction = await transactionsUseCase.makeInternalTransaction(
            transaction, transactionAdapter, account_sender.id
        );

        expect(makeInternalTransaction.error).toStrictEqual('Internal server error');
    });

    test('Should create a transaction internal', async () => {
        const account: AccountType = {
            account: "123456",
            branch: "123",
            balance: 0,
            people_id: 1
        }
        const transaction: TransactionsType = {
            account,
            description: "Send money to my sister to go to the supermarket",
            type: TransactionsTypeEnum.DEBIT,
            value: 35.10
        }

        const account_sender = 1;

        const expected = {
            id: 1,
            value: transaction.value,
            description: transaction.description,
            account,
            type: TransactionsTypeEnum.DEBIT
        }

        const spy = jest.spyOn(transactionAdapter, 'internal');

        spy.mockReturnValue(Promise.resolve(expected));

        const makeInternalTransaction = await transactionsUseCase.makeInternalTransaction(
            transaction, transactionAdapter, account_sender
        );

        const result = makeInternalTransaction.message;

        expect(result).toStrictEqual(expected);
    });
});