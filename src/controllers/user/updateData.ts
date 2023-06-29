import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { controllerWrapper, validation } from '../../middlewares'
import { SendError, SendResponse } from '../../helpers'
import UserService from '../../services/UserServices'

const schema = yup.object().shape({
    phone: yup
        .string()
        .matches(/^\+[1-9]\d{1,14}$/, 'Phone should have a valid format')
        .min(1, 'Phone number cannot be an empty field')
        .max(15, 'Phone should have a maximum length of 15'),
    firstName: yup.string().trim().min(2, 'FirstName name should have a minimum length of 2').max(50, 'FirstName name should have a maximum length of 50'),
    secondName: yup.string().trim().min(2, 'FirstName name should have a minimum length of 2').max(50, 'FirstName name should have a maximum length of 50'),
    lastName: yup.string().trim().min(2, 'LastName name should have a minimum length of 2').max(50, 'LastName name should have a maximum length of 50'),
    email: yup.string().trim().min(1, 'Email cannot be an empty field').max(100, 'Email should have a maximum length of 100').email('Please, enter a valid email'),
    street: yup.string().trim().min(2, 'LastName name should have a minimum length of 2').max(50, 'LastName name should have a maximum length of 50'),
    city: yup.string().trim().min(2, 'LastName name should have a minimum length of 2').max(50, 'LastName name should have a maximum length of 50'),
    additionalInfo: yup.string().trim().min(2, 'LastName name should have a minimum length of 2'),
})

const updateEmail = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'User with this token is not exist')
    if (!user.isEmailConfirmed) return SendError.UNAUTHORIZED(res, 'You need to confirm email')

    const { phone, firstName, secondName, lastName, email, street, city, additionalInfo } = req.body

    let livingAddress = null

    if (street && city) livingAddress = { street, city, additionalInfo }

    if (phone && phone.trim() !== user.phone) {
        const registeredUserByPhone = await UserService.findUserByPhone(phone)
        if (registeredUserByPhone) return SendError.CONFLICT(res, 'User with this phone already registered', { errorField: 'phone' })
    }

    if (email && email.toLowerCase().trim() !== user.email) {
        const registeredUserByEmail = await UserService.findUserByEmail(email)
        if (registeredUserByEmail) return SendError.CONFLICT(res, 'User with this email already registered', { errorField: 'phone' })
    }

    if (phone) user.phone = phone.trim()
    if (phone) user.email = email.toLowerCase().trim()
    if (firstName) user.phone = firstName.trim()
    if (secondName) user.phone = secondName.trim()
    if (lastName) user.phone = lastName.trim()
    if (livingAddress) user.livingAddress = livingAddress

    await user.save()

    return SendResponse.ACCEPTED(res, 'Email successfully updated', { user: user.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(updateEmail),
}
