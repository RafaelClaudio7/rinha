import { Request, Response } from "express";
import TransactionService from "../../services/transactions/index";
import { handleError } from "../../helpers/handleError";

export class TransactionController {
  async createTransaction(request: Request, response: Response) {
    const { id } = request.params;
    const { valor, tipo, descricao } = request.body;

    const transactionService = new TransactionService();

    try {
      const transaction = await transactionService.createTransaction(
        {
          valor,
          tipo,
          descricao,
        },
        Number(id)
      );

      return response.status(200).json(transaction);
    } catch (error) {
      handleError(error as Error, request, response);
    }
  }
}
