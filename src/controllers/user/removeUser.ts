import { Request, Response } from 'express'
import passport from 'passport'
import UserService from '../../services/UserServices'
import { controllerWrapper } from '../../middlewares'
import { SendError, SendResponse } from '../../helpers'

const removeUser = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    const removedUser = await UserService.deleteUser(user._id)
    if (!removedUser) return SendError.BAD_REQUEST(res, 'Щось пішло не так')

    return SendResponse.OK(res, 'Користувач видалений', { removedUser })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false })],
    handler: controllerWrapper(removeUser),
}
