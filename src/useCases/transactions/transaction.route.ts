import { Router } from "express";
import TransactionController from "./transaction.controller";

const transactionRoute = Router();

transactionRoute.post('/accounts/:accountId/transactions', TransactionController.create);
transactionRoute.post(
    '/accounts/:accountId/transactions/internal',
    TransactionController.makeInternalTransaction
);

export default transactionRoute;