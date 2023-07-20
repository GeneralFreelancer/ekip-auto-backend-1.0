import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import { EmailService } from '../../services/EmailService'
import ProductRequestService from '../../services/ProductRequestService'
import ProductService from '../../services/ProductServices'

const schema = yup.object().shape({
    productId: yup.string().required(),
})

const createProductRequest = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    const { productId } = req.body

    const product = await ProductService.findProductById(productId)

    if (!product) return SendError.UNAUTHORIZED(res, 'Товар не знайдено')

    const productRequest = await ProductRequestService.createProductRequest(user._id, productId)

    await EmailService.sendRequestOrderEmail(user.email, user.firstName as string, user.lastName as string, user.phone as string, product.name, product.sku as string)

    return SendResponse.OK(res, 'Запит створено', { productRequest })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(createProductRequest),
}
