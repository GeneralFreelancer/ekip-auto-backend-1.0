import { Request, Response } from 'express'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import { generateRandomNumbers } from '../../utils/utils'
import { EmailService } from '../../services/EmailService'
import UserService from '../../services/UserServices'

const schema = yup.object().shape({
    email: yup.string().trim().min(1, 'Поле не може бути пустим').max(100, 'Довжина поля пошти не може бути більше 100 символів').email('Емеіл не валідний'),
})

const requestVerificationEmail = async (req: Request, res: Response) => {
    const { email } = req.body

    const user = await UserService.findUserByEmail(email)

    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайденоt')

    const code = generateRandomNumbers(6)

    await EmailService.sendVerificationEmail(email, code)
    user.codeToVerifyEmail = code
    await user.save()

    return SendResponse.OK(res, 'На вашу пошту надіслано лист для підтвердження', {})
}

export default {
    middleware: [validation(schema)],
    handler: controllerWrapper(requestVerificationEmail),
}
