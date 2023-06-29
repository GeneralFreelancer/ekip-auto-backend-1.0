import express from 'express'
import LoginController from '../../controllers/auth/login'
import RegisterController from '../../controllers/auth/register'
// import PasswordController from '../../controllers/auth/password'

const router = express.Router()

router.post('/login/confirm', LoginController.loginConfirm.middleware, LoginController.loginConfirm.handler)

router.post('/register/intention', RegisterController.registerIntention.middleware, RegisterController.registerIntention.handler)
// router.post('/register/confirm', RegisterController.registerConfirm.middleware, RegisterController.registerConfirm.handler)

// router.put('/password/set', PasswordController.setPassword.middleware, PasswordController.setPassword.handler)
// router.put('/password/renew', PasswordController.renewPassword.middleware, PasswordController.renewPassword.handler)
// router.post('/password/confirm', PasswordController.confirmPassword.middleware, PasswordController.confirmPassword.handler)
// router.put('/password/change', PasswordController.changePassword.middleware, PasswordController.changePassword.handler)
// router.post('/password/recover', PasswordController.recoverPassword.middleware, PasswordController.recoverPassword.handler)

export default router
