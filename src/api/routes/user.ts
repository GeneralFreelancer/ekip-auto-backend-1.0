import express from 'express'
import UserController from '../../controllers/user'
import filesMiddleware from '../../middlewares/files'

const router = express.Router()

router.get('/', UserController.getUser.middleware, UserController.getUser.handler)

router.put('/user-data', UserController.updateData.middleware, UserController.updateData.handler)

router.put('/favorite', UserController.updateFavoriteProducts.middleware, UserController.updateFavoriteProducts.handler)

router.put('/last-seen', UserController.updateLastSeenProducts.middleware, UserController.updateLastSeenProducts.handler)

router.post('/verification-email', UserController.requestVerificationEmail.middleware, UserController.requestVerificationEmail.handler)

router.post('/call', UserController.requestCall.middleware, UserController.requestCall.handler)

router.post('/partner', filesMiddleware.single('file'), UserController.sendPartnerEmail.middleware, UserController.sendPartnerEmail.handler)

router.delete('/', UserController.removeUser.middleware, UserController.removeUser.handler)

export default router
