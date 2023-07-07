import { Request, Response } from 'express'
import passport from 'passport'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import OrderService from '../../services/OrderService'

const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params
    const order = await OrderService.getOrderById(id)
    if (!order) return SendError.BAD_REQUEST(res, 'Замовлення не знайдено')

    return SendResponse.OK(res, 'Замовлення', { order })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false })],
    handler: controllerWrapper(getOrder),
}
