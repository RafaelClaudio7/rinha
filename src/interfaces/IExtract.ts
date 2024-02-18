export interface IExtract {
  saldo: {
    total: number;
    limite: number;
    dataExtrato: Date;
  };
  ultimasTransacoes: {
    valor: number;
    tipo: "c" | "d";
    descricao: string;
    realizadaEm: Date;
  }[];
}
