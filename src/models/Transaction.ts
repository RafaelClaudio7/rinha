import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Client from "./Client";

@Entity("transacoes")
class Transaction {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  valor: number;

  @Column()
  tipo: "c" | "d";

  @Column({
    length: 10,
  })
  descricao: string;

  @Column()
  cliente_id: number;

  @Column()
  realizadaEm: Date;

  @ManyToOne(() => Client)
  @JoinColumn({ name: "cliente_id" })
  cliente: Client;
}

export default Transaction;
