import { Request, Response } from 'express'
import passport from 'passport'
import config from '../../config'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import BasketService from '../../services/BasketService'
import XlsxService from '../../services/XlsxService'

const createXlsx = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    const basket = await BasketService.getBasketByUser(user._id)

    if (!basket) return SendError.UNAUTHORIZED(res, 'Кошик пустий')

    const basketInfo = await basket.getPublicInfo()

    if (!basketInfo.products || !basketInfo.products.length) return SendError.BAD_REQUEST(res, 'Кошик пустий')

    await XlsxService.createOrderXlsx(basketInfo.products)

    return SendResponse.OK(res, 'Ексель', { file: config.API_URL + 'excel/order.xlsx' })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false })],
    handler: controllerWrapper(createXlsx),
}
