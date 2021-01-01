import express from "express"
import jwt from "jsonwebtoken";
import { User } from "../models/user.model"

const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

export const signup = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body
    
    if (!email || !password) return res.status(400).json({
            message: "request length should be 2."
        })

    if (User.exists({ email: email })) res.status(409).json({
            message: "email already exists."
        })
    
    if (!emailReg.test(email)) return res.status(400).json({
            message: "field `email` is not valid."
        })
    
    if (password.length <= 5) return res.status(400).json({
            message: "field `password` length should be gt 5."
        })

    const user = new User({
        email: email,
        password: password,
    })
    await user.save()

    res.status(200).json({
        message: "user has been created."
    })
}

export const signin = (req: express.Request, res: express.Response) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({
        message: "request length should be 2."
    })

    if (!emailReg.test(email)) return res.status(400).json({
        message: "field `email` is not valid."
    })

    let user = User.find({
        email: email,
        password: password
    })

    if (!user) {
        return res.status(401).json({
            message: "wrong email or password"
        })
    }

    const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: "1h"
    })

    res.status(200).json({
        token: `Bearer ${accessToken}`
    })
}
