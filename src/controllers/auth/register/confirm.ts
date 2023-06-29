import { Request, Response } from 'express'
import { UserService } from '../../../services/UserServices'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../../helpers'
import { controllerWrapper, validation } from '../../../middlewares'

const schema = yup.object().shape({
    code: yup.string().min(1, 'Code cannot be an empty field').max(10, 'Code should have a maximum length of 10').required('Code is a required field'),
})

const registerConfirm = async (req: Request, res: Response) => {
    const { code } = req.body

    const user = await UserService.findUserByEmailCode(code)
    if (!user) return SendError.BAD_REQUEST(res, 'Verification code is not valid', { errorId: 'invalid_security_code' })

    const token = await UserService.signToken(user)
    user.isEmailConfirmed = true

    await user.save()

    return SendResponse.OK(res, 'Success', { token, user: user.getPublicInfo() })
}

export default {
    middleware: [validation(schema)],
    handler: controllerWrapper(registerConfirm),
}
