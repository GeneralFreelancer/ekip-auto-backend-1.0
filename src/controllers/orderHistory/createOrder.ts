import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import BasketService from '../../services/BasketService'
import OrderService from '../../services/OrderService'

const schema = yup.object().shape({
    products: yup
        .array()
        .of(
            yup.object().shape({
                product: yup.string().required(),
                number: yup.number().required(),
            }),
        )
        .required(),
})

const createOrder = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    const { products } = req.body

    const order = await OrderService.createOrder(user._id, products)

    await BasketService.createOrUpdateBasket(user._id, [])

    return SendResponse.OK(res, 'Замовлення створено', { order })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(createOrder),
}
