import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import UserModel from '../../models/UserModel'
import { controllerWrapper, validation } from '../../middlewares'
import { SendError, SendResponse } from '../../helpers'

const schema = yup.object().shape({
    email: yup.string().trim().email().min(3).required(),
})

const updateEmail = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'User with this token is not exist')

    const email = req.body.email.trim().toLowerCase()
    if (email === user.email) return SendError.NOT_ACCEPTABLE(res, 'Email doesn`t changed')

    const userInDb = await UserModel.findOne({ email })
    if (userInDb) return SendError.CONFLICT(res, 'User with this email already exist')

    user.email = email
    await user.save()

    return SendResponse.ACCEPTED(res, 'Email successfully updated', { user: user.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(updateEmail),
}
