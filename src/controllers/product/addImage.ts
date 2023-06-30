import { Request, Response } from 'express'
import config from '../../config'
import passport from 'passport'
import * as yup from 'yup'
import { UserRoles } from '../../models/UserModel'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth, validation } from '../../middlewares'
import ProductService from '../../services/ProductServices'

const schema = yup.object().shape({
    main: yup.boolean(),
    productId: yup.string().required(),
})

const addImage = async (req: Request, res: Response) => {
    const { productId, main } = req.body
    const productDB = await ProductService.findProductById(productId)

    if (!productDB) return SendError.BAD_REQUEST(res, 'Товар не знайдено')
    if (!req.file) return SendError.BAD_REQUEST(res, 'Помилка завантаження файлу')

    const product = await ProductService.updateProductImage(productDB, req.file.filename, main)
    const imagePath = config.API_URL + 'images/' + req.file.filename

    return SendResponse.OK(res, 'Зображення додано', { product, imagePath })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN]), validation(schema)],
    handler: controllerWrapper(addImage),
}
