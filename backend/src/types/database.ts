import { ObjectId, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    weight: string;
    type: string;
    image: string;
    price: number;
}