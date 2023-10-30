import { Request, Response } from 'express'
import * as yup from 'yup'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper, validation } from '../../middlewares'
import ProductService from '../../services/ProductServices'

const schema = yup.object().shape({
    products: yup.array().of(
        yup.object().shape({
            stock: yup.boolean(),
            name: yup.string(),
            description: yup.string(),
            sku: yup.string(),
            category: yup.string(),
            subCategory: yup.string(),
            quantity: yup.number(),
            minQuantity: yup.number(),
            minQuantity1: yup.number(),
            priceUAH: yup.number(),
            priceUSD: yup.number(),
            priceUSDless: yup.number(),
            options: yup.array().of(yup.object().shape({})),
            deliveryOptions: yup.array().of(yup.object().shape({})),
        }),
    ),
})

const updateProducts = async (req: Request, res: Response) => {
    const { products } = req.body

    if (!products || !products.length) return SendError.BAD_REQUEST(res, 'Помилка додавання')

    await ProductService.updateProducts(products)

    return SendResponse.OK(res, 'Продукти додано', {})
}

export default {
    middleware: [validation(schema)],
    handler: controllerWrapper(updateProducts),
}
