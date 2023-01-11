import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const ObjectId = mongoose.SchemaTypes.ObjectId

export const AutoSchema = new Schema({
    // id: ObjectId,
    brand: String,
    name: String,
    year: Number,
    price: Number
  });

export const AutoModel = mongoose.model('auto', AutoSchema)