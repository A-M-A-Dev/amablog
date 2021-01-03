import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

export const authorize = (req, res, next) => {
    let authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(403).json({
            message: "No authorization token provided"
        })
    }

    let accessToken = authHeader.split(' ')[1]

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid authorization token"
            })
        }
        const users = await User.find({
            email: user.email
        })
        req.user = users[0]
        next()
    })
}
