import express from "express"
import { signup, signin, testAuth } from "../controllers/user.controller"
import { authorize } from "../services/auth.service"

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/test_auth', authorize, testAuth)

export default router