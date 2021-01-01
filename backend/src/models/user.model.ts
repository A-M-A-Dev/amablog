import mongoose from "mongoose"

const UserScema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: String
})

const User = mongoose.model('User', UserScema)

export default User
