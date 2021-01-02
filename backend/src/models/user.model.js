import mongoose from "mongoose"

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

export const User = mongoose.model('User', UserScema)
