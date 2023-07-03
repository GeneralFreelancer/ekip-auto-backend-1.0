import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { UserRoles } from '../../models/UserModel'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth, validation } from '../../middlewares'
import ProductRequestService from '../../services/ProductRequestService'

const schema = yup.object().shape({
    status: yup.boolean().required(),
    productRequestId: yup.string().required(),
})

const updateStatus = async (req: Request, res: Response) => {
    const { productRequestId, status } = req.body

    const productRequest = await ProductRequestService.updateStatus(productRequestId, status)

    if (!productRequest) return SendError.BAD_REQUEST(res, 'Запит не знайдено')

    return SendResponse.OK(res, 'Статус оновлено', { productRequest })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN]), validation(schema)],
    handler: controllerWrapper(updateStatus),
}
