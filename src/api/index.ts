import express from 'express'
import authRouter from './routes/auth'
import userRouter from './routes/user'
import productRouter from './routes/product'
import exchangeRouter from './routes/exchange'
import basketRouter from './routes/basket'
import orderHistory from './routes/orderHistory'
import productRequest from './routes/productRequest'
import advertising from './routes/advertising'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/exchange', exchangeRouter)
router.use('/basket', basketRouter)
router.use('/order-history', orderHistory)
router.use('/product-request', productRequest)
router.use('/advertising', advertising)

router.get('/', (_, res) => {
    res.send('Backend API')
})

export default router
