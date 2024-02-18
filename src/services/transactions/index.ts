import {
  ITransaction,
  ITransactionResponse,
} from "../../interfaces/ITransaction";
import { AppDataSource } from "../../../data-source";
import { IExtract } from "../../interfaces/IExtract";
import { NotFoundError, UnprocessableEntity } from "../../helpers/errors";

class TransactionsService {
  public async createTransaction(
    data: ITransaction,
    clientId: number
  ): Promise<ITransactionResponse> {
    const clientsRepository = AppDataSource.getRepository("clientes");
    const transactionsRepository = AppDataSource.getRepository("transacoes");

    const client = await clientsRepository.findOne({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundError("Client not found");
    }

    if (data.tipo === "d") {
      if (client.saldo < data.valor) {
        throw new UnprocessableEntity("Insufficient funds");
      }
    }

    if (data.tipo === "c") {
      client.limite -= data.valor;
    } else {
      client.saldo -= data.valor;
    }

    await clientsRepository.save(client);
    await transactionsRepository.save({
      ...data,
      cliente_id: clientId,
      realizadaEm: new Date(),
    });

    return {
      limite: client.limite,
      saldo: client.saldo,
    };
  }

  public async getTransactionsExtract(clientId: number): Promise<IExtract> {
    const clientsRepository = AppDataSource.getRepository("clientes");
    const transactionsRepository = AppDataSource.getRepository("transacoes");

    const client = await clientsRepository.findOne({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundError("Client not found");
    }

    const transactions = await transactionsRepository.find({
      where: { cliente_id: clientId },
    });

    const transactionsFormatted = transactions.map((transaction) => {
      return {
        valor: transaction.valor,
        tipo: transaction.tipo,
        descricao: transaction.descricao,
        realizadaEm: transaction.realizadaEm,
      };
    });

    return {
      saldo: {
        total: client.saldo,
        dataExtrato: new Date(),
        limite: client.limite,
      },
      ultimasTransacoes: transactionsFormatted,
    };
  }
}
export default TransactionsService;
