import { Request, Response } from "express";
import TransactionService from "../../services/transactions/index";
import { handleError } from "../../helpers/handleError";

export class ExtractController {
  public async getExtract(request: Request, response: Response) {
    const { id } = request.params;

    const transactionService = new TransactionService();

    try {
      const extract = await transactionService.getTransactionsExtract(
        Number(id)
      );

      return response.status(200).json(extract);
    } catch (error) {
      handleError(error as Error, request, response);
    }
  }
}
