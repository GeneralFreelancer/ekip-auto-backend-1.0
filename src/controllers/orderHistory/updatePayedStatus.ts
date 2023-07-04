import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth, validation } from '../../middlewares'
import { UserRoles } from '../../models/UserModel'
import OrderService from '../../services/OrderService'

const schema = yup.object().shape({
    id: yup.string().required(),
    payed: yup.boolean().required(),
})

const updatePayedStatus = async (req: Request, res: Response) => {
    const { id, payed } = req.body
    const order = await OrderService.updateOrder(id, { payed })

    if (!order) return SendError.BAD_REQUEST(res, 'Помилка оновлення')

    return SendResponse.OK(res, 'Статус оновлено', { order: await order.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN]), validation(schema)],
    handler: controllerWrapper(updatePayedStatus),
}
