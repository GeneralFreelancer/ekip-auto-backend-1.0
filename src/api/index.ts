import express from 'express'
import authRouter from './routes/auth'
import userRouter from './routes/user'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)

router.get('/', (_, res) => {
    res.send('Backend API')
})

export default router
