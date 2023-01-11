import { DB } from "../interfaces/db.interface";
import { FileDb } from "./file.db";
import { MongoDB } from "./mongo.db";

const dbs = {
  file: FileDb,
  mongo: MongoDB,
};

export default function db(type: string): DB | null {
  if (!(type in dbs)) {
    throw new Error("db type is not exist");
  }
  if (type === "file") {
    return new dbs.file(process.env.DB_FILE || "");
  }
  if (type === "mongo") {
    return new dbs.mongo(process.env.DB_MONGO || "");
  }
  return null;
}
