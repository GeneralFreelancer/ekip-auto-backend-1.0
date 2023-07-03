import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import ProductRequestService from '../../services/ProductRequestService'

const schema = yup.object().shape({
    productId: yup.string().required(),
})

const createProductRequest = async (req: Request, res: Response) => {
    const user = req.user
    if (!user) return SendError.UNAUTHORIZED(res, 'Користувача не знайдено')

    const { productId } = req.body

    const productRequest = await ProductRequestService.createProductRequest(user._id, productId)

    return SendResponse.OK(res, 'Запит створено', { productRequest })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), validation(schema)],
    handler: controllerWrapper(createProductRequest),
}
