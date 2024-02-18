export interface ITransaction {
  valor: number;
  tipo: "c" | "d";
  descricao: string;
}

export interface ITransactionResponse {
  limite: number;
  saldo: number;
}
