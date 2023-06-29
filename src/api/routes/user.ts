import express from 'express'
import UserController from '../../controllers/user'
const router = express.Router()

router.get('/', UserController.getUser.middleware, UserController.getUser.handler)

router.put('/user-data', UserController.updateData.middleware, UserController.updateData.handler)

router.post('/verification-email', UserController.requestVerificationEmail.middleware, UserController.requestVerificationEmail.handler)

router.delete('/', UserController.removeUser.middleware, UserController.removeUser.handler)

export default router
