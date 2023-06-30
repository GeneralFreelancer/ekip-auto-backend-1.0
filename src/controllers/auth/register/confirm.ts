import { Request, Response } from 'express'
import { UserService } from '../../../services/UserServices'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../../helpers'
import { controllerWrapper, validation } from '../../../middlewares'

const schema = yup.object().shape({
    code: yup.string().min(1, 'Помилка коду').max(10, 'Помилка коду').required('Code is a required field'),
})

const registerConfirm = async (req: Request, res: Response) => {
    const { code } = req.body

    const user = await UserService.findUserByEmailCode(code)
    if (!user) return SendError.BAD_REQUEST(res, 'Помилка коду', { errorId: 'invalid_security_code' })

    const token = await UserService.signToken(user)
    user.isEmailConfirmed = true

    await user.save()

    return SendResponse.OK(res, 'Success', { token, user: user.getPublicInfo() })
}

export default {
    middleware: [validation(schema)],
    handler: controllerWrapper(registerConfirm),
}
