import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
    email: string,
    password: string
}

const UserScema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }
})

export const User = mongoose.model<IUser>('User', UserScema)

