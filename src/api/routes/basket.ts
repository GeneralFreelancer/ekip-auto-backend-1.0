import express from 'express'
import BasketController from '../../controllers/basket'

const router = express.Router()

router.post('/', BasketController.createOrUpdateBasket.middleware, BasketController.createOrUpdateBasket.handler)

// router.get('/', ExchangeController.getExchange.handler)

export default router
