import express from 'express'
import AdvertisingController from '../../controllers/advertising'
import filesMiddleware from '../../middlewares/files'

const router = express.Router()

router.get('/', AdvertisingController.getAdvertising.handler)

router.put('/', AdvertisingController.updateAdvertising.middleware, AdvertisingController.updateAdvertising.handler)

router.post('/', AdvertisingController.createAdvertising.middleware, AdvertisingController.createAdvertising.handler)

router.post('/image', filesMiddleware.single('image'), AdvertisingController.updateAdvertisingImage.middleware, AdvertisingController.updateAdvertisingImage.handler)

router.delete('/image', AdvertisingController.delImage.middleware, AdvertisingController.delImage.handler)

export default router
