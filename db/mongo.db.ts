import { DB } from "../interfaces/db.interface"
import { Auto } from "../types/auto.type";
import mongoose from "mongoose";
import { AutoModel } from "./mongo_models/auto.model";
import { cObject } from "../interfaces/custom_object.interface";

export class MongoDB implements DB {
    private connectionUrl: string
    constructor(connection: string) {
        this.connectionUrl = connection
    } 

    async connect() {
        mongoose.set('strictQuery', false);
        await mongoose.connect(this.connectionUrl)
        return true
    } 

    async list(orderBy: string, orderType: string) {
        const params: cObject = {}
        params[orderBy] = orderType === 'asc' ? 1 : -1
        let list: Array<Auto> = await AutoModel.aggregate([{ $sort: params }])
        return list
    }

    async add (payload: Auto) {
        await AutoModel.create(payload)
        return true
    }

    async edit(id: string, payload: Auto) {
        await AutoModel.updateOne({ _id: id }, payload)
        return true
    }

    async del(id: string) {
        await AutoModel.deleteOne({ _id: id })
        return true
    }
}