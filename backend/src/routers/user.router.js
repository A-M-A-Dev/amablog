import express from "express"
import { signup, signin, testAuth } from "../controllers/user.controller.js"
import { authorize } from "../services/auth.service.js"
import { generateMethodNotAllowed } from "../controllers/default.controller.js"

const router = express.Router()

router.route('/signup')
    .post(signup)
    .all(generateMethodNotAllowed('POST'))

router.route('/signin')
    .post(signin)
    .all(generateMethodNotAllowed('POST'))

router.route('/test_auth')
    .get(authorize, testAuth)
    .all(generateMethodNotAllowed('GET'))

export default router