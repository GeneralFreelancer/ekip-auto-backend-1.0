import { Request, Response } from 'express'
import rateLimiter from 'express-rate-limit'
import * as yup from 'yup'
import { UserService } from '../../../services/UserServices'
import bcrypt from 'bcryptjs'
import { SendError, SendResponse } from '../../../helpers'
import { controllerWrapper, validation } from '../../../middlewares'

const schema = yup.object().shape({
    email: yup.string().email('Емеіл не валідний').required(),
    password: yup.string().min(6, 'Мінімальна довжина пароля 6 символів').max(50).required(),
})

const loginConfirm = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await UserService.findUserByEmail(email)

    if (!user) return SendError.BAD_REQUEST(res, 'Користувача не знайдено', { errorId: 'user_not_registered' })

    const isPasswordValid = await bcrypt.compare(password.trim(), user.password as string)
    if (!isPasswordValid) return SendError.BAD_REQUEST(res, 'Невірний пароль', { errorId: 'validation_error' })

    const token = UserService.signToken(user)

    return SendResponse.OK(res, 'Success', {
        token,
        user: user.getPublicInfo(),
    })
}

const limiter = rateLimiter({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 100 requests per windowMs
})

export default {
    middleware: [limiter, validation(schema)],
    handler: controllerWrapper(loginConfirm),
}
