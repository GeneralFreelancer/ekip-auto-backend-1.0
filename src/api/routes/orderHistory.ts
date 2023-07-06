import express from 'express'
import OrderHistoryController from '../../controllers/orderHistory'

const router = express.Router()

router.post('/', OrderHistoryController.createOrder.middleware, OrderHistoryController.createOrder.handler)

router.get('/', OrderHistoryController.getOrderHistory.middleware, OrderHistoryController.getOrderHistory.handler)

router.put('/name', OrderHistoryController.updateOrderName.middleware, OrderHistoryController.updateOrderName.handler)

router.put('/payed', OrderHistoryController.updatePayedStatus.middleware, OrderHistoryController.updatePayedStatus.handler)

export default router
