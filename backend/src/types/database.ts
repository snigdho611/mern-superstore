import { ObjectId, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    weight: string;
    type: string;
    image: string;
    price: number;
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    type: string;
    balance: number;
}

export interface ILogin extends Document {
    email: string;
    password: string;
    isAdmin?: boolean;
    isEmailVerified?: boolean;
    emailToken?: string;
    emailTokenExpire?: Date;
    passwordResetToken?: string;
    passwordResetExpire?: Date;
    userId: IUser;
}