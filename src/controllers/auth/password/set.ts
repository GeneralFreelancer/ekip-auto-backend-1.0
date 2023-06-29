import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { UserService } from '../../../services/UserServices'
import { SendError, SendResponse } from '../../../helpers'
import { controllerWrapper, validation } from '../../../middlewares'

const schema = yup.object().shape({
    password: yup.string().trim().min(8).max(50).required(),
    email: yup.string().trim().max(100).email().required(),
})

const setPassword = async (req: Request, res: Response) => {
    const { password, email } = req.body

    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'User with this token is not exist', { errorId: 'not_authorized' })
    if (user.email) return SendError.BAD_REQUEST(res, 'You have already email. You cant change email on this endpoint', { errorId: 'email_already_set' })
    if (user.password) return SendError.UNAUTHORIZED(res, 'if you want to change password please use another route')

    const emailExist = await UserService.findUserByEmail(email)
    if (emailExist) return SendError.BAD_REQUEST(res, 'User with this email already exists. Please try another email', { errorId: 'user_with_email_already_exists' })

    user.email = email.trim().toLowerCase()

    const hashedPassword = await UserService.setHashedPasswordToUserModel(password)

    user.password = hashedPassword
    await user.save()

    return SendResponse.OK(res, 'You have successfully set password, and email', { user: user.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(setPassword),
}
