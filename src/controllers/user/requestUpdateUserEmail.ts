import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import UserModel, { User } from '../../models/UserModel'
// import { EmailService } from '../../services/EmailService'
import { DocumentType } from '@typegoose/typegoose'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import { generateRandomNumbers } from '../../utils/utils'

const schema = yup.object().shape({
    email: yup.string().trim().email().min(3, 'Please enter your real email').required(),
})

const requestUpdateUserEmail = async (req: Request, res: Response) => {
    const user = req.user as DocumentType<User>
    if (!user) return SendError.UNAUTHORIZED(res, 'Maybe you forgot a token', { errorId: 'not_authorized' })

    if (!user.firstName) return SendError.BAD_REQUEST(res, 'Please set up your first name')

    const { email } = req.body
    const isExistingUsersEmailConfirmation = email === user.email

    if (!isExistingUsersEmailConfirmation) {
        const userInDb = await UserModel.findOne({ email })
        if (userInDb) {
            return SendError.BAD_REQUEST(res, 'such email already exist')
        }
    }

    const code = generateRandomNumbers(6)

    // await EmailService.sendEmailToUserWithCodeToChangeEmailInProfile(email, user.firstName ? user.firstName : 'User', code)
    user.codeToVerifyEmail = code
    await user.save()

    return SendResponse.OK(res, 'email was sent successfully', { user: user.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(requestUpdateUserEmail),
}
