import express from 'express'
import ExchangeController from '../../controllers/exchange'

const router = express.Router()

router.post('/', ExchangeController.setExchange.middleware, ExchangeController.setExchange.handler)

router.get('/', ExchangeController.getExchange.handler)

export default router
