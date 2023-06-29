import express from 'express'
import LoginController from '../../controllers/auth/login'
import RegisterController from '../../controllers/auth/register'
import PasswordController from '../../controllers/auth/password'

const router = express.Router()

router.post('/login', LoginController.loginConfirm.middleware, LoginController.loginConfirm.handler)

router.post('/register', RegisterController.registerIntention.middleware, RegisterController.registerIntention.handler)
router.post('/register/confirm', RegisterController.registerConfirm.middleware, RegisterController.registerConfirm.handler)

router.post('/password/change', PasswordController.changePassword.middleware, PasswordController.changePassword.handler)

export default router
