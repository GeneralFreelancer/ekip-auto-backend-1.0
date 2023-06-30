import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { UserRoles } from '../../models/UserModel'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth, validation } from '../../middlewares'
import ProductService from '../../services/ProductServices'

const schema = yup.object().shape({
    image: yup.string().required(),
    productId: yup.string().required(),
})

const delImage = async (req: Request, res: Response) => {
    const { productId, image } = req.body
    const productDB = await ProductService.findProductById(productId)

    if (!productDB) return SendError.BAD_REQUEST(res, 'Товар не знайдено')

    const product = await ProductService.delImage(productDB, image)

    return SendResponse.OK(res, 'Зображення видалено', { product })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN]), validation(schema)],
    handler: controllerWrapper(delImage),
}
