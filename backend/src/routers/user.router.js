import express from "express"
import { signup, signin, testAuth } from "../controllers/user.controller.js"
import { authorize } from "../services/auth.service.js"
import { generateMethodNOtAllowed } from "../controllers/default.controller.js"

const router = express.Router()

router.route('/signup')
    .post(signup)
    .all(generateMethodNOtAllowed('POST'))

router.route('/signin')
    .post(signin)
    .all(generateMethodNOtAllowed('POST'))

router.route('/test_auth')
    .get(authorize, testAuth)
    .all(generateMethodNOtAllowed('GET'))

export default router