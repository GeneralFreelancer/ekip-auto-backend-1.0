import express from 'express'
import authRouter from './routes/auth'
import userRouter from './routes/user'
import productRouter from './routes/product'
import exchangeRouter from './routes/exchange'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/exchange', exchangeRouter)

router.get('/', (_, res) => {
    res.send('Backend API')
})

export default router
