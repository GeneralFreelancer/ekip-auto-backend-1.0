import { Request, Response } from 'express'
import passport from 'passport'
import { UserRoles } from '../../models/UserModel'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth } from '../../middlewares'
import ProductRequestService from '../../services/ProductRequestService'

const deleteProductRequest = async (req: Request, res: Response) => {
    const { id } = req.params
    const productRequest = await ProductRequestService.deleteProductRequest(id)

    if (!productRequest) return SendError.BAD_REQUEST(res, 'Запит не знайдено')

    return SendResponse.OK(res, 'Запит видалено', { productRequest })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN])],
    handler: controllerWrapper(deleteProductRequest),
}
