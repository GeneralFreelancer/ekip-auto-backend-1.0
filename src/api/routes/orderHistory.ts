import express from 'express'
import OrderHistoryController from '../../controllers/orderHistory'

const router = express.Router()

router.post('/', OrderHistoryController.createOrder.middleware, OrderHistoryController.createOrder.handler)

router.get('/', OrderHistoryController.getOrderHistory.middleware, OrderHistoryController.getOrderHistory.handler)

router.patch('/', OrderHistoryController.updateOrderName.middleware, OrderHistoryController.updateOrderName.handler)

export default router
