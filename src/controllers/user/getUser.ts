import { Request, Response } from 'express'
import passport from 'passport'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'

const getUser = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.NOT_FOUND(res, 'Користувача не знайдено', { errorId: 'not_authorized' })

    return SendResponse.OK(res, 'User', { user: user.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false })],
    handler: controllerWrapper(getUser),
}
