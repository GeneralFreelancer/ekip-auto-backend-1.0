import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import BasketService from '../../services/BasketService'
import { EmailService } from '../../services/EmailService'
import OrderService from '../../services/OrderService'
import XlsxService from '../../services/XlsxService'

const schema = yup.object().shape({
    products: yup
        .array()
        .of(
            yup.object().shape({
                product: yup.string().required(),
                quantity: yup.number().required(),
            }),
        )
        .required(),
    comment: yup.string(),
})

const createOrder = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    const { products, comment } = req.body

    const order = await OrderService.createOrder(user._id, products, comment)

    if (!order.products || !order.products.length) return SendError.BAD_REQUEST(res, 'сталася помилка')

    await XlsxService.createOrderXlsx(order.products, String(user._id))

    await EmailService.sendOrderEmail(user.email, user.firstName as string, user.lastName as string, user.phone, user.livingAddress, comment, String(user._id))

    await BasketService.createOrUpdateBasket(user._id, [])

    await XlsxService.removeXlsx(String(user._id))

    return SendResponse.OK(res, 'Замовлення створено', { order })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(createOrder),
}
