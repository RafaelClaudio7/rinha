import { Router } from "express";
import { TransactionController } from "../controllers/transaction";
import { ExtractController } from "../controllers/extract";

const router = Router();

const transactionController = new TransactionController();
const extractController = new ExtractController();

router.post(
  "/clientes/:id/transacoes",
  transactionController.createTransaction
);

router.get("/clientes/:id/extrato", extractController.getExtract);

export default router;
