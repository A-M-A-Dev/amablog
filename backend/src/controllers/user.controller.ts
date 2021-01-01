import express from "express"
import User from "../models/user.model"

export const register = async (req: express.Request, res: express.Response) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    })

    await user.save()

    res.status(200)
}
