import { Router } from "express";
import tokenAuthorization from "../../middlewares/token-user.middleware";
import TransactionController from "./transaction.controller";

const transactionRoute = Router();

transactionRoute.post(
    '/accounts/:accountId/transactions',
    tokenAuthorization, TransactionController.create
);
transactionRoute.post(
    '/accounts/:accountId/transactions/internal',
    tokenAuthorization,
    TransactionController.makeInternalTransaction
);

transactionRoute.get(
    '/accounts/:accountId/balance',
    tokenAuthorization,
    TransactionController.getBalanceOneAccount
);
transactionRoute.get(
    '/accounts/:accountId/transactions',
    tokenAuthorization,
    TransactionController.getAllTransactions
);

transactionRoute.post(
    '/accounts/:accountId/transactions/:transactionId/revert',
    tokenAuthorization,
    TransactionController.revert
);

export default transactionRoute;