import { Router } from "express";
import TransactionController from "./transaction.controller";

const transactionRoute = Router();

transactionRoute.post('/accounts/:accountId/transactions', TransactionController.create);
transactionRoute.post(
    '/accounts/:accountId/transactions/internal',
    TransactionController.makeInternalTransaction
);

transactionRoute.get('/accounts/:accountId/balance', TransactionController.getBalanceOneAccount);
transactionRoute.get('/accounts/:accountId/transactions', TransactionController.getAllTransactions);

export default transactionRoute;