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
    emailToken?: string | null;
    emailTokenExpire?: Date | null;
    passwordResetToken?: string | null;
    passwordResetExpire?: Date | null;
    userId: IUser | ObjectId;
}