import { Request, Response } from 'express'
import * as yup from 'yup'
import { SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import { EmailService } from '../../services/EmailService'

const schema = yup.object().shape({
    phone: yup.string().required(),
})

const requestCall = async (req: Request, res: Response) => {
    const { phone } = req.body

    await EmailService.sendPhone(phone)

    return SendResponse.OK(res, 'Запит відправлено', {})
}

export default {
    middleware: [validation(schema)],
    handler: controllerWrapper(requestCall),
}
