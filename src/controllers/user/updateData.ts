import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { controllerWrapper, validation } from '../../middlewares'
import { SendError, SendResponse } from '../../helpers'
import UserService from '../../services/UserServices'

const schema = yup.object().shape({
    phone: yup.string().min(1, 'Поле не може бути пустим').max(20, 'Довжина поля з номером телефону не може бути більше 20 символів'),
    firstName: yup.string().trim().min(2, 'Поле не може бути пустим').max(50, 'Довжина поля імені не може бути більше 50 символів'),
    secondName: yup.string(),
    lastName: yup.string().trim().min(2, 'Поле не може бути пустим').max(50, 'Довжина поля імені не може бути більше 50 символів'),
    email: yup.string().trim().min(1, 'Поле не може бути пустим').max(100, 'Довжина поля пошти не може бути більше 100 символів').email('Емеіл не валідний'),
    livingAddress: yup.object().shape({
        street: yup.string(),
        city: yup.string(),
        additionalInfo: yup.string(),
    }),
})

const updateEmail = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайденоt')
    if (!user.isEmailConfirmed) return SendError.UNAUTHORIZED(res, 'Вам потрібно підтвердити email')

    const { phone, firstName, secondName, lastName, email, livingAddress } = req.body

    if (phone && phone.trim() !== user.phone) {
        const registeredUserByPhone = await UserService.findUserByPhone(phone)
        if (registeredUserByPhone) return SendError.CONFLICT(res, 'Користувач з даним номером телефону вже зареєстрований', { errorField: 'phone' })
    }

    if (email && email.toLowerCase().trim() !== user.email) {
        const registeredUserByEmail = await UserService.findUserByEmail(email)
        if (registeredUserByEmail) return SendError.CONFLICT(res, 'Користувач з даною поштою вже зареєстрований', { errorField: 'phone' })
    }

    if (phone) user.phone = phone.trim()
    if (email) user.email = email.toLowerCase().trim()
    if (firstName) user.firstName = firstName.trim()
    if (secondName) user.secondName = secondName.trim()
    if (lastName) user.lastName = lastName.trim()
    if (livingAddress) user.livingAddress = livingAddress

    await user.save()

    return SendResponse.ACCEPTED(res, 'Дані збережено', { user: user.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(updateEmail),
}
