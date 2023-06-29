import express from 'express'
import UserController from '../../controllers/user'
const router = express.Router()

router.get('/', UserController.getUser.middleware, UserController.getUser.handler)

router.patch('/email', UserController.updateEmail.middleware, UserController.updateEmail.handler)

router.post('/verification-email', UserController.requestUpdateUserEmail.middleware, UserController.requestUpdateUserEmail.handler)

router.delete('/', UserController.removeUser.middleware, UserController.removeUser.handler)

export default router
