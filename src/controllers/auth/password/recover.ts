// import { Request, Response } from 'express'
// import * as yup from 'yup'
// import { UserService } from '../../../services/UserServices'
// import { TwilioServices } from '../../../services/TwilioServices'
// import { fifteenMinutesLimiter } from '../../../api/rateLimiter'
// import { validationPhoneForDDoS } from '../../../utils/utils'
// import { SendError, SendResponse } from '../../../helpers'
// import { controllerWrapper, validation } from '../../../middlewares'

// const schema = yup.object().shape({
//     phone: yup
//         .string()
//         .matches(/^\+[1-9]\d{1,14}$/)
//         .required(),
// })

// const recoverPassword = async (req: Request, res: Response) => {
//     const { phone } = req.body

//     const user = await UserService.findUserByPhone(phone)
//     if (!user || !user.isPhoneConfirmed) return SendError.BAD_REQUEST(res, 'User with this phone number doesn’t registered', { errorId: 'user_not_registered' })

//     if (!user.password) return SendError.BAD_REQUEST(res, 'User with this phone number doesn’t set his password', { errorId: 'password_error' })

//     if (user.isPhoneConfirmed && user.password) {
//         const twilioResponse = await TwilioServices.sendVerificationSms(phone)
//         if (!twilioResponse) return SendError.BAD_REQUEST(res, 'Invalid phone number')

//         return SendResponse.OK(res, 'You have successful send verification code for recover password', {})
//     }

//     return SendError.SERVER_ERROR(res, 'Unexpected error')
// }

// // const limiter = rateLimiter({
// //     windowMs: 5 * 60 * 1000, // 15 minutes
// //     max: 15 // limit each IP to 100 requests per windowMs
// // })

// export default {
//     middleware: [fifteenMinutesLimiter, validationPhoneForDDoS, validation(schema)],
//     handler: controllerWrapper(recoverPassword),
// }
