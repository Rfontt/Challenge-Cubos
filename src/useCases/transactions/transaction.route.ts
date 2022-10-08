import { Router } from "express";
import TransactionController from "./transaction.controller";

const transactionRoute = Router();

transactionRoute.post('/accounts/:accountId/transactions', TransactionController.create);

export default transactionRoute;