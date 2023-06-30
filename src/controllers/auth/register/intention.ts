import { Request, Response } from 'express'
import * as yup from 'yup'
import { UserService } from '../../../services/UserServices'
import { fifteenMinutesLimiter } from '../../../api/rateLimiter'
import { SendError, SendResponse } from '../../../helpers'
import { controllerWrapper, validation } from '../../../middlewares'
import { UserRole } from '../../../models/UserModel'
import { generateRandomNumbers } from '../../../utils/utils'

const schema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .min(1, 'Email не може бути пустим')
        .max(100, 'Email не може бути довжиною більше 100')
        .email('Внесіть валідний email')
        .required('Email обовязкове поле'),
    password: yup.string().trim().min(8, 'Мінімальна довжина пароля 8 символів').max(50, 'Максимальна довжина пароля 50 символів').required('Пароль обовязкове поле'),
})

const registerIntention = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const registeredUser = await UserService.findUserByEmail(email.toLowerCase().trim())

    if (registeredUser) return SendError.CONFLICT(res, 'Користувач з даною поштою вже зареєстрований', { errorField: 'email' })

    const hashedPassword = await UserService.setHashedPasswordToUserModel(password.trim())

    const code = generateRandomNumbers(6)

    // await EmailService.sendEmailToUserWithCodeToChangeEmailInProfile(email, user.firstName ? user.firstName : 'User', code)
    const user = await UserService.createUser({
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        roles: [UserRole.USER],
        codeToVerifyEmail: code,
    })

    return SendResponse.CREATED(res, 'На вашу пошту надіслано лист для підтвердження', { user: user.getPublicInfo() })
}

export default {
    middleware: [fifteenMinutesLimiter, validation(schema)],
    handler: controllerWrapper(registerIntention),
}
