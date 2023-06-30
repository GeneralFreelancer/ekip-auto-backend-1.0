import { Request, Response } from 'express'
import { SendError, SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import ProductService from '../../services/ProductServices'

const getProducts = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await ProductService.findProductById(id)

    if (!product) return SendError.BAD_REQUEST(res, 'Товар не знайдено')

    return SendResponse.OK(res, 'Товари', { product })
}

export default {
    handler: controllerWrapper(getProducts),
}
