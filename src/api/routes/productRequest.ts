import express from 'express'
import ProductRequestController from '../../controllers/productRequest'

const router = express.Router()

router.post('/', ProductRequestController.createProductRequest.middleware, ProductRequestController.createProductRequest.handler)

router.get('/', ProductRequestController.getProductRequests.middleware, ProductRequestController.getProductRequests.handler)

router.put('/', ProductRequestController.updateStatus.middleware, ProductRequestController.updateStatus.handler)

router.delete('/:id', ProductRequestController.deleteProductRequest.middleware, ProductRequestController.deleteProductRequest.handler)

export default router
