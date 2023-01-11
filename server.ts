import * as dotenv from "dotenv";
dotenv.config();

import db from "./db";
import express from "express";
import { mainRouter } from "./routes";
import { json } from "body-parser";
import { DB } from "./interfaces/db.interface";
const PORT = 3000;
const app = express();

const database = db(process.env.DB_TYPE || "file");
if (!database) {
  throw new Error("cant make db");
}

declare global {
  namespace Express {
    interface Request {
      db: DB;
    }
  }
}

database.connect().then((isConnected) => {
  if (!isConnected) {
    console.warn(new Date(), `db is not connect`);
    return;
  }
  app.use(json());
  app.use((req, res, next) => {
    console.log(new Date(), req.url, req.query, req.params, req.body);
    req.db = database;
    next();
  });
  app.use(mainRouter);
  app.listen(PORT, () => {
    console.log(new Date(), `server run on port ${PORT}`);
  });
});
