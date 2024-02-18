import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import "./config/db/connect";
import "reflect-metadata";
import router from "./routes";

dotenv.config();

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = process.env.NODE_PORT ? parseInt(process.env.NODE_PORT) : port;

    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.app.use(router);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

const app = new App(5000);

app.listen();
