import { Request, Response } from 'express'
import passport from 'passport'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import BasketService from '../../services/BasketService'

const getBasket = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    let basket = null
    basket = await BasketService.getBasketByUser(user._id)

    if (!basket) basket = await BasketService.createBasket(user._id, [])

    return SendResponse.OK(res, 'Кошик', { basket })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false })],
    handler: controllerWrapper(getBasket),
}
