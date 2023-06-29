// import { Request, Response } from 'express'
// import { UserService } from '../../../services/UserServices'
// import * as yup from 'yup'
// import { SendError, SendResponse } from '../../../helpers'
// import { controllerWrapper, validation } from '../../../middlewares'

// const schema = yup.object().shape({
//     phone: yup
//         .string()
//         .matches(/^\+[1-9]\d{1,14}$/, 'Phone should have a valid format')
//         .min(1, 'Phone number cannot be an empty field')
//         .max(15, 'Phone should have a maximum length of 15')
//         .required('Phone is a required field'),
//     code: yup.string().min(1, 'Code cannot be an empty field').max(10, 'Code should have a maximum length of 10').required('Code is a required field'),
// })

// const registerConfirm = async (req: Request, res: Response) => {
//     const { phone, code } = req.body
//     const version = typeof req.headers['X-Nest-Egg-App-Version'] === 'string' ? req.headers['X-Nest-Egg-App-Version'] : undefined
//     const platform = typeof req.headers['X-Nest-Egg-App-Platform'] === 'string' ? req.headers['X-Nest-Egg-App-Platform'] : undefined

//     const user = await UserService.findUserByPhone(phone)
//     if (!user) return SendError.BAD_REQUEST(res, 'User with this phone number doesn’t exist', { errorId: 'user_doesnt_exists' })

//     const isVerificationCodeValid = await TwilioServices.checkVerificationCode(phone, code)

//     if (!isVerificationCodeValid) return SendError.BAD_REQUEST(res, 'Invalid phone number')
//     if (!isVerificationCodeValid.valid) return SendError.BAD_REQUEST(res, 'Verification code is not valid', { errorId: 'invalid_security_code' })

//     const token = await UserService.signToken(user)
//     user.isPhoneConfirmed = true
//     user.appVersion = { version, platform }

//     await user.save()

//     return SendResponse.OK(res, 'Success', { token, user: user.getPublicInfo() })
// }

// export default {
//     middleware: [validation(schema)],
//     handler: controllerWrapper(registerConfirm),
// }
