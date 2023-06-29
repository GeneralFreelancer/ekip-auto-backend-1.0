import { Request, Response } from 'express'
import passport from 'passport'
import UserService from '../../services/UserServices'
import { controllerWrapper } from '../../middlewares'
import { SendError, SendResponse } from '../../helpers'

const removeUser = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'User with this token is not exist')

    const removedUser = await UserService.deleteUser(user._id)
    if (!removedUser) return SendError.BAD_REQUEST(res, 'Something went wrong')

    return SendResponse.OK(res, 'User deleted successfully', { removedUser })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false })],
    handler: controllerWrapper(removeUser),
}
