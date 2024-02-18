import { AppDataSource } from "../../../data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to pg database");
  })
  .catch((err) => console.log(err));
