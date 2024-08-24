import { Document } from 'mongoose'

export interface IUser extends Document {
    name: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}