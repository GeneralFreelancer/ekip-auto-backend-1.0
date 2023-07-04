import { Request, Response } from 'express'
import passport from 'passport'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import ProductService from '../../services/ProductServices'

const getFavoriteProducts = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.NOT_FOUND(res, 'Користувача не знайдено', { errorId: 'not_authorized' })

    const products = await ProductService.getFavoriteProducts(user.favoriteProducts ? user.favoriteProducts : [])

    return SendResponse.OK(res, 'Товари', { products })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false })],
    handler: controllerWrapper(getFavoriteProducts),
}
