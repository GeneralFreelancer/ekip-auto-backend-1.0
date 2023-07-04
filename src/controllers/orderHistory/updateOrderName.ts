import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import OrderService from '../../services/OrderService'

const schema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
})

const updateOrderName = async (req: Request, res: Response) => {
    const { id, name } = req.body
    const order = await OrderService.updateOrder(id, { name })

    if (!order) return SendError.BAD_REQUEST(res, 'Помилка оновлення')

    return SendResponse.OK(res, 'Назву оновлено', { order: await order.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(updateOrderName),
}
