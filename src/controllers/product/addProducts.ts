// import { Request, Response } from 'express'
// import * as yup from 'yup'
// import { User } from '../../models/UserModel'
// // import { EmailService } from '../../services/EmailService'
// import { DocumentType } from '@typegoose/typegoose'
// import { SendError, SendResponse } from '../../helpers'
// import { controllerWrapper, validation } from '../../middlewares'
// import { generateRandomNumbers } from '../../utils/utils'

// const schema = yup.object().shape({
//     email: yup.string().trim().email().min(3, 'Please enter your real email').required(),
// })

// const addProducts = async (req: Request, res: Response) => {
//     const user = req.user as DocumentType<User>
//     if (!user) return SendError.UNAUTHORIZED(res, 'Maybe you forgot a token', { errorId: 'not_authorized' })

//     const code = generateRandomNumbers(6)

//     // await EmailService.sendEmailToUserWithCodeToChangeEmailInProfile(email, user.firstName ? user.firstName : 'User', code)
//     user.codeToVerifyEmail = code
//     await user.save()

//     return SendResponse.OK(res, 'email was sent successfully', { user: user.getPublicInfo() })
// }

// export default {
//     middleware: [validation(schema)],
//     handler: controllerWrapper(addProducts),
// }
