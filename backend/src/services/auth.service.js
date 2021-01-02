import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

export const authorize = (req, res, next) => {
    // let accessToken = req.cookies.jwt
    let accessToken = req.headers.authorization.split(' ')[1]

    if (!accessToken) {
        return res.status(403).json({
            message: "No authorization token provided"
        })
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid authorization token"
            })
        }

        req.user = User.find(user)[0]
        next()
    })
}
