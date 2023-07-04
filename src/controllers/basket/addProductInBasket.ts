import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import BasketService from '../../services/BasketService'

const schema = yup.object().shape({
    product: yup.string().required(),
    number: yup.number().required(),
})

const addProductInBasket = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    const { product, number } = req.body

    const basket = await BasketService.addProductInBasket(user._id, { product, number })

    return SendResponse.OK(res, 'Товари в кошику оновлено', { basket })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(addProductInBasket),
}
