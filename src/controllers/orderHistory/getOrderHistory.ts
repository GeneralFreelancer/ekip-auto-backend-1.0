import { Request, Response } from 'express'
import passport from 'passport'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import OrderService from '../../services/OrderService'

const getOrderHistory = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    const orderHistory = await OrderService.getOrderHistory(user._id)

    return SendResponse.OK(res, 'Історія замовлень', { orderHistory })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false })],
    handler: controllerWrapper(getOrderHistory),
}
