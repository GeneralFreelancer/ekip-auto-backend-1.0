import { Request, Response } from 'express'
import passport from 'passport'
import * as yup from 'yup'
import { UserRoles } from '../../models/UserModel'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, roleBasedAuth, validation } from '../../middlewares'
import ProductService from '../../services/ProductServices'

const schema = yup.object().shape({
    id: yup.string().required(),
    stock: yup.boolean(),
    inTopRate: yup.boolean(),
    hidden: yup.boolean(),
    name: yup.string(),
    description: yup.string(),
    sku: yup.string(),
    category: yup.string(),
    subCategory: yup.string(),
    quantity: yup.number(),
    minQuantity: yup.number(),
    priceUSD: yup.number(),
    priceUAH: yup.number(),
    options: yup.object().shape({}),
    deliveryOptions: yup.object().shape({}),
})

const updateProduct = async (req: Request, res: Response) => {
    const { id, stock, inTopRate, hidden, name, description, sku, category, subCategory, quantity, minQuantity, priceUSD, priceUAH, options, deliveryOptions } = req.body
    const product = await ProductService.updateProduct(id, {
        stock,
        inTopRate,
        hidden,
        name,
        description,
        sku,
        category,
        subCategory,
        quantity,
        minQuantity,
        priceUSD,
        priceUAH,
        options,
        deliveryOptions,
    })

    if (!product) return SendError.BAD_REQUEST(res, 'Помилка оновлення')

    return SendResponse.OK(res, 'Товар оновлено', { product: await product.getPublicInfo() })
}

export default {
    middleware: [passport.authenticate('jwt', { session: false }), roleBasedAuth([UserRoles.ADMIN]), validation(schema)],
    handler: controllerWrapper(updateProduct),
}
