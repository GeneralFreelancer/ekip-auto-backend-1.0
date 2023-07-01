import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import UserService from '../../services/UserServices'
import { controllerWrapper, validation } from '../../middlewares'
import { SendError, SendResponse } from '../../helpers'

const schema = yup.object().shape({
    productId: yup.string().required(),
})

const updateFavoriteProducts = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    const { productId } = req.body

    const updatedUser = await UserService.updateFavoriteProducts(user, productId)

    return SendResponse.OK(res, 'Юзер оновлено', { user: updatedUser })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(updateFavoriteProducts),
}
