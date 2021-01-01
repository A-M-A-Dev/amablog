import express from "express"
import { register, getstring } from "../controllers/user.controller"
const router = express.Router()

router.post('/register', register)
router.get('/', getstring)

export default router