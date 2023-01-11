import { DB } from "../interfaces/db.interface";
import { Auto } from "../types/auto.type";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { v4 as uuid } from "uuid";
import AsyncLock from "async-lock";

const lock = new AsyncLock({
  timeout: 5000,
});

export class FileDb implements DB {
  private file: string;
  constructor(connection: string) {
    this.file = connection;
  }

  async connect() {
    if (existsSync(this.file)) {
      return true;
    }
    console.warn(new Date(), 'file', this.file, 'does not exist')
    return false;
  }

  async list(orderBy: string, orderType: string) {
    let list: Array<Auto> = JSON.parse(readFileSync(this.file).toString());
    list = list.sort((a: any, b: any) => {
      if (a[orderBy] > b[orderBy]) {
        if (orderType === "asc") {
          return 1;
        } else {
          return -1;
        }
      }
      if (a[orderBy] < b[orderBy]) {
        if (orderType === "asc") {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
    return list;
  }

  async add(payload: Auto) {
    let list: Array<Auto> = JSON.parse(readFileSync(this.file).toString());
    let result = false;
    await lock.acquire("auto", () => {
      list.push({
        id: uuid(),
        ...payload,
      });
      writeFileSync(this.file, JSON.stringify(list));
      result = true;
    });
    return result;
  }

  async edit(id: string, payload: Auto) {
    let list: Array<Auto> = JSON.parse(readFileSync(this.file).toString());
    let index = list.findIndex((item) => {
      return item.id === id;
    });
    let result = false;
    if (index === -1) {
      console.warn(`cant find element id ${id}`);
      return result;
    }
    const elem = list[index];
    await lock.acquire("auto", () => {
      list[index] = {
        ...elem,
        ...payload,
      };
      writeFileSync(this.file, JSON.stringify(list));
      result = true;
    });
    return result;
  }

  async del(id: string) {
    let list: Array<Auto> = JSON.parse(readFileSync(this.file).toString());
    let result = false;
    let index = list.findIndex((item) => {
      return item.id === id;
    });
    if (index === -1) {
      console.warn(`cant find element id ${id}`);
      return result;
    }
    await lock.acquire("auto", () => {
      list.splice(index, 1);
      writeFileSync(this.file, JSON.stringify(list));
      result = true;
    });
    return result;
  }
}
