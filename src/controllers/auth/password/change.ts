import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { UserService } from '../../../services/UserServices'
import { SendError, SendResponse } from '../../../helpers'
import { controllerWrapper, validation } from '../../../middlewares'

const schema = yup.object().shape({
    password: yup.string().min(8).max(50).required(),
})

const changePassword = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'User with this token is not exist', { errorId: 'user_not_authorized' })

    const { password } = req.body

    const hashedPassword = await UserService.setHashedPasswordToUserModel(password)
    user.password = hashedPassword
    await user.save()

    return SendResponse.OK(res, 'You have successfully changed password', {})
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(changePassword),
}
