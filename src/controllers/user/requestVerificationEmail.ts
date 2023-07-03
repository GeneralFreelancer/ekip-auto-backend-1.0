import { Request, Response } from 'express'
import passport from 'passport'
import { User } from '../../models/UserModel'
import { DocumentType } from '@typegoose/typegoose'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import { generateRandomNumbers } from '../../utils/utils'
import { EmailService } from '../../services/EmailService'

const requestVerificationEmail = async (req: Request, res: Response) => {
    const user = req.user as DocumentType<User>
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено', { errorId: 'not_authorized' })

    const code = generateRandomNumbers(6)

    await EmailService.sendVerificationEmail(user.email, code)
    user.codeToVerifyEmail = code
    await user.save()

    return SendResponse.OK(res, 'На вашу пошту надіслано лист для підтвердження', { user: user.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false })],
    handler: controllerWrapper(requestVerificationEmail),
}
