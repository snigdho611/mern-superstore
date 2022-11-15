export interface MongoObject {
  _id: string;
}

export interface Product extends MongoObject {
  id: string;
  name: string;
  description: string;
  weight: string;
  type: string;
  image: any;
  price: string | number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Login extends MongoObject {
  email: string;
  password: string;
  isAdmin: boolean;
  isEmailVerified: true;
  emailToken: string | null;
  emailTokenExpire: string | null;
  userId: string;
  passwordExpire: string | null | Date;
  passwordResetToken: string | null | Date;
}

export interface User extends MongoObject {
  firstName: string;
  lastName: string;
  phone: string;
  balance: number;
}

export interface Response {
  success: boolean;
  loading: boolean;
  message: string | null;
}
