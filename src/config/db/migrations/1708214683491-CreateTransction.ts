import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransction1708214683491 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transacoes",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "cliente_id",
            type: "int",
          },
          {
            name: "valor",
            type: "int",
          },
          {
            name: "tipo",
            type: "varchar",
            length: "1",
          },
          {
            name: "descricao",
            type: "varchar",
            length: "10",
          },
          {
            name: "realizadaEm",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCliente",
            referencedTableName: "clientes",
            referencedColumnNames: ["id"],
            columnNames: ["cliente_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transacoes");
  }
}
