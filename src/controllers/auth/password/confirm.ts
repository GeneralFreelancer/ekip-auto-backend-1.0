// import { Request, Response } from 'express'
// import * as yup from 'yup'
// import { UserService } from '../../../services/UserServices'
// import { SendError, SendResponse } from '../../../helpers'
// import { controllerWrapper, validation } from '../../../middlewares'

// const schema = yup.object().shape({
//     phone: yup
//         .string()
//         .matches(/^\+[1-9]\d{1,14}$/)
//         .required(),
//     code: yup.string().required(),
// })

// const confirmPassword = async (req: Request, res: Response) => {
//     const { phone, code } = req.body

//     const user = await UserService.findUserByPhone(phone)
//     if (!user || !user.isPhoneConfirmed) return SendError.BAD_REQUEST(res, 'User with this phone number doesn’t registered', { errorId: 'user_not_registered' })
//     if (!user.password) return SendError.BAD_REQUEST(res, 'User with this phone number doesn’t set his password', { errorId: 'password_error' })

//     const isVerificationCodeValid = await TwilioServices.checkVerificationCode(phone, code)
//     if (!isVerificationCodeValid) return SendError.BAD_REQUEST(res, 'Invalid phone number')

//     if (user.isPhoneConfirmed && user.password && isVerificationCodeValid.valid) {
//         const token = UserService.signToken(user)

//         return SendResponse.OK(res, 'You have successful confirm verification code. You can set new password', {
//             token,
//             user: user.getPublicInfo(),
//         })
//     }

//     if (user.isPhoneConfirmed && user.password && !isVerificationCodeValid.valid) return SendError.BAD_REQUEST(res, 'Invalid verification code', { errorId: 'validation_error' })

//     return SendError.SERVER_ERROR(res, 'Unexpected error')
// }

// export default {
//     middleware: [validation(schema)],
//     handler: controllerWrapper(confirmPassword),
// }
