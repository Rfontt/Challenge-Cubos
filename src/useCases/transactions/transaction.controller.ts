import { Request, Response } from "express";
import TransactionTypeAdapter from "../../adapters/transaction.adapter";
import { TransactionsType } from "../../interfaces/transactions/transactions.interface";
import GeneralRepository from "../../repositories/general.repository";
import TransactionsUseCase from "./transaction.useCase";

export default class TransactionsController {
    static async create(req: Request, res: Response) {
        const {
            value,
            description,
            type_id
        } = req.body;
        const { accountId } = req.params;

        if (!value || !description || !type_id) {
            return res.status(400).send({ message: "Bad request" });
        }

        const transaction: TransactionsType = {
            account: {
                id: parseInt(accountId, 10),
                branch: "",
                people_id: 0,
                account: ""
            },
            value,
            description,
            type: type_id
        }

        const transactionsUseCase = new TransactionsUseCase(new GeneralRepository());
        const result = await transactionsUseCase.makeTransaction(transaction, new TransactionTypeAdapter());

        if (result.error) {
            return res.status(result.status).send({ message: result.error });
        }

        return res.status(result.status).send({ message: result.message });
    }

    static async makeInternalTransaction(req: Request, res: Response) {
        const {
            value,
            description,
            type_id,
            receiverAccountId
        } = req.body;
        const { accountId } = req.params;

        if (!value || !description || !type_id || !receiverAccountId) {
            return res.status(400).send({ message: "Bad request" });
        }

        const transaction: TransactionsType = {
            account: {
                id: parseInt(receiverAccountId, 10),
                branch: "",
                people_id: 0,
                account: ""
            },
            value,
            description,
            type: type_id
        }

        const transactionsUseCase = new TransactionsUseCase(new GeneralRepository());
        const result = await transactionsUseCase.makeInternalTransaction(
            transaction,
            new TransactionTypeAdapter(),
            parseInt(accountId, 10)
        );

        if (result.error) {
            return res.status(result.status).send({ message: result.error });
        }

        return res.status(result.status).send({ message: result.message });
    }

    static async getBalanceOneAccount(req: Request, res: Response) {
        const { accountId } = req.params;

        const transactionsUseCase = new TransactionsUseCase(new GeneralRepository());
        const result = await transactionsUseCase.getBalanceOneAccount(parseInt(accountId));

        if (result.error) {
            return res.status(result.status).send({ message: result.error });
        }

        return res.status(result.status).send({ message: result.message });
    }

    static async getAllTransactions(req: Request, res: Response) {
        const { accountId } = req.params;

        const transactionsUseCase = new TransactionsUseCase(new GeneralRepository());
        const result = await transactionsUseCase.getTransactions(parseInt(accountId));

        if (result.error) {
            return res.status(result.status).send({ message: result.error });
        }

        return res.status(result.status).send({ message: result.message });
    }
}