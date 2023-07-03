import { Request, Response } from 'express'
import passport from 'passport'
import { UserRoles } from '../../models/UserModel'
import { SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth } from '../../middlewares'
import ProductRequestService from '../../services/ProductRequestService'

const getProductRequests = async (req: Request, res: Response) => {
    const productRequests = await ProductRequestService.getProductRequests()

    return SendResponse.OK(res, 'Запити', { productRequests })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN])],
    handler: controllerWrapper(getProductRequests),
}
