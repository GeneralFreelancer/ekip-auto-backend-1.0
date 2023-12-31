import express from 'express'
import BasketController from '../../controllers/basket'

const router = express.Router()

router.post('/', BasketController.createOrUpdateBasket.middleware, BasketController.createOrUpdateBasket.handler)

router.get('/', BasketController.getBasket.middleware, BasketController.getBasket.handler)

router.put('/', BasketController.addProductInBasket.middleware, BasketController.addProductInBasket.handler)

router.get('/xlsx', BasketController.createXlsx.middleware, BasketController.createXlsx.handler)

export default router
