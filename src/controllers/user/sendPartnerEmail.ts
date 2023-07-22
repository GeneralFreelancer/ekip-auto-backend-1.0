import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import { EmailService } from '../../services/EmailService'

const schema = yup.object().shape({
    message: yup.string().required(),
})

const sendPartnerEmail = async (req: Request, res: Response) => {
    const user = req.user

    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')
    const { message } = req.body

    await EmailService.sendPartnerEmail(user.email, user.firstName as string, user.lastName as string, user.phone as string, message, req.file?.filename)

    return SendResponse.OK(res, 'Лист відправлено', {})
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(sendPartnerEmail),
}
