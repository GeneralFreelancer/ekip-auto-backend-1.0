import express from 'express'
import BasketController from '../../controllers/basket'

const router = express.Router()

router.post('/', BasketController.createOrUpdateBasket.middleware, BasketController.createOrUpdateBasket.handler)

router.get('/', BasketController.getBasket.middleware, BasketController.getBasket.handler)

export default router