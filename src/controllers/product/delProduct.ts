import { Request, Response } from 'express'
import passport from 'passport'
import { UserRoles } from '../../models/UserModel'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth } from '../../middlewares'
import ProductService from '../../services/ProductServices'

const delImage = async (req: Request, res: Response) => {
    const { id } = req.params
    const productDB = await ProductService.delProduct(id)

    if (!productDB) return SendError.BAD_REQUEST(res, 'Товар не знайдено')

    return SendResponse.OK(res, 'Товар видалено', { product: productDB })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN])],
    handler: controllerWrapper(delImage),
}
