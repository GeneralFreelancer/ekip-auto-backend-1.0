import { Request, Response } from 'express'
import * as yup from 'yup'
import { UserService } from '../../../services/UserServices'
import { fifteenMinutesLimiter } from '../../../api/rateLimiter'
import { SendError, SendResponse } from '../../../helpers'
import { controllerWrapper, validation } from '../../../middlewares'
import { validationPhoneForDDoS } from '../../../utils/utils'
import { UserRole } from '../../../models/UserModel'

const schema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .min(1, 'Email cannot be an empty field')
        .max(100, 'Email should have a maximum length of 100')
        .email('Please, enter a valid email')
        .required('Email is a required field'),
    password: yup
        .string()
        .trim()
        .min(8, 'Password should have a minimum length of 8')
        .max(50, 'Password should have a maximum length of 50')
        .required('Password is a required field'),
})

const registerIntention = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const registeredUser = await UserService.findUserByEmail(email.toLowerCase().trim())

    if (registeredUser) return SendError.CONFLICT(res, 'User with this email already registered', { errorField: 'email' })

    const hashedPassword = await UserService.setHashedPasswordToUserModel(password.trim())

    const user = await UserService.createUser({
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        roles: [UserRole.USER],
    })

    return SendResponse.CREATED(res, 'Verification Email sent successfully', { user: user.getPublicInfo() })
}

export default {
    middleware: [fifteenMinutesLimiter, validationPhoneForDDoS, validation(schema)],
    handler: controllerWrapper(registerIntention),
}
