import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clientes")
class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    length: 80,
  })
  nome: string;

  @Column()
  limite: number;

  @Column()
  saldo: number;
}

export default Client;
