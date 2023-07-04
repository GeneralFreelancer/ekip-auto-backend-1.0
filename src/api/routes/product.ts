import express from 'express'
import ProductController from '../../controllers/product'
import filesMiddleware from '../../middlewares/files'

const router = express.Router()

router.get('/', ProductController.getProducts.handler)

router.get('/favorite', ProductController.getFavoriteProducts.middleware, ProductController.getFavoriteProducts.handler)

router.get('/:id', ProductController.getOneProduct.handler)

router.put('/', ProductController.updateProduct.middleware, ProductController.updateProduct.handler)

router.post('/', ProductController.addProducts.middleware, ProductController.addProducts.handler)

router.post('/image', filesMiddleware.single('image'), ProductController.addImage.middleware, ProductController.addImage.handler)

router.delete('/image', ProductController.delImage.middleware, ProductController.delImage.handler)

router.delete('/:id', ProductController.delProduct.middleware, ProductController.delProduct.handler)

export default router
