import { Request, Response } from 'express'
import { SendResponse } from '../../helpers'
import { controllerWrapper } from '../../middlewares'
import ProductService from '../../services/ProductServices'

const getProducts = async (req: Request, res: Response) => {
    const products = await ProductService.getProducts()

    return SendResponse.OK(res, 'Товари', { products })
}

export default {
    handler: controllerWrapper(getProducts),
}
