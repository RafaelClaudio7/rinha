import { DataSource } from "typeorm";
// import Client from "./src/models/Client";
// import Transaction from "./src/models/Transaction";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "123456",
  database: "rinha",
  synchronize: true,
  logging: true,
  entities: ["src/models/*.ts"],
  migrations: ["src/config/db/migrations/*.ts"],
  subscribers: [],
});

export { AppDataSource };
